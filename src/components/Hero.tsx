import { useState } from 'react'
import { torqImages } from '../assets/images'

const SLIDES = [
  {
    eyebrow: 'PRECISION IN EVERY REVOLUTION',
    caption: 'Built for the everyday. Ready for more.',
  },
  {
    eyebrow: 'LOREM IPSUM DOLOR SIT AMET',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    eyebrow: 'SED DO EIUSMOD TEMPOR',
    caption: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
] as const

export function Hero() {
  const [slideIndex, setSlideIndex] = useState(0)
  const slide = SLIDES[slideIndex]

  return (
    <section id="hero" data-slot="hero" aria-labelledby="hero-heading" className="pt-[38px] pb-10 tablet:py-section-md">
      <div className="torq-container grid grid-cols-1 items-center gap-8 tablet:grid-cols-2 tablet:gap-6 laptop:gap-col-gap">
        <div className="flex min-w-0 flex-col items-start gap-[22px] tablet:gap-7">
          <p className="text-label font-semibold text-brand-emerald">
            POWERING WORK. KEEPING LIFE FLOWING.
          </p>

          <h1 id="hero-heading" className="text-display-mobile font-medium laptop:text-display-laptop desktop:text-display-desktop">
            <span className="block">A steady force.</span>
            <span className="block">For every flow.</span>
          </h1>

          <p className="text-body-md text-ink-muted tablet:text-body-lg">
            <span className="block">The right motors. The right pumps. Real expertise.</span>
            <span className="block">Reliable solutions for your home, farm and industry.</span>
          </p>

          <div className="flex w-full flex-col items-start gap-3 tablet:flex-row tablet:flex-wrap">
            <a
              href="#solutions"
              className="inline-flex items-center gap-2 rounded-control bg-brand-forest px-btn-x py-btn-y text-body-sm font-medium text-ink-inverse transition-opacity hover:opacity-90"
            >
              Explore solutions
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href="#footer"
              className="inline-flex items-center rounded-control border border-border-control px-btn-x py-btn-y text-body-sm font-medium text-ink-primary transition-colors hover:bg-surface-media"
            >
              Talk to an expert
            </a>
          </div>

          <p className="flex items-start gap-2.5 text-eyebrow font-medium text-ink-muted">
            <span aria-hidden="true" className="font-normal text-brand-emerald">●</span>
            Local expertise. Long-term peace of mind.
          </p>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Product showcase"
          className="min-w-0 overflow-hidden rounded-showcase bg-surface-media"
        >
          <img
            src={torqImages.heroPump.src}
            alt={torqImages.heroPump.alt}
            width={1024}
            height={1024}
            fetchPriority="high"
            className="h-[314px] w-full object-cover tablet:h-[410px] laptop:h-[480px]"
          />

          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-0.5 px-6 pt-1.5 pb-[22px]">
            <p className="text-micro font-semibold text-brand-emerald">{slide.eyebrow}</p>

            <div className="flex items-center gap-1 text-label font-medium text-ink-muted">
              <button
                type="button"
                aria-label="Previous slide"
                aria-controls="hero-slide-caption"
                onClick={() => setSlideIndex((index) => (index + SLIDES.length - 1) % SLIDES.length)}
                className="inline-flex min-h-6 min-w-6 items-center justify-center rounded-control text-body-sm hover:bg-border-subtle"
              >
                <span aria-hidden="true">←</span>
              </button>
              <span className="whitespace-nowrap" aria-hidden="true">
                {String(slideIndex + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                aria-label="Next slide"
                aria-controls="hero-slide-caption"
                onClick={() => setSlideIndex((index) => (index + 1) % SLIDES.length)}
                className="inline-flex min-h-6 min-w-6 items-center justify-center rounded-control text-body-sm hover:bg-border-subtle"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>

            <p
              id="hero-slide-caption"
              aria-live="polite"
              aria-atomic="true"
              className="col-span-2 text-caption font-medium text-ink-primary"
            >
              <span className="sr-only">Slide {slideIndex + 1} of {SLIDES.length}. </span>
              {slide.caption}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
