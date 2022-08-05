
import { WebhooksIcon } from '@/components/WebhooksIcon'

export function Hero() {
  return (
    <div className="overflow-hidden bg-slate-50 dark:bg-slate-900 dark:-mb-32 dark:-mt-[4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:-mt-[4.75rem] dark:lg:pt-[4.75rem]">
      <div className="py-4 sm:px-2 lg:relative lg:py-4 lg:px-0">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 px-4 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center">
            <div className="relative">
              <p className="inline font-display text-5xl tracking-tight text-slate-700 dark:text-sky-100">
                <WebhooksIcon /> Webhooks.fyi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}