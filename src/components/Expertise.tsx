const COMMITMENTS = [
  {
    number: '01',
    title: 'Right-sized from the start',
    detail: 'No over-specifying. No compromises. Just the right capacity, efficiency and fit for the job.',
  },
  {
    number: '02',
    title: 'Ready for the real world',
    detail: 'Practical solutions chosen for demanding conditions and dependable everyday operation.',
  },
  {
    number: '03',
    title: 'Here for the long run',
    detail: 'From setup to servicing, talk to people who know your equipment and care about keeping it running.',
  },
] as const

export function Expertise() {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="bg-[#eaf0dd] py-[52px] tablet:py-[80px]"
    >
      <div className="torq-container flex flex-col gap-10">
        <p className="text-eyebrow font-semibold text-brand-emerald">02 / THE TORQ DIFFERENCE</p>

        <div className="flex flex-col gap-[30px] tablet:gap-16 laptop:flex-row">
          <div className="flex min-w-0 flex-1 flex-col items-start gap-6">
            <h2
              id="expertise-heading"
              className="text-[34px] leading-[1.13] font-medium tracking-[-0.03em] text-ink-primary tablet:text-[40px] laptop:text-[48px]"
            >
              <span className="block">Good equipment.</span>
              <span className="block">Even better guidance.</span>
            </h2>
            <p className="text-body-lg text-ink-muted">
              We look beyond the nameplate. Your water source, workload and working conditions guide every recommendation we make.
            </p>
            <a href="#contact" className="text-link font-semibold text-ink-primary hover:underline">
              Meet your local specialists <span aria-hidden="true">↗</span>
            </a>
          </div>

          <ol className="flex min-w-0 flex-1 flex-col">
            {COMMITMENTS.map((commitment) => (
              <li key={commitment.number} className="flex gap-5 border-t border-[#d6dfcb] py-5">
                <span aria-hidden="true" className="shrink-0 text-caption font-medium text-brand-emerald">
                  {commitment.number}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[20px] leading-normal font-medium text-ink-primary">{commitment.title}</h3>
                  <p className="mt-2 text-body-sm text-ink-muted">{commitment.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
