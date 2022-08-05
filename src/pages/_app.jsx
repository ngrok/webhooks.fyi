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
      { title: 'Webhook primer', href: '/docs/webhook-primer' },
      { title: 'Webhook directory' , href: '/docs/webhook-directory' },
    ],
  },
  {
    title: 'Webhook Security',
    links: [
      { title: 'Webhook Security Overview', href: '/docs/webhook-security-intro' },
      {
        title: 'Authentication and Message Security',
        href: '/docs/webhook-authentication-message-security',
      },
    ],
  },
  {
    title: 'Security Methods',
    links: [
      { title: 'Basic Auth', href: '/docs/basic-auth' },
      { title: 'HMAC', href: '/docs/hmac' },
      { title: 'Asymmetric Keys', href: '/docs/asymmetric-key-encryption' },
      { title: 'OAuth2, JWTs, and JWKs', href: '/docs/jwt-jwk-oauth2' },
      { title: 'mTLS', href: '/docs/end-to-end-encryption' },
    ],
  },
  {
    title: 'HMAC Controls',
    links: [
      { title: 'Key Rotation', href: '/docs/hmac/key-rotation' },
      { title: 'Forward Compatibility', href: '/docs/hmac/versioning' },
      { title: 'Replay prevention', href: '/docs/hmac/replay-prevention' },
    ],
  },
  {
    title: 'Best Practices',
    links: [
      { title: 'Webhook Providers', href: '/docs/best-practices-webhook-providers' },
      { title: 'Webhook Listeners', href: '/docs/best-practices-webhook-listeners' },
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
