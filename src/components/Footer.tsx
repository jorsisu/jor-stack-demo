const EXPLORE_LINKS = [
  { label: 'Our solutions', href: '#solutions' },
  { label: 'Our expertise', href: '#confidence' },
  { label: 'Projects', href: '#solutions' },
  { label: 'About torq.', href: '#hero' },
] as const

const CONTACT_LINKS = [
  {
    label: 'Discuss a project',
    href: 'mailto:hello@torq.example?subject=Discuss%20a%20project',
  },
  {
    label: 'Service & support',
    href: 'mailto:hello@torq.example?subject=Service%20%26%20support',
  },
  {
    label: 'hello@torq.example',
    href: 'mailto:hello@torq.example',
  },
] as const

export function Footer() {
  return (
    <footer id="footer" className="bg-surface-footer text-ink-primary">
      <div className="torq-container flex flex-col gap-11 pt-12 pb-section-sm tablet:pt-section-md">
        <div className="flex flex-col gap-strip-gap tablet:flex-row tablet:items-start tablet:gap-col-gap">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <a href="#hero" className="w-fit text-brand-footer font-bold text-ink-primary">
              torq.
            </a>
            <p className="text-body-sm font-medium text-ink-primary">
              Motors. Pumps. People who know.
            </p>
            <p className="text-link font-normal text-ink-muted">
              A steady force for your home,
              <br />
              your work and everything in between.
            </p>
          </div>

          <nav aria-label="Footer" className="flex min-w-0 flex-1 gap-6 text-caption tablet:gap-12">
            <div className="flex min-w-0 flex-1 flex-col gap-2.5">
              <h2 className="text-caption font-semibold text-brand-emerald">Explore</h2>
              <ul className="flex flex-col gap-2.5">
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-block text-ink-muted transition-colors hover:text-ink-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2.5">
              <h2 className="text-caption font-semibold text-brand-emerald">Get in touch</h2>
              <ul className="flex flex-col gap-2.5">
                {CONTACT_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-block text-ink-muted transition-colors hover:text-ink-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="flex flex-col items-start gap-2.5 border-t border-border-subtle pt-6 text-eyebrow font-normal text-ink-muted tablet:flex-row tablet:items-start tablet:justify-between tablet:gap-6">
          <p>© 2026 torq. Motors &amp; pumps.</p>
          <p className="whitespace-nowrap">Privacy&nbsp;&nbsp;/&nbsp;&nbsp;Terms</p>
        </div>
      </div>
    </footer>
  )
}
