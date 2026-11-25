export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <section className="relative overflow-hidden border-b border-ink/10">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-40 h-[420px] w-[420px] rounded-full bg-brand/10 blur-[120px]" />
        <div className="absolute right-[-8%] top-[-30%] h-[380px] w-[380px] rounded-full bg-gold/20 blur-[110px]" />
      </div>
      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand">
              {eyebrow}
            </span>
            <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.05] tracking-[-0.03em] text-ink">
              {title}
            </h1>
            {description && (
              <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-slate">
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}