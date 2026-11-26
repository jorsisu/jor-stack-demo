import { useEffect, useRef, useState } from 'react'

const PRIMARY_NAV_LINKS = [
  { label: 'Solutions', href: '#solutions', showOnTablet: true },
  { label: 'Our expertise', href: '#expertise', showOnTablet: false },
  { label: 'Projects', href: '#projects', showOnTablet: false },
  { label: 'About us', href: '#footer', showOnTablet: false },
] as const

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 52.125rem)')
    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false)
      }
    }

    mediaQuery.addEventListener('change', handleViewportChange)
    return () => mediaQuery.removeEventListener('change', handleViewportChange)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  return (
    <header className="border-b border-border-subtle bg-surface-canvas">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="torq-container flex items-center gap-strip-gap py-nav-y">
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <a href="#hero" className="flex flex-col items-start whitespace-nowrap">
            <span className="text-brand-nav font-bold text-ink-primary">torq.</span>
            <span className="hidden text-micro font-semibold text-ink-muted tablet:block">
              MOTORS &amp; PUMPS
            </span>
          </a>
        </div>

        <nav aria-label="Primary" className="hidden tablet:block">
          <ul className="flex items-center gap-strip-gap font-medium text-ink-primary whitespace-nowrap">
            {PRIMARY_NAV_LINKS.map((link) => (
              <li key={link.label} className={link.showOnTablet ? undefined : 'hidden laptop:block'}>
                <a
                  href={link.href}
                  className={
                    link.showOnTablet
                      ? 'text-link transition-colors hover:text-brand-emerald laptop:text-body-sm'
                      : 'text-body-sm transition-colors hover:text-brand-emerald'
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#contact"
          className="hidden shrink-0 items-center gap-1.5 rounded-control bg-brand-forest px-btn-x py-btn-y text-body-sm font-medium text-ink-inverse whitespace-nowrap transition-opacity hover:opacity-90 tablet:inline-flex"
        >
          Let’s talk
          <span aria-hidden="true">↗</span>
        </a>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls={isMenuOpen ? 'mobile-primary-nav' : undefined}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="inline-flex min-h-6 min-w-6 shrink-0 items-center gap-1.5 text-caption font-semibold text-ink-primary whitespace-nowrap tablet:hidden"
        >
          MENU
          <span aria-hidden="true">{isMenuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-primary-nav"
          aria-label="Mobile"
          className="border-t border-border-subtle bg-surface-canvas tablet:hidden"
        >
          <div className="torq-container py-6">
            <ul className="flex flex-col gap-1 text-body-sm font-medium text-ink-primary">
              {PRIMARY_NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block py-2 transition-colors hover:text-brand-emerald"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-border-subtle pt-4">
              <a
                href="#contact"
                onClick={closeMenu}
                className="inline-flex items-center gap-1.5 rounded-control bg-brand-forest px-btn-x py-btn-y text-body-sm font-medium text-ink-inverse transition-opacity hover:opacity-90"
              >
                Let’s talk
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
