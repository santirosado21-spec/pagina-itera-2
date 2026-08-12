import * as React from "react";
import type { LucideIcon } from "lucide-react";

export interface GlassCardProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow: string;
  metric: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const GlassCard = React.forwardRef<HTMLElement, GlassCardProps>(
  ({ className = "", eyebrow, metric, title, description, icon: Icon, ...props }, ref) => (
    <article
      ref={ref}
      className={`group min-h-[280px] w-full [perspective:1200px] ${className}`}
      {...props}
    >
      <div className="relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[24px] border border-black/[0.08] bg-white p-6 shadow-[0_18px_40px_-34px_rgba(23,29,51,0.34)] transition-[transform,border-color,box-shadow] duration-300 ease-out [transform-style:preserve-3d] group-hover:border-[#003aff]/20 group-hover:shadow-[0_24px_48px_-36px_rgba(0,58,255,0.34)] group-hover:[transform:rotateX(2deg)_rotateY(-3deg)_translateY(-4px)] motion-reduce:transform-none motion-reduce:transition-none md:p-8">
        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 [transform-style:preserve-3d]" aria-hidden="true">
          <span className="absolute right-[-56px] top-[-56px] h-40 w-40 rounded-full border border-[#003aff]/[0.08] bg-[#003aff]/[0.025] [transform:translate3d(0,0,8px)]" />
          <span className="absolute right-[-28px] top-[-28px] h-28 w-28 rounded-full border border-[#003aff]/[0.10] bg-white/70 [transform:translate3d(0,0,16px)]" />
          <span className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#003aff]/15 bg-white text-[#003aff] leading-none shadow-[0_10px_28px_-20px_rgba(0,58,255,0.55)] [transform:translate3d(0,0,24px)] transition-transform duration-300 group-hover:[transform:translate3d(0,0,32px)] motion-reduce:transform-none motion-reduce:transition-none">
            <Icon className="block h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
          </span>
        </div>

        <div className="relative z-10 flex h-full flex-col [transform:translate3d(0,0,18px)] motion-reduce:transform-none">
          <span className="mb-12 block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#003aff]">{eyebrow}</span>
          <strong className="block text-[clamp(36px,4vw,52px)] font-semibold leading-none tracking-[-0.04em] text-[#171d33]">{metric}</strong>
          <h3 className="mb-3 mt-5 text-[24px] font-semibold leading-[1.16] tracking-[-0.025em] text-[#171d33]">{title}</h3>
          <p className="mb-0 mt-auto max-w-[34ch] text-[16px] leading-[1.55] text-[#606676]">{description}</p>
        </div>
      </div>
    </article>
  ),
);

GlassCard.displayName = "GlassCard";

export default GlassCard;
