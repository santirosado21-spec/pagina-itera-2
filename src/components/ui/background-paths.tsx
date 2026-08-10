"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface FloatingPathsProps {
  position: number;
  reducedMotion: boolean;
}

function FloatingPaths({ position, reducedMotion }: FloatingPathsProps) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <svg className="h-full w-full text-[#7ca8ff]" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.012}
            initial={reducedMotion ? false : { pathLength: 0.3, opacity: 0.4 }}
            animate={reducedMotion ? { pathLength: 1, opacity: 0.32, pathOffset: 0 } : { pathLength: 1, opacity: [0.2, 0.52, 0.2], pathOffset: [0, 1, 0] }}
            transition={reducedMotion ? { duration: 0 } : { duration: 18 + (path.id % 9) * 1.4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        ))}
      </svg>
    </div>
  );
}

export interface BackgroundPathsProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref: string;
}

export function BackgroundPaths({
  title = "Find out where your team actually stands",
  description = "Run one real case, see the evidence it produces, and know exactly what to improve next.",
  primaryLabel = "Request a demo",
  primaryHref,
}: BackgroundPathsProps) {
  const words = title.split(" ");
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <section className="motion-visible relative flex min-h-[720px] w-full items-center justify-center overflow-hidden bg-[#071426] px-5 py-24 text-white md:min-h-[820px]" aria-labelledby="background-paths-title">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(0,58,255,0.34),rgba(7,20,38,0)_48%)]" aria-hidden="true" />
      <div className="absolute inset-0 opacity-90">
        <FloatingPaths position={1} reducedMotion={reducedMotion} />
        <FloatingPaths position={-1} reducedMotion={reducedMotion} />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.75 }}
          className="mx-auto max-w-5xl"
        >
          <p className="eyebrow !mb-6 !text-[#9bbaff]">AI fluency, measured</p>
          <h2 id="background-paths-title" className="mx-auto mb-7 !max-w-[980px] !text-[clamp(46px,7vw,88px)] !leading-[0.98] !tracking-[-0.045em] !text-white">
            {words.map((word, wordIndex) => (
              <span key={`${word}-${wordIndex}`} className="mr-[0.24em] inline-block last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={reducedMotion ? false : { y: 72, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={reducedMotion ? { duration: 0 } : { delay: wordIndex * 0.07 + letterIndex * 0.018, type: "spring", stiffness: 150, damping: 25 }}
                    className="inline-block"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #ffffff, #a9c1ff)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl !text-[clamp(18px,2vw,22px)] !leading-relaxed !text-[#b8c6dc]">{description}</p>

          <div className="group relative inline-block overflow-hidden rounded-full border border-white/25 bg-gradient-to-b from-white/20 to-white/5 p-px shadow-[0_24px_80px_-32px_rgba(0,58,255,0.9)] backdrop-blur-xl">
            <Button
              asChild
              variant="ghost"
              className="h-auto rounded-full border border-white/60 bg-[radial-gradient(120%_110%_at_18%_0%,rgba(255,255,255,0.98),rgba(255,255,255,0.72)_48%,rgba(164,190,255,0.42)_100%)] px-8 py-5 text-[17px] font-semibold text-[#071426] shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,58,255,0.14),0_18px_45px_-22px_rgba(0,58,255,0.85)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/90 hover:text-[#003aff] hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_22px_55px_-20px_rgba(0,58,255,0.95)]"
            >
              <a href={primaryHref}>
                <span>{primaryLabel}</span>
                <span className="ml-3 opacity-70 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:opacity-100" aria-hidden="true">→</span>
              </a>
            </Button>
          </div>
          <small className="mt-6 block text-[13px] text-[#a8b7ce]">20-minute demo · one real case · evidence you can inspect</small>
        </motion.div>
      </div>
    </section>
  );
}
