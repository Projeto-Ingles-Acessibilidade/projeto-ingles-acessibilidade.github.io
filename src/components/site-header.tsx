import { Download, Menu, X, HandHeart } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Início", href: "#inicio" },
  { label: "Projetos", href: "#projetos" },
  { label: "Sobre", href: "#sobre" },
];

export function SiteHeader({ active }: { active: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#inicio" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-mint-soft text-mint">
            <HandHeart className="size-5" aria-hidden />
          </span>
          <span className="font-display text-lg leading-tight font-extrabold">
            <span className="block text-ink">Sinais que</span>
            <span className="-mt-1 block text-lilac">Conectam</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
          {links.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative text-sm font-semibold transition-colors ${
                  isActive ? "text-mint" : "text-muted-foreground hover:text-ink"
                }`}
              >
                {l.label}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-mint" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
         
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-ink md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-5 py-3 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-2 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
