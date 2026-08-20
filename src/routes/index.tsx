import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Download,
  Play,
  Check,
  Heart,
  Users,
  Hand,
  Sparkles,
  Mail,
  Instagram,
  X,
  GraduationCap,
  Accessibility,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { jogos, type Jogo } from "@/data/jogos";
import heroImg from "@/assets/hero-libras.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sinais que Conectam " },
      {
        name: "description",
        content:
          "Catálogo de 5 jogos educativos em Libras criados pela turma da optativa de Libras. Conheça e baixe cada projeto gratuitamente.",
      },
      { property: "og:title", content: "Sinais que Conectam | Jogos em Libras" },
      {
        property: "og:description",
        content:
          "Cinco jogos interativos em Libras feitos por estudantes para promover acessibilidade, educação e inclusão da comunidade surda.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const secoes = ["inicio", "projetos", "sobre"];

function useSecaoAtiva() {
  const [ativa, setAtiva] = useState("inicio");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visivel = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visivel) setAtiva(visivel.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.4, 0.8] },
    );
    secoes.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return ativa;
}

function CardJogo({
  jogo,
  baixado,
  onBaixar,
  onDetalhes,
}: {
  jogo: Jogo;
  baixado: boolean;
  onBaixar: () => void;
  onDetalhes: () => void;
}) {
  const tom =
    jogo.tom === "mint"
      ? {
        bg: "bg-mint-soft",
        text: "text-mint",
        border: "border-mint/30",
        hover: "hover:bg-mint-soft",
      }
      : {
        bg: "bg-lilac-soft",
        text: "text-lilac",
        border: "border-lilac/30",
        hover: "hover:bg-lilac-soft",
      };


  return (
    <article
      className={`group flex flex-col rounded-3xl border ${tom.border} bg-card p-3 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card`}
    >
      <button
        type="button"
        onClick={onDetalhes}
        className="relative overflow-hidden rounded-2xl text-left"
        aria-label={`Ver detalhes de ${jogo.titulo}`}
      >
        <img
          src={jogo.imagem}
          alt={`Ilustração do jogo ${jogo.titulo}`}
          loading="lazy"
          width={640}
          height={512}
          className="aspect-[5/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute top-3 left-3 flex size-8 items-center justify-center rounded-full bg-background/90 text-xs font-extrabold ${tom.text}`}
        >
          {jogo.numero}
        </span>
      </button>

      <div className="flex flex-1 flex-col px-2 pt-4">
        <h3 className="font-display text-base font-extrabold text-ink">{jogo.titulo}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{jogo.descricao}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {jogo.tags.map((t) => (
            <span
              key={t}
              className={`rounded-full ${tom.bg} px-2.5 py-0.5 text-[11px] font-bold ${tom.text}`}
            >
              {t}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={onBaixar}
          className={`mt-4 mb-1 inline-flex w-full items-center justify-center gap-2 rounded-xl border ${tom.border} px-3 py-2.5 text-sm font-bold ${tom.text} ${tom.hover} transition-colors`}
        >
          {baixado ? (
            <>
              <Check className="size-4" aria-hidden /> Indo para o jogo
            </>
          ) : (
            <>
              <Download className="size-4" aria-hidden /> Jogar
            </>
          )}
        </button>
      </div>
    </article>
  );
}

function ModalJogo({ jogo, onClose }: { jogo: Jogo; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  
  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={jogo.titulo}
      onClick={onClose}
    >
      <div
        className="animate-in fade-in zoom-in-95 w-full max-w-lg overflow-hidden rounded-3xl bg-card shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={jogo.imagem}
            alt={`Ilustração do jogo ${jogo.titulo}`}
            width={640}
            height={512}
            className="aspect-[16/9] w-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-background/90 text-ink"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-xs font-bold tracking-widest text-mint uppercase">
            Projeto {jogo.numero}
          </p>
          <h3 className="mt-1 font-display text-2xl font-extrabold text-ink">{jogo.titulo}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{jogo.descricao}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Desenvolvido por estudantes da matéria optativa de Libras. O download inclui o jogo, um
            guia de uso em sala e as fontes de referência dos sinais utilizados.
          </p>
        </div>
      </div>
    </div>
  );
}

function Index() {
  const ativa = useSecaoAtiva();
  const [baixados, setBaixados] = useState<string[]>([]);
  const [detalhe, setDetalhe] = useState<Jogo | null>(null);

  const total = useMemo(() => jogos.length, []);

  const baixar = (numero: string) =>
    setBaixados((prev) => (prev.includes(numero) ? prev : [...prev, numero]));

    const [apoiadores, setApoiadores] = useState(0);


  return (
    <div className="min-h-screen bg-background">
      <SiteHeader active={ativa} />

      <main>
        {/* HERO */}
        <section id="inicio" className="relative overflow-hidden bg-hero-fade">
          <div className="pointer-events-none absolute top-10 -right-24 size-[26rem] rounded-full bg-mint-soft/70 blur-2xl" />
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-20">
            <div className="relative z-10">
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-10 rounded-full bg-mint" />
                <span className="size-1.5 rounded-full bg-lilac" />
              </div>
              <h1 className="mt-5 font-display text-4xl leading-[1.08] font-extrabold text-ink sm:text-5xl">
                Tecnologia que inclui,
                <span className="mt-1 block text-brand-gradient">
                  visibilidade que transforma.
                </span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                Conheça e baixe os projetos desenvolvidos pela nossa turma para promover a
                acessibilidade, a educação e a inclusão da comunidade surda.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projetos"
                  className="inline-flex items-center gap-2 rounded-xl bg-mint px-5 py-3 text-sm font-bold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
                >
                  <Play className="size-4" aria-hidden /> Explorar Projetos
                </a>

              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-x-6 top-6 bottom-0 rounded-[3rem] bg-mint-soft/80" />
              <img
                src={heroImg}
                alt="Estudante comunicando-se em Língua Brasileira de Sinais"
                width={912}
                height={1104}
                className="relative z-10 mx-auto max-h-[26rem] w-auto object-contain drop-shadow-xl"
              />
              <span className="absolute top-4 left-2 z-20 flex size-16 items-center justify-center rounded-2xl bg-lilac-soft text-lilac shadow-soft">
                <Hand className="size-7" aria-hidden />
              </span>
              <span className="absolute top-24 right-0 z-20 flex size-14 items-center justify-center rounded-full bg-background text-mint shadow-soft">
                <Users className="size-6" aria-hidden />
              </span>
              <span className="absolute right-4 bottom-10 z-20 flex size-14 items-center justify-center rounded-2xl bg-lilac-soft text-lilac shadow-soft">
                <Heart className="size-6" aria-hidden />
              </span>
            </div>
          </div>
        </section>

        {/* PROJETOS */}
        <section id="projetos" className="mx-auto max-w-6xl px-5 py-16">
          <div className="text-center">
            <h2 className="font-display text-3xl font-extrabold text-ink">
              Conheça nossos <span className="text-mint">{total} projetos</span>
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              Soluções interativas criadas para dar visibilidade e promover a inclusão da comunidade
              surda.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {jogos.map((jogo) => (
              <CardJogo
                key={jogo.numero}
                jogo={jogo}
                baixado={baixados.includes(jogo.numero)}
                onBaixar={() => baixar(jogo.numero)}
                onDetalhes={() => setDetalhe(jogo)}
              />
            ))}
          </div>


        </section>

        {/* SOBRE */}
        <section id="sobre" className="bg-muted/60 py-16">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-extrabold text-ink">
                Feito pela turma do 5º ADS AMS
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Fomos convidados pela professora Lillian, a participar desse projeto de trazer maior
                visibilidade à comunidade de pessoas não ouvintes. Inserindo eles mais próximos da sociedade,
                e a sociedade mais próxima deles por meio de jogos interativos.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Cada projeto foi pensado para trazer mais conhecimento e inclusão.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: GraduationCap, t: "Educativo", d: "Conteúdo alinhado ao estudo de Libras." },
                { icon: Accessibility, t: "Acessível", d: "Interfaces visuais e sem barreiras." },
                { icon: Sparkles, t: "Interativo", d: "Aprender brincando, em rodadas curtas." },
                { icon: Heart, t: "Gratuito", d: "Todos os projetos livres para baixar." },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-mint-soft text-mint">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-3 font-display text-base font-extrabold text-ink">{t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMUNIDADE */}
        <section id="comunidade" className="mx-auto max-w-6xl px-5 py-16">
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-lilac/25 bg-lilac-soft/50 p-8 md:flex-row md:justify-between md:p-10">

            <div className="flex items-start gap-4">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-background text-lilac shadow-soft">
                <Heart className="size-6" aria-hidden />
              </span>

              <div>
                <h2 className="font-display text-xl font-extrabold text-ink">
                  Juntos por uma sociedade mais inclusiva
                </h2>

                <p className="mt-1.5 max-w-lg text-sm text-muted-foreground">
                  Acreditamos em um mundo onde a comunicação não tenha barreiras.
                  Baixe, compartilhe e faça parte dessa transformação.
                </p>

                {/* CONTADOR */}
                <div className="mt-5">
                  <p className="text-sm font-semibold text-muted-foreground">
                    Já apoiaram esta causa:
                  </p>

                  <p className="mt-1 text-4xl font-black text-lilac">
                    {apoiadores.toLocaleString("pt-BR")}
                    <span className="ml-2 text-base font-bold text-ink">
                      {apoiadores === 1 ? "pessoa" : "pessoas"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* BOTÃO */}
            <button
              type="button"
              onClick={() => setApoiadores((atual) => atual + 1)}
              className="inline-flex items-center gap-2 rounded-xl border border-lilac/40 bg-background px-6 py-3 text-sm font-bold text-lilac shadow-soft transition-all hover:-translate-y-0.5 hover:bg-lilac hover:text-white active:scale-95"
            >
              <Heart className="size-4" aria-hidden />
              Apoie esta Causa
            </button>

          </div>
        </section>

       
      </main>


    </div>
  );
}
