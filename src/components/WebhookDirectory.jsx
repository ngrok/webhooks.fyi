import Link from 'next/link'

export function WebhookDirectory({ children }) {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th scope="col" className="bg-white dark:bg-slate-900 sticky top-20 border-y py-3.5 text-left text-sm font-semibold sm:pl-2 lg:pl-4">Provider</th>
          <th scope="col" className="bg-white dark:bg-slate-900 sticky top-20 hidden border-y py-3.5 text-center text-sm font-semibold sm:table-cell">Hash Algorithm</th>
          <th scope="col" className="bg-white dark:bg-slate-900 sticky top-20 hidden border-y py-3.5 text-center text-sm font-semibold sm:table-cell">Encode</th>
          <th scope="col" className="bg-white dark:bg-slate-900 sticky top-20 hidden border-y py-3.5 text-center text-sm font-semibold lg:table-cell">
            <a href="/security/replay-prevention">Replay Prevention</a>
          </th>
          <th scope="col" className="bg-white dark:bg-slate-900 sticky top-20 hidden border-y py-3.5 text-center text-sm font-semibold lg:table-cell">
            <a href="/ops-experience/versioning">Forward compatibility</a>
          </th>
          <th scope="col" className="bg-white dark:bg-slate-900 sticky top-20 hidden border-y py-3.5 text-center text-sm font-semibold lg:table-cell">
            <a href="/ops-experience/key-rotation">Zero Downtime Rotation</a>
          </th>
        </tr>
      </thead>
      <tbody>
        { children }
      </tbody>
    </table>
  )
}

WebhookDirectory.Row = function Row({ provider, hash, encode, rotation, versioning, timestamp, link }) {
  return ( 
      <tr>
        <td className="border-b py-4 text-sm font-medium sm:pl-2 lg:pl-4">
          <a href={ link } target="_webhookProvider">{ provider } ↗</a>
        </td>
        <td className="text-center border-b py-4 text-sm hidden sm:table-cell">{ hash }</td>
        <td className="text-center border-b py-4 text-sm hidden sm:table-cell">{ encode }</td>
        <td className="text-center border-b py-4 text-sm hidden lg:table-cell">{ timestamp }</td>
        <td className="text-center border-b py-4 text-sm hidden lg:table-cell">{ versioning }</td>
        <td className="text-center border-b py-4 text-sm hidden lg:table-cell">{ rotation }</td>
      </tr>
  )
}
