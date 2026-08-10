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
  const rotate = useTransform(scrollYProgress, [0.08, 0.58], [isMobile ? 10 : 20, 0]);
  const scale = useTransform(scrollYProgress, [0.08, 0.58], isMobile ? [0.75, 0.94] : [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0.08, 0.58], [0, isMobile ? -44 : -100]);

  return (
    <div
      className={`relative flex h-[64rem] items-center justify-center p-2 md:h-[80rem] md:p-20 ${className}`}
      ref={containerRef}
    >
      <div className="relative w-full py-10 md:py-40" style={{ perspective: "1000px" }}>
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
      boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
    }}
    className="mx-auto -mt-7 h-[44rem] w-full max-w-5xl rounded-[30px] border border-white/30 bg-white/10 p-2 shadow-2xl backdrop-blur-2xl backdrop-saturate-150 md:-mt-12 md:h-[40rem] md:p-6"
  >
    <div className="h-full w-full overflow-x-hidden overflow-y-auto overscroll-contain rounded-2xl border border-white/55 bg-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.96)] backdrop-blur-xl md:overflow-hidden md:p-4">
      {children}
    </div>
  </motion.div>
);
