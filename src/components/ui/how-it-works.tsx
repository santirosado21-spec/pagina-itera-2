"use client";

import React from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";

interface CardProps {
  number: string;
  title: string;
  description: string;
  output?: string;
  className?: string;
  rotate?: string;
  style?: React.CSSProperties;
  index: number;
  reducedMotion: boolean;
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

const Pin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993L16 5v4.764l1.894 3.789a1 1 0 0 1 .1.331L18 14v2a1 1 0 0 1-.883.993L17 17h-4v4a1 1 0 0 1-1.993.117L11 21v-4H7a1 1 0 0 1-.993-.883L6 16v-2a1 1 0 0 1 .06-.34l.046-.107L8 9.762V5a1 1 0 0 1-.117-1.993L8 3h8z" />
  </svg>
);

const Card = ({
  number,
  title,
  description,
  output,
  className = "",
  rotate = "",
  style,
  index,
  reducedMotion,
  colors = {
    bg: "bg-[#f4f7ff]",
    text: "text-[#003aff]",
    border: "border-[#dce5ff]",
  },
}: CardProps) => (
  <m.article
    className={`relative z-10 w-full lg:w-[300px] hover:z-30 ${rotate} ${className}`}
    style={{ ...style, backgroundImage: "linear-gradient(135deg, rgba(0,58,255,0.035), transparent 46%)" }}
    initial={reducedMotion ? false : { opacity: 0, x: index % 2 === 0 ? -56 : 56, y: 56 }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, amount: 0.22 }}
    transition={{ duration: reducedMotion ? 0 : 0.62, delay: reducedMotion ? 0 : Math.min(index * 0.055, 0.32), ease: [0.22, 1, 0.36, 1] }}
    whileHover={reducedMotion ? undefined : { y: -4, scale: 1.02 }}
  >
    <div className="rounded-[25px] border border-white/80 bg-white/55 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_18px_46px_-26px_rgba(0,58,255,0.48)] backdrop-blur-xl backdrop-saturate-150">
      <Pin className={`mx-auto mb-4 h-8 w-8 ${colors.text}`} />
      <div className={`relative flex min-h-[218px] flex-col overflow-hidden rounded-[17px] border p-5 ${colors.bg} ${colors.border}`}>
        <span className={`mb-4 text-[34px] font-semibold leading-none tracking-[-0.04em] ${colors.text}`}>
          {number}
        </span>
        <h3 className="mb-2 text-[22px] font-semibold leading-tight tracking-[-0.025em] text-[#171d33]">
          {title}
        </h3>
        <p className="mb-0 text-[14px] leading-6 text-[#606676]">{description}</p>
        {output && (
          <div className="mt-auto border-t border-current/10 pt-4">
            <small className={`block text-[10px] font-semibold uppercase tracking-[0.08em] ${colors.text}`}>Output</small>
            <strong className="mt-1 block text-[13px] font-semibold text-[#171d33]">{output}</strong>
          </div>
        )}
      </div>
    </div>
  </m.article>
);

export interface Step {
  title: string;
  description: string;
  output?: string;
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

export interface StepPosition {
  className?: string;
  rotate?: string;
  style?: React.CSSProperties;
}

export interface HowItWorksProps {
  features: Step[];
  className?: string;
  stepPositions?: StepPosition[];
}

const DEFAULT_COLORS = [
  { bg: "bg-[#eef3ff]/75", text: "text-[#003aff]", border: "border-white/75" },
  { bg: "bg-[#eef9ff]/75", text: "text-[#006fc9]", border: "border-white/75" },
  { bg: "bg-[#f4f1ff]/75", text: "text-[#6247c7]", border: "border-white/75" },
];

export default function HowItWorks({ features, className = "", stepPositions }: HowItWorksProps) {
  const reducedMotion = Boolean(useReducedMotion());
  const data = features;
  const rowSpacing = 380;
  const rows = Math.ceil(data.length / 3);
  const height = Math.max(420, rows * rowSpacing + 20);
  const desktopSlots = [
    ["4%", 0], ["35%", 0], ["66%", 0],
    ["66%", 1], ["35%", 1], ["4%", 1],
    ["4%", 2], ["35%", 2], ["66%", 2],
  ] as const;
  const positions = stepPositions || data.map((_, index) => {
    const [left, row] = desktopSlots[index % desktopSlots.length];
    return {
      className: "lg:absolute lg:left-[var(--step-left)]",
      rotate: index % 2 === 0 ? "lg:rotate-1" : "lg:-rotate-1",
      style: {
        "--step-top": `${row * rowSpacing}px`,
        "--step-left": left,
      } as React.CSSProperties,
    };
  });

  const points = data.map((_, index) => {
    const [left, row] = desktopSlots[index % desktopSlots.length];
    return {
      x: Number.parseInt(left, 10) * 10 + 150,
      y: row * rowSpacing + 145,
    };
  });
  const pathD = points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const previous = points[index - 1];
    const middleY = (previous.y + point.y) / 2;
    return `${path} C ${previous.x} ${middleY}, ${point.x} ${middleY}, ${point.x} ${point.y}`;
  }, "");

  return (
    <LazyMotion features={domAnimation}>
      <div className={`relative overflow-hidden rounded-[32px] border border-white/80 bg-white/48 px-5 py-12 shadow-[inset_0_1px_0_rgba(255,255,255,0.96),0_30px_80px_-56px_rgba(0,58,255,0.55)] backdrop-blur-2xl backdrop-saturate-150 md:px-8 md:py-20 ${className}`}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.055]"
          style={{ backgroundImage: "linear-gradient(#171d33 1px, transparent 1px)", backgroundSize: "100% 32px", marginTop: "4px" }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="relative mx-auto flex h-auto w-full max-w-[1000px] flex-col space-y-7 lg:block lg:h-[var(--process-height)]" style={{ "--process-height": `${height}px` } as React.CSSProperties}>
            {data.length > 1 && (
              <svg className="pointer-events-none absolute left-0 top-0 z-0 hidden h-full w-full lg:block" viewBox={`0 0 1000 ${height}`} preserveAspectRatio="none" aria-hidden="true">
                <m.path
                  d={pathD}
                  stroke="currentColor"
                  className="text-[#b8c4dc]"
                  strokeWidth="2"
                  strokeDasharray="8 6"
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  animate={{ strokeDashoffset: reducedMotion ? 0 : -140 }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            )}
            {data.map((step, index) => {
              const position = positions[index % positions.length];
              return (
                <Card
                  key={step.title}
                  number={String(index + 1).padStart(2, "0")}
                  title={step.title}
                  description={step.description}
                  output={step.output}
                  colors={step.colors || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                  rotate={position.rotate}
                  className={`${position.className || ""} lg:top-[var(--step-top)]`}
                  style={position.style}
                  index={index}
                  reducedMotion={reducedMotion}
                />
              );
            })}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
