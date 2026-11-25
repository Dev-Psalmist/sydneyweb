import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, Phone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import BrandMark from "@/components/site/BrandMark";
import { SITE } from "@/data/site";

const NAV = [
  { label: "Services", to: "/services" },
  { label: "Leadership", to: "/", hash: "leadership" },
  { label: "Customer care", to: "/support" },
  { label: "Contact", to: "/contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-2xl transition-all duration-500 ${
        scrolled
          ? "border-ink/12 bg-ivory/80 shadow-[0_24px_50px_-38px_rgba(20,16,15,0.65)]"
          : "border-white/70 bg-ivory/65"
      }`}
    >
      <div className="mx-auto flex h-[78px] max-w-[1440px] items-center gap-5 px-4 md:h-[92px] md:gap-6 md:px-8">
        <BrandMark />

        <nav className="ml-8 hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              className="group relative text-[13.5px] font-medium text-slate transition-colors hover:text-ink"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-5 lg:flex">
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-2 font-mono text-[11.5px] tracking-[0.04em] text-slate transition-colors hover:text-brand"
          >
            <Phone className="h-3.5 w-3.5" />
            {SITE.phone}
          </a>
          <Link
            to="/book"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[13px] font-medium text-white shadow-[0_18px_30px_-18px_rgba(123,35,82,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-deep"
          >
            Book appointment
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-3 lg:hidden">
          <Link
            to="/book"
            className="rounded-full bg-brand px-4 py-2 text-[12px] font-medium text-white"
          >
            Book
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm border-ink/10 bg-ivory">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="mt-2">
                <BrandMark />
              </div>
              <nav className="mt-10 flex flex-col">
                {NAV.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    hash={item.hash}
                    onClick={() => setOpen(false)}
                    className="border-b border-ink/10 py-4 font-display text-2xl text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Link
                to="/book"
                onClick={() => setOpen(false)}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-medium text-white"
              >
                Book an appointment
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={SITE.phoneHref}
                className="mt-6 flex items-center gap-2 font-mono text-xs tracking-[0.05em] text-slate"
              >
                <Phone className="h-3.5 w-3.5" />
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-2 block break-all font-mono text-xs text-slate"
              >
                {SITE.email}
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}