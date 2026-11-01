import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import pandaClip from "@/assets/panda-loop.webp.asset.json";
import pandaStill from "@/assets/panda-notail.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "404 - Página não encontrada | DEV Wak" },
      { name: "description", content: "Ops! O panda da DEV Wak se perdeu no caminho. Volte para o início." },
      { property: "og:title", content: "404 - Página não encontrada | DEV Wak" },
      { property: "og:description", content: "Ops! O panda da DEV Wak se perdeu no caminho. Volte para o início." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});


function Logo() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="grid grid-cols-2 gap-0.5">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full" />
        ))}
      </div>
      <span
        className="text-brand-soft font-bold text-lg sm:text-xl ml-1"
        style={{ textShadow: "0 0 12px rgba(46,16,101,0.95), 0 1px 2px rgba(46,16,101,0.85)" }}
      >
        DEV&nbsp;Wak
      </span>
    </div>
  );
}

function Index() {
  const textRef = useRef<HTMLDivElement>(null);
  const [scaleY, setScaleY] = useState(1);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const measure = () => {
      const h = textRef.current?.offsetHeight;
      if (h) setScaleY(window.innerHeight / h);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col relative bg-[linear-gradient(to_bottom,var(--color-brand-deep),var(--color-brand))] font-sans">
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{
          opacity: 0.75,
          maskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
        }}
      >
        <div
          ref={textRef}
          className="text-white font-black leading-none tracking-tighter whitespace-nowrap"
          style={{ fontSize: "clamp(200px, 48vw, 800px)", transform: `scale(1.15, ${scaleY * 1.4})` }}
        >
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="bg-white/25 rounded-full h-[22vh] sm:h-[26vh] md:h-[50vh]"
            style={{ width: "clamp(120px, 20vw, 400px)", transform: `scaleY(${scaleY})`, transformOrigin: "center" }}
          />
        </div>
      </div>

      <nav className="relative z-20 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 sm:py-5">
        <Logo />
      </nav>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginTop: "calc(-6vh - 40px)" }}>
        <div className="relative">
          <span className="animate-panda-shadow absolute left-1/2 -bottom-[1.5vh] w-[58%] h-[3vh] rounded-[50%] bg-black/50 blur-lg" />
          <img
            src={still ? pandaStill : pandaClip.url}
            onError={() => setStill(true)}
            alt="Panda da DEV Wak olhando para o celular e sorrindo"
            width={283}
            height={645}
            className="animate-panda relative block h-[52vh] sm:h-[56vh] md:h-[62vh] w-auto max-w-[80vw] object-contain"
          />

        </div>
      </div>

      <div className="relative z-30 mt-auto pb-8 sm:pb-16 flex flex-col items-center text-center px-4">
        <h1 className="text-white text-lg sm:text-xl md:text-2xl font-medium mb-3 sm:mb-4">Ops, algo deu errado!</h1>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full text-brand-deep font-semibold text-sm sm:text-base bg-white hover:scale-105 hover:shadow-lg transition-all"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Voltar ao Início
        </a>
      </div>

    </div>
  );
}
