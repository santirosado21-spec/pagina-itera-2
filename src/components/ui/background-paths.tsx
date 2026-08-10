"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AetherRibbonMesh from "@/components/ui/aether-ribbon-mesh";

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
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <section className="motion-visible relative flex min-h-[680px] w-full items-center justify-center overflow-hidden bg-white px-5 py-24 text-[#171d33] md:min-h-[760px]" aria-labelledby="background-paths-title">
      <div className="absolute inset-0" aria-hidden="true"><AetherRibbonMesh /></div>

      <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reducedMotion ? 0 : 0.55, ease: "easeOut" }}
          className="mx-auto max-w-5xl"
        >
          <p className="eyebrow !mb-6">AI fluency, measured</p>
          <h2 id="background-paths-title" className="mx-auto mb-7 !max-w-[980px] !text-[clamp(46px,7vw,88px)] !leading-[0.98] !tracking-[-0.045em] !text-[#171d33]">
            {title}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl !text-[clamp(18px,2vw,22px)] !leading-relaxed !text-[#606676]">{description}</p>

          <div className="group relative inline-block overflow-hidden rounded-full border border-[#dbe3f3] bg-white p-px shadow-[0_20px_60px_-34px_rgba(0,58,255,0.65)]">
            <Button
              asChild
              variant="ghost"
              className="h-auto rounded-full border border-[#b9c9ee] bg-[linear-gradient(145deg,#ffffff,#edf2ff)] px-8 py-5 text-[17px] font-semibold text-[#003aff] shadow-[inset_0_1px_0_rgba(255,255,255,1),0_16px_38px_-24px_rgba(0,58,255,0.72)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8facf0] hover:text-[#0026a8]"
            >
              <a href={primaryHref}>
                <span>{primaryLabel}</span>
                <span className="ml-3 opacity-70 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:opacity-100" aria-hidden="true">→</span>
              </a>
            </Button>
          </div>
          <small className="mt-6 block text-[13px] text-[#737b8b]">20-minute demo · one real case · evidence you can inspect</small>
        </motion.div>
      </div>
    </section>
  );
}
