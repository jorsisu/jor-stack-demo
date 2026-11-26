import { torqImages } from '../assets/images'

const PRODUCTS = [
  {
    title: 'Electric motors',
    description: 'Efficient motion. Consistent performance.',
    applications: 'Industrial drives · Machinery',
    image: torqImages.electricMotors,
  },
  {
    title: 'Submersible pumps',
    description: 'Dependable water, from the ground up.',
    applications: 'Borewells · Agriculture',
    image: torqImages.submersiblePumps,
  },
  {
    title: 'Surface pumps',
    description: 'The right pressure. Right where you need it.',
    applications: 'Homes · Water transfer',
    image: torqImages.surfacePumps,
  },
] as const

export function ProductCollection() {
  return (
    <section id="solutions" aria-labelledby="solutions-heading" className="py-section-lg max-tablet:py-[56px]">
      <div className="torq-container flex flex-col gap-9">
        <p className="text-eyebrow font-semibold text-brand-emerald">01 / OUR SOLUTIONS</p>

        <div className="flex flex-col gap-6 tablet:flex-row tablet:items-end">
          <h2
            id="solutions-heading"
            className="min-w-0 flex-1 text-heading-mobile font-medium text-ink-primary tablet:text-heading-tablet laptop:text-heading-lg"
          >
            The power behind<br />your everyday.
          </h2>
          <div className="flex min-w-0 flex-1 flex-col items-start gap-4">
            <p className="text-body-md text-ink-muted">
              From the first drop to the final rotation, find dependable equipment that works as hard as you do.
            </p>
            <a href="#product-families" className="inline-flex min-h-6 items-center text-link font-semibold text-ink-primary hover:underline">
              View all solutions <span aria-hidden="true" className="ml-1">↗</span>
            </a>
          </div>
        </div>

        <div id="product-families" className="grid grid-cols-1 gap-card-gap tablet:grid-cols-3">
          {PRODUCTS.map((product) => (
            <a key={product.title} href="#contact" className="group block rounded-card focus-visible:outline-2 focus-visible:outline-offset-2">
              <article className="h-full overflow-clip rounded-card border border-border-subtle bg-surface-card">
                <img
                  src={product.image.src}
                  alt={product.image.alt}
                  loading="lazy"
                  className="block h-[235px] w-full object-cover tablet:h-[170px] laptop:h-[275px]"
                />
                <div className="flex flex-col gap-3 p-card-pad tablet:px-4 laptop:px-card-pad">
                  <h3 className="flex min-w-0 items-start justify-between gap-2.5 text-card-title font-medium text-ink-primary tablet:text-card-title-tablet laptop:text-card-title">
                    <span>{product.title}</span>
                    <span aria-hidden="true" className="text-card-arrow font-normal text-brand-emerald transition-transform group-hover:translate-x-0.5">↗</span>
                  </h3>
                  <p className="min-h-[42px] text-body-sm text-ink-muted tablet:min-h-[54px] tablet:text-caption laptop:min-h-[42px] laptop:text-body-sm">
                    {product.description}
                  </p>
                  <p className="text-label font-medium text-brand-emerald tablet:text-micro laptop:text-label">
                    {product.applications}
                  </p>
                </div>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
