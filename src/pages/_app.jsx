import Head from 'next/head'
import { slugifyWithCounter } from '@sindresorhus/slugify'

import { Layout } from '@/components/Layout'

import 'focus-visible'
import '@/styles/tailwind.css'

const navigation = [
  {
    title: 'Intro',
    links: [
      { title: 'Overview', href: '/' },
      { title: 'What are webhooks?', href: '/docs/webhook-primer' },
    ],
  },
  {
    title: 'Webhook Directory',
    links: [
      { title: 'All providers by name' , href: '/docs/webhook-directory' },
    ],
  },
  {
    title: 'Webhook Security',
    links: [
      { title: 'Introduction', href: '/security/intro' },
      { title: 'One Time Verification', href: '/security/one-time-verification-challenge' },
      { title: 'Shared Secret', href: '/security/shared-secret' },
      { title: 'HMAC', href: '/security/hmac' },
      { title: 'Asymmetric Keys', href: '/security/asymmetric-key-encryption' },
      { title: 'OAuth2, JWTs, and JWKs', href: '/security/jwt-jwk-oauth2' },
      { title: 'mTLS', href: '/security/end-to-end-encryption' },
      { title: 'Replay prevention', href: '/security/replay-prevention' },
    ],
  },
  {
    title: 'Operational Experience',
    links: [
      { title: 'Introduction', href: '/ops-experience/intro' },
      { title: 'Documentation', href: '/ops-experience/documentation' },
      { title: 'Resiliency', href: '/ops-experience/resiliency' },
      { title: 'Forward Compatibility', href: '/ops-experience/versioning' },
      { title: 'Zero Downtime Rotation', href: '/ops-experience/key-rotation' },
      { title: 'Multiple URLS', href: '/ops-experience/multiple-urls' },
      { title: 'Endpoint Verification', href: '/ops-experience/endpoint-verification' },
    ],
  },
  {
    title: 'Best Practices',
    links: [
      { title: 'For Providers', href: '/best-practices/webhook-providers' },
      { title: 'For Consumers', href: '/best-practices/webhook-consumers' },
    ],
  },
  {
    title: 'Contributing',
    links: [
      { title: 'How to contribute', href: '/docs/how-to-contribute' },
    ],
  },
]

function getNodeText(node) {
  let text = ''
  for (let child of node.children ?? []) {
    if (typeof child === 'string') {
      text += child
    }
    text += getNodeText(child)
  }
  return text
}

function collectHeadings(nodes, slugify = slugifyWithCounter()) {
  let sections = []

  for (let node of nodes) {
    if (/^h[23]$/.test(node.name)) {
      let title = getNodeText(node)
      if (title) {
        let id = slugify(title)
        node.attributes.id = id
        if (node.name === 'h3') {
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          })
        } else {
          sections.push({ ...node.attributes, title, children: [] })
        }
      }
    }

    sections.push(...collectHeadings(node.children ?? [], slugify))
  }

  return sections
}

export default function App({ Component, pageProps }) {
  let title = pageProps.markdoc?.frontmatter.title

  let pageTitle =
    pageProps.markdoc?.frontmatter.pageTitle ||
    `${pageProps.markdoc?.frontmatter.title} - Docs`

  let description = pageProps.markdoc?.frontmatter.description

  let tableOfContents = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : []

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <Layout
        navigation={navigation}
        title={title}
        tableOfContents={tableOfContents}
      >
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
