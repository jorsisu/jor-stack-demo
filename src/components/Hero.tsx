import { useCallback, useEffect, useRef, useState } from 'react'
import { torqImages } from '../assets/images'

interface HeroSlide {
  readonly image: (typeof torqImages)[keyof typeof torqImages]
  readonly width: number
  readonly height: number
  readonly isLcp: boolean
  readonly eyebrow: string
  readonly caption: string
}

const HERO_SLIDES: readonly HeroSlide[] = [
  {
    image: torqImages.heroPump,
    width: 1024,
    height: 1024,
    isLcp: true,
    eyebrow: 'PRECISION IN EVERY REVOLUTION',
    caption: 'Built for the everyday. Ready for more.',
  },
  {
    image: torqImages.electricMotors,
    width: 1200,
    height: 896,
    isLcp: false,
    eyebrow: 'ENGINEERED FOR CONTINUOUS DUTY',
    caption: 'Quiet efficiency. Built to run long.',
  },
  {
    image: torqImages.surfacePumps,
    width: 1200,
    height: 896,
    isLcp: false,
    eyebrow: 'STEADY FLOW ACROSS EVERY LINE',
    caption: 'Consistent pressure. Day after day.',
  },
] as const

/** Returns slide elements sorted in their current horizontal visual order. */
function getVisualSlides(track: HTMLElement): HTMLElement[] {
  return (Array.from(track.children) as HTMLElement[]).sort(
    (a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left,
  )
}

/** Returns the slide element whose center is closest to the track's center. */
function getNearestSlide(track: HTMLElement): HTMLElement | null {
  const slides = Array.from(track.children) as HTMLElement[]
  if (slides.length === 0) return null

  const trackRect = track.getBoundingClientRect()
  const trackCenter = trackRect.left + trackRect.width / 2

  let nearest = slides[0]
  let minDistance = Infinity

  for (const slide of slides) {
    const rect = slide.getBoundingClientRect()
    const slideCenter = rect.left + rect.width / 2
    const distance = Math.abs(slideCenter - trackCenter)
    if (distance < minDistance) {
      minDistance = distance
      nearest = slide
    }
  }

  return nearest
}

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [announcement, setAnnouncement] = useState('')

  const trackRef = useRef<HTMLDivElement>(null)
  const settledIndexRef = useRef(0)
  const pendingTargetRef = useRef<HTMLElement | null>(null)
  const scrollOriginRef = useRef<number | null>(null)
  const rafScrollRef = useRef<number | null>(null)
  const rafUnlock1Ref = useRef<number | null>(null)
  const rafUnlock2Ref = useRef<number | null>(null)
  const settleTimerRef = useRef<number | null>(null)
  const reducedMotionFallbackRef = useRef<number | null>(null)

  const clearUnlockFrames = useCallback(() => {
    if (rafUnlock1Ref.current !== null) {
      cancelAnimationFrame(rafUnlock1Ref.current)
      rafUnlock1Ref.current = null
    }
    if (rafUnlock2Ref.current !== null) {
      cancelAnimationFrame(rafUnlock2Ref.current)
      rafUnlock2Ref.current = null
    }
  }, [])

  const parkAtIndex = useCallback(
    (domIndex: number, { lockOverflow }: { lockOverflow: boolean }) => {
      const track = trackRef.current
      if (!track) return

      const currentEl = track.querySelector<HTMLElement>(
        `[data-slide-index="${domIndex}"]`,
      )
      if (!currentEl) return

      clearUnlockFrames()

      const beforeLeft =
        currentEl.getBoundingClientRect().left - track.getBoundingClientRect().left

      track.style.scrollSnapType = 'none'
      track.style.scrollBehavior = 'auto'
      if (lockOverflow) {
        track.style.overflowX = 'hidden'
      }

      track.style.setProperty('--current', String(domIndex))

      const afterLeft =
        currentEl.getBoundingClientRect().left - track.getBoundingClientRect().left
      const delta = afterLeft - beforeLeft
      if (Math.abs(delta) > 0.5) {
        track.scrollLeft += delta
      }

      track.style.scrollSnapType = ''
      track.style.scrollBehavior = ''

      if (lockOverflow) {
        // Delay overflow unlock by two frames so iOS Safari does not paint before compensation lands.
        rafUnlock1Ref.current = requestAnimationFrame(() => {
          rafUnlock1Ref.current = null
          rafUnlock2Ref.current = requestAnimationFrame(() => {
            rafUnlock2Ref.current = null
            if (trackRef.current) {
              trackRef.current.style.overflowX = ''
            }
          })
        })
      }
    },
    [clearUnlockFrames],
  )

  const handleSettle = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    if (
      pendingTargetRef.current &&
      scrollOriginRef.current !== null &&
      Math.abs(track.scrollLeft - scrollOriginRef.current) < 1
    ) {
      return
    }

    pendingTargetRef.current = null
    scrollOriginRef.current = null

    const nearest = getNearestSlide(track)
    if (!nearest) return

    const domIdx = Number(nearest.dataset.slideIndex)
    setActiveIndex(domIdx)

    if (domIdx !== settledIndexRef.current) {
      settledIndexRef.current = domIdx
      parkAtIndex(domIdx, { lockOverflow: true })
      const slide = HERO_SLIDES[domIdx]
      setAnnouncement(`Slide ${domIdx + 1} of ${HERO_SLIDES.length}: ${slide.caption}`)
    }
  }, [parkAtIndex])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    if (!CSS.supports('order: sibling-count()')) {
      track.style.setProperty('--children-count', String(HERO_SLIDES.length))
    }

    settledIndexRef.current = 0
    parkAtIndex(0, { lockOverflow: false })

    const supportsScrollEnd = 'onscrollend' in window

    const onScroll = () => {
      if (!pendingTargetRef.current) {
        if (rafScrollRef.current === null) {
          rafScrollRef.current = requestAnimationFrame(() => {
            rafScrollRef.current = null
            const currentTrack = trackRef.current
            if (!currentTrack || pendingTargetRef.current) return
            const nearest = getNearestSlide(currentTrack)
            if (!nearest) return
            const domIdx = Number(nearest.dataset.slideIndex)
            setActiveIndex((prev) => (prev === domIdx ? prev : domIdx))
          })
        }
      }

      if (!supportsScrollEnd) {
        if (settleTimerRef.current !== null) {
          window.clearTimeout(settleTimerRef.current)
        }
        settleTimerRef.current = window.setTimeout(() => {
          settleTimerRef.current = null
          handleSettle()
        }, 120)
      }
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    if (supportsScrollEnd) {
      track.addEventListener('scrollend', handleSettle)
    }

    return () => {
      track.removeEventListener('scroll', onScroll)
      if (supportsScrollEnd) {
        track.removeEventListener('scrollend', handleSettle)
      }
      if (rafScrollRef.current !== null) {
        cancelAnimationFrame(rafScrollRef.current)
      }
      if (settleTimerRef.current !== null) {
        window.clearTimeout(settleTimerRef.current)
      }
      if (reducedMotionFallbackRef.current !== null) {
        cancelAnimationFrame(reducedMotionFallbackRef.current)
      }
      clearUnlockFrames()
    }
  }, [clearUnlockFrames, handleSettle, parkAtIndex])

  const navigateBy = (direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return

    const baseEl = pendingTargetRef.current ?? getNearestSlide(track)
    if (!baseEl) return

    const visualSlides = getVisualSlides(track)
    const idx = visualSlides.indexOf(baseEl)
    if (idx === -1) return

    const targetEl = visualSlides[idx + direction]
    if (!targetEl) return

    const trackRect = track.getBoundingClientRect()
    const targetRect = targetEl.getBoundingClientRect()
    const delta =
      targetRect.left + targetRect.width / 2 - (trackRect.left + trackRect.width / 2)

    pendingTargetRef.current = targetEl
    scrollOriginRef.current = track.scrollLeft
    setActiveIndex(Number(targetEl.dataset.slideIndex))

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({
      left: delta,
      behavior: reducedMotion ? 'auto' : 'smooth',
    })

    if (reducedMotion) {
      if (reducedMotionFallbackRef.current !== null) {
        cancelAnimationFrame(reducedMotionFallbackRef.current)
      }
      reducedMotionFallbackRef.current = requestAnimationFrame(() => {
        reducedMotionFallbackRef.current = null
        handleSettle()
      })
    }
  }

  const activeSlide = HERO_SLIDES[activeIndex] ?? HERO_SLIDES[0]

  return (
    <section id="hero" aria-labelledby="hero-heading">
      <div className="torq-container pt-[2.375rem] pb-10 tablet:py-section-md">
        <div className="grid grid-cols-1 items-center gap-strip-gap tablet:grid-cols-2 tablet:gap-6 laptop:gap-col-gap">
          <div className="flex min-w-0 flex-col items-start gap-[1.375rem] tablet:gap-7">
            <p className="text-label font-semibold text-brand-emerald">
              POWERING WORK. KEEPING LIFE FLOWING.
            </p>

            <h1
              id="hero-heading"
              className="text-display-mobile font-medium text-ink-primary text-balance laptop:text-display-laptop desktop:text-display-desktop"
            >
              A steady force.
              <br />
              For every flow.
            </h1>

            <p className="text-body-md font-normal text-ink-muted tablet:text-body-lg">
              The right motors. The right pumps. Real expertise.
              <br />
              Reliable solutions for your home, farm and industry.
            </p>

            <div className="flex flex-col items-start gap-3 tablet:flex-row tablet:flex-wrap tablet:items-center">
              <a
                href="#solutions"
                className="inline-flex items-center gap-2 rounded-control bg-brand-forest px-btn-x py-btn-y text-body-sm font-medium text-ink-inverse whitespace-nowrap transition-opacity hover:opacity-90"
              >
                Explore solutions
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-control border border-border-control px-btn-x py-btn-y text-body-sm font-medium text-ink-primary whitespace-nowrap transition-colors hover:border-brand-forest hover:bg-surface-strip"
              >
                Talk to an expert
              </a>
            </div>

            <p className="flex items-start gap-2.5 text-eyebrow">
              <span aria-hidden="true" className="shrink-0 font-normal text-brand-emerald">
                ●
              </span>
              <span className="font-medium text-ink-muted">
                Local expertise. Long-term peace of mind.
              </span>
            </p>
          </div>

          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured motors and pumps"
            className="min-w-0 overflow-hidden rounded-showcase bg-surface-media"
          >
            <div
              ref={trackRef}
              tabIndex={0}
              role="group"
              aria-label="Slides"
              className="hero-carousel-track focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-forest"
            >
              {HERO_SLIDES.map((slide, index) => (
                <div
                  key={slide.image.id}
                  data-slide-index={index}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${HERO_SLIDES.length}`}
                  className="w-full shrink-0"
                >
                  <img
                    src={slide.image.src}
                    alt={slide.image.alt}
                    width={slide.width}
                    height={slide.height}
                    fetchPriority={slide.isLcp ? 'high' : 'low'}
                    loading={slide.isLcp ? undefined : 'lazy'}
                    className="block h-[19.625rem] w-full object-cover tablet:h-[25.625rem] laptop:h-[30rem]"
                  />
                  <span className="sr-only">
                    {slide.eyebrow} — {slide.caption}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-0.5 px-card-pad pt-1.5 pb-[1.375rem]">
              <p className="text-micro font-semibold text-brand-emerald">
                {activeSlide.eyebrow}
              </p>

              <div className="-mt-1 -mr-1.5 flex shrink-0 items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => navigateBy(-1)}
                  aria-label="Previous slide"
                  className="inline-flex min-h-6 min-w-6 cursor-pointer touch-manipulation items-center justify-center rounded-control text-ink-muted transition-colors hover:bg-border-subtle/70 hover:text-ink-primary"
                >
                  <span aria-hidden="true">‹</span>
                </button>
                <span
                  aria-hidden="true"
                  className="px-0.5 whitespace-nowrap text-label font-medium text-ink-muted tabular-nums"
                >
                  {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  {String(HERO_SLIDES.length).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={() => navigateBy(1)}
                  aria-label="Next slide"
                  className="inline-flex min-h-6 min-w-6 cursor-pointer touch-manipulation items-center justify-center rounded-control text-ink-muted transition-colors hover:bg-border-subtle/70 hover:text-ink-primary"
                >
                  <span aria-hidden="true">›</span>
                </button>
              </div>

              <p className="col-span-2 text-caption font-medium text-ink-primary">
                {activeSlide.caption}
              </p>
            </div>

            <p className="sr-only" role="status" aria-live="polite">
              {announcement}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
