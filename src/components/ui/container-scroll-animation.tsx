"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

export interface ContainerScrollProps {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const ContainerScroll = ({ titleComponent, children, className = "" }: ContainerScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const checkMobile = () => setIsMobile(media.matches);
    checkMobile();
    media.addEventListener("change", checkMobile);
    return () => media.removeEventListener("change", checkMobile);
  }, []);

  // useReducedMotion mirrors prefers-reduced-motion and keeps the product frame deterministic.
  const rotate = useTransform(scrollYProgress, [0.12, 0.58], [isMobile ? 5 : 10, 0]);
  const scale = useTransform(scrollYProgress, [0.12, 0.58], isMobile ? [0.86, 0.97] : [1.025, 1]);
  const translate = useTransform(scrollYProgress, [0.12, 0.58], [0, isMobile ? -24 : -56]);

  return (
    <div
      className={`relative flex h-[52rem] touch-pan-y items-center justify-center p-2 md:h-[64rem] md:p-12 ${className}`}
      ref={containerRef}
    >
      <div className="relative w-full py-8 md:py-24" style={{ perspective: "900px" }}>
        <Header translate={translate} titleComponent={titleComponent} reducedMotion={Boolean(shouldReduceMotion)} />
        <Card rotate={rotate} scale={scale} reducedMotion={Boolean(shouldReduceMotion)}>
          {children}
        </Card>
      </div>
    </div>
  );
};

interface HeaderProps {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
  reducedMotion: boolean;
}

export const Header = ({ translate, titleComponent, reducedMotion }: HeaderProps) => (
  <motion.div
    style={{ translateY: reducedMotion ? 0 : translate }}
    className="mx-auto max-w-5xl text-center"
  >
    {titleComponent}
  </motion.div>
);

interface CardProps {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  reducedMotion: boolean;
  children: React.ReactNode;
}

export const Card = ({ rotate, scale, reducedMotion, children }: CardProps) => (
  <motion.div
    style={{
      rotateX: reducedMotion ? 0 : rotate,
      scale: reducedMotion ? 1 : scale,
      boxShadow: "0 16px 42px rgba(0, 0, 0, 0.22), 0 50px 90px rgba(0, 0, 0, 0.13)",
    }}
    className="pointer-events-none mx-auto -mt-7 h-[40rem] w-full max-w-5xl touch-pan-y rounded-[30px] border border-white/30 bg-white/20 p-2 md:-mt-12 md:h-[40rem] md:p-5"
  >
    <div className="h-full w-full overflow-hidden rounded-2xl border border-white/55 bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.96)] md:p-4">
      {children}
    </div>
  </motion.div>
);
