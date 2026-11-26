import irrigationPump from '../assets/images/project-irrigation-pump.jpeg'

export function FeaturedProject() {
  return (
    <section id="projects" aria-labelledby="featured-project-heading" className="py-[56px] tablet:py-[88px]">
      <div className="torq-container flex flex-col gap-8">
        <p className="text-eyebrow font-semibold text-brand-emerald">03 / SOLUTIONS AT WORK</p>

        <div className="flex flex-col items-end gap-4 tablet:flex-row tablet:items-end">
          <h2
            id="featured-project-heading"
            className="w-full min-w-0 text-[34px] leading-[1.13] font-medium tracking-[-0.03em] text-ink-primary tablet:flex-1 tablet:text-[36px] laptop:text-[46px]"
          >
            Real places. Real purpose.
          </h2>
          <a href="#contact" className="shrink-0 text-link font-medium text-ink-primary hover:underline">
            A closer look at what we do <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="overflow-hidden rounded-[12px] bg-[#f0f2eb] laptop:flex">
          <img
            src={irrigationPump}
            alt="Agricultural irrigation pump installation"
            loading="lazy"
            decoding="async"
            width="1264"
            height="848"
            className="h-[260px] w-full object-cover tablet:h-[380px] laptop:h-[420px] laptop:w-[61%] laptop:shrink-0"
          />

          <div className="flex min-w-0 flex-1 flex-col items-start gap-[22px] px-6 py-7 tablet:px-9 tablet:py-10">
            <p className="text-label font-semibold text-brand-emerald">AGRICULTURE / APPLICATION SPOTLIGHT</p>
            <h3 className="text-[28px] leading-[1.5] font-medium text-ink-primary tablet:text-[32px] tablet:leading-[1.13] tablet:tracking-[-0.03em]">
              <span className="block">More confidence.</span>
              <span className="block">Every growing season.</span>
            </h3>
            <p className="text-body-md text-ink-muted">
              A thoughtfully matched pumping system brings dependable water delivery to the heart of the farm.
            </p>
            <p className="text-label font-medium text-brand-emerald">Irrigation&nbsp; / &nbsp;Pump selection&nbsp; / &nbsp;Setup</p>
            <a href="#expertise" className="text-link font-semibold text-ink-primary hover:underline">
              Explore our approach <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
