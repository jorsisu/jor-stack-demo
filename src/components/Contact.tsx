export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-surface-contact py-[52px] tablet:py-[80px]">
      <div className="torq-container flex flex-col items-start gap-7 tablet:gap-16 laptop:flex-row laptop:items-center">
        <div className="flex min-w-0 flex-1 flex-col gap-[18px]">
          <p className="text-eyebrow font-semibold text-ink-primary">LET’S FIND YOUR FLOW</p>
          <h2
            id="contact-heading"
            className="text-[37px] leading-[1.12] font-medium tracking-[-0.03em] text-ink-primary tablet:text-[44px] laptop:text-[56px]"
          >
            <span className="block">Big plans. Small question.</span>
            <span className="block">Let’s get it moving.</span>
          </h2>
          <p className="text-body-md text-ink-contact-secondary">
            Tell us what you’re working on. We’ll take it from there.
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-4">
          <a
            href="mailto:hello@torq.example?subject=Talk%20to%20a%20specialist"
            className="inline-flex items-center gap-2 rounded-control bg-brand-forest px-6 py-4 text-body-sm font-medium text-ink-inverse transition-opacity hover:opacity-90"
          >
            Talk to a specialist <span aria-hidden="true">↗</span>
          </a>
          <a href="mailto:hello@torq.example" className="text-caption font-medium text-ink-primary hover:underline">
            Or write to hello@torq.example
          </a>
        </div>
      </div>
    </section>
  )
}
