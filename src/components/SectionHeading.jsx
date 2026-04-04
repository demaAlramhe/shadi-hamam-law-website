export function SectionHeading({ children, subtitle }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl lg:text-[2.625rem] lg:leading-[1.15]">
        {children}
      </h2>
      {subtitle ? (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-400/95 sm:text-lg">
          {subtitle}
        </p>
      ) : null}
      <div
        className="mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-gold-500/70 to-transparent md:mt-7 md:w-28"
        aria-hidden
      />
    </div>
  )
}
