import Link from 'next/link'

export function SpecTable({ children }) {
  return (
    <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="sticky z-10 top-0 text-lg leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
              <div className="py-2 pr-2 border-b border-slate-200 dark:border-slate-400/20">Security Feature</div>
            </th>
            <th className="sticky z-10 top-0 text-lg leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
              <div className="py-2 pl-2 border-b border-slate-200 dark:border-slate-400/20">Value</div>
            </th>
          </tr>
        </thead>
        <tbody className="align-baseline">
          { children }
        </tbody>
    </table>
  )
}

SpecTable.Row = function Row({ title, description, link }) {
  return (
    <tr>
      <td translate="no" className="py-2 pr-2 font-mono font-medium text-xs leading-6 text-sky-500 whitespace-nowrap dark:text-sky-400">{title}</td>
      <td translate="no" className="py-2 pl-2 font-mono text-xs leading-6 text-indigo-600 whitespace-pre dark:text-indigo-300">
        {link 
          ? <a target="_webhookVendors" href={ link } >{ description }</a>
          : description
        }
      </td>
    </tr>
  )
}
