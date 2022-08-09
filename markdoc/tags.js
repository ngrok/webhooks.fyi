import { Callout } from '@/components/Callout'
import { LinkGrid } from '@/components/LinkGrid'
import { SpecTable } from '@/components/SpecTable'
import { CardGrid } from '@/components/CardGrid'
import { WebhookDirectory } from '@/components/WebhookDirectory'
import { SharedSecret } from '@/components/diagrams/SharedSecret'
import { mTLS } from '@/components/diagrams/mTLS'
import { HMAC } from '@/components/diagrams/HMAC'
import { Callback } from '@/components/diagrams/Callback'

const tags = {
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: 'note',
        matches: ['note', 'warning'],
        errorLevel: 'critical',
      },
    },
    render: Callout,
  },
  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
    render: ({ src, alt = '', caption }) => (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    ),
  },
  'link-grid': {
    render: LinkGrid,
  },
  'link-grid-link': {
    selfClosing: true,
    render: LinkGrid.Link,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String },
    },
  },
  'spec-table': {
    render: SpecTable,
    attributes: {
      title: { type: String },
      desc: { type: String },
    },
  },
  'spec-table-row': {
    selfClosing: true,
    render: SpecTable.Row,
    attributes: {
      title: { type: String },
      description: { type: String },
      link: { type: String },
    },
  },
  'card-grid': {
    render: CardGrid,
  },
  'card-grid-card': {
    selfClosing: true,
    render: CardGrid.Card,
    attributes: {
      logo: { type: String },
      vendor: { type: String },
      link: { type: String },
    },
  },
  'webhook': {
    render: WebhookDirectory,
  },
  'webhook-entry': {
    selfClosing: true,
    render: WebhookDirectory.Row,
    attributes: {
      provider: { type: String },
      hash: { type: String },
      encode: { type: String },
      timestamp: { type: String },
      versioning: { type: String },
      rotation: { type: String },
      link: { type: String },
    },
  },
  'diagram-shared-secret': {
    render: SharedSecret,
  },
  'diagram-hmac': {
    render: HMAC,
  },
  'diagram-mtls': {
    render: mTLS,
  },
  'diagram-callback': {
    render: Callback,
  },
}

export default tags
