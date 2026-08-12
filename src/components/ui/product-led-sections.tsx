"use client";

import { useState, type CSSProperties } from "react";
import { Linkedin, Minus, Plus } from "lucide-react";
import GlassCard, { type GlassCardProps } from "@/components/ui/glass-card";
import { calculateMonthlyPrice, getPricingTier, MIN_SEATS, normalizeSeats, PRICING_TIERS, seatsToSlider, sliderToSeats } from "@/lib/pricing";
import { links } from "@/data/content";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function ProductFormat({ cards, staticHub = false }: { cards: GlassCardProps[]; staticHub?: boolean }) {
  const left = cards.slice(0, 2);
  const right = cards.slice(2, 4);

  return (
    <div className="product-format-composition" aria-label="Four parts of the Itera product format">
      <svg className="product-format-connectors" viewBox="0 0 1200 720" preserveAspectRatio="none" aria-hidden="true">
        <path d="M285 176 C420 176 430 310 540 340" />
        <path d="M285 544 C420 544 430 410 540 380" />
        <path d="M915 176 C780 176 770 310 660 340" />
        <path d="M915 544 C780 544 770 410 660 380" />
      </svg>
      <div className="product-format-column">{left.map(card => <GlassCard key={card.title} className={staticHub ? "product-format-card-kinetic" : ""} {...card} />)}</div>
      <div className="product-format-hub">
        {!staticHub && <><span className="product-format-orbit" aria-hidden="true" /><span className="product-format-orbit orbit-two" aria-hidden="true" /></>}
        <div className="product-format-logo"><img src="/a0ba166a-1b60-4d4e-bf9f-8b669276e87c.png" alt="Itera" width="1371" height="659" /></div>
        <p>One continuous loop</p>
        <strong>Assess · practice · measure</strong>
      </div>
      <div className="product-format-column">{right.map(card => <GlassCard key={card.title} className={staticHub ? "product-format-card-kinetic" : ""} {...card} />)}</div>
    </div>
  );
}

export function PricingCalculator({ tiered = false }: { tiered?: boolean }) {
  const [seats, setSeats] = useState(tiered ? MIN_SEATS : 10);
  const update = (value: number) => setSeats(tiered ? normalizeSeats(value) : Math.max(1, Math.round(Number(value) || 1)));
  const tier = getPricingTier(seats);
  const monthly = tiered ? calculateMonthlyPrice(seats) : seats * 149;
  const sliderPosition = seatsToSlider(seats);
  const progress = sliderPosition / 10;
  return (
    <section id="pricing" className="pricing-section section" aria-labelledby="pricing-title">
      <div className="container pricing-grid">
        <div className="pricing-copy">
          {!tiered && <p className="eyebrow">Pricing calculator</p>}
          <h2 id="pricing-title">Plan the investment for your team.</h2>
          <p className="lead">{tiered ? "Drag the line to your team size. The indicated plan and per-seat price update automatically at each volume range." : "Start with the documented list price. Larger teams can request volume pricing tailored to rollout scope."}</p>
          <ul>
            <li>Role-based assessments and practice</li>
            <li>Manager dashboard and cited evidence</li>
            <li>Cancel anytime</li>
          </ul>
        </div>
        <div className="price-calculator">
          <div className="price-calculator-heading"><span>Team size</span><strong>{seats.toLocaleString("en-US")} {tiered ? "seats" : seats === 1 ? "person" : "people"}</strong></div>
          {tiered ? <>
            <div className="price-slider-wrap">
              <input id="price-slider" type="range" min="0" max="1000" step="1" value={sliderPosition} onChange={event => update(sliderToSeats(Number(event.target.value)))} aria-valuetext={`${seats.toLocaleString("en-US")} seats, ${tier.name} plan, ${money.format(tier.price)} per seat per month`} aria-label="Number of seats" aria-describedby="pricing-tier-status" style={{ "--slider-progress": `${progress}%` } as CSSProperties} />
              <div className="price-slider-limits" aria-hidden="true"><span>30</span><span>1,000+ seats</span></div>
            </div>
            <div id="pricing-tier-status" className="price-result" aria-live="polite"><span>{tier.name}</span><strong>{money.format(tier.price)} <small>per seat / month</small></strong><p>{tier.range} · {money.format(monthly)} estimated monthly total</p></div>
            <div className="pricing-tier-list" aria-label="Available volume plans">{PRICING_TIERS.map(item => <div key={item.name} className={item.name === tier.name ? "is-active" : ""}><strong>{item.name}</strong><span>{money.format(item.price)}</span><small>{item.range}</small></div>)}</div>
          </> : <>
            <div className="price-stepper" aria-label="Choose team size"><button type="button" onClick={() => update(seats - 1)} disabled={seats === 1} aria-label="Remove one person"><Minus aria-hidden="true" /></button><input id="price-slider" type="number" min="1" inputMode="numeric" value={seats} onChange={event => update(Number(event.target.value))} aria-label="Number of people" /><button type="button" onClick={() => update(seats + 1)} aria-label="Add one person"><Plus aria-hidden="true" /></button></div>
            <div className="price-result" aria-live="polite"><span>Estimated monthly list price</span><strong>{money.format(monthly)} <small>USD / month</small></strong><p>$149 per person/month · list-price estimate</p></div>
            <div className="volume-note"><strong>Volume pricing available</strong><span>Talk with us for a team-specific quote based on rollout scope.</span></div>
          </>}
          <a className="button itera-primary-cta" href={links.demo}>Request a team quote</a>
        </div>
      </div>
    </section>
  );
}

const people = [
  {
    name: "Santiago Rosado",
    role: "Co-founder",
    description: "Building Itera to make AI fluency observable, actionable, and measurable inside real teams.",
    image: "/team/santiago-rosado.webp",
    kineticImage: "/team/santiago-rosado-blue-full.webp",
  },
  {
    name: "Pablo",
    role: "Co-founder",
    description: "Building the product and operating system that turns everyday AI decisions into defensible evidence.",
    image: "/team/pablo.webp",
    kineticImage: "/team/pablo-blue.webp",
    linkedin: "https://www.linkedin.com/in/pblcrmn/",
  },
];

export function AboutUs({ kinetic = false }: { kinetic?: boolean }) {
  return (
    <section id="about" className="about-section section" aria-labelledby="about-title">
      <div className="container">
        <div className="about-heading">
          <div><p className="eyebrow">About us</p><h2 id="about-title">Built around a simple belief: AI readiness has to be observable.</h2></div>
          <p className="lead">Itera exists to help teams move beyond courses and self-reported confidence. We measure how people actually decide with AI, then turn the evidence into practice.</p>
        </div>
        <div className="founder-grid">
          {people.map(person => (
            <article className={`founder-card founder-card-${person.name.toLowerCase().replace(/\s+/g, "-")}`} key={person.name}>
              <div className="founder-photo"><img src={kinetic ? person.kineticImage : person.image} alt={`${person.name}, ${person.role} at Itera`} width="800" height="800" loading="lazy" decoding="async" /></div>
              <div className="founder-copy"><span>{person.role}</span><h3>{person.name}</h3><p>{person.description}</p>{person.linkedin && <a href={person.linkedin} target="_blank" rel="noreferrer" aria-label={`${person.name} on LinkedIn`}><Linkedin aria-hidden="true" />LinkedIn</a>}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
