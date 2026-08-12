"use client";

import { useState } from "react";

interface ClientCard {
  company: string;
  logo: string;
  shortName: string;
  shortLogo: string;
  sector: string;
  impact: string;
  logoPosition?: string;
}

const clients: ClientCard[] = [
  {
    company: "Ponte Advisory",
    logo: "/client-logos/ponte-advisory.webp",
    shortName: "Ponte",
    shortLogo: "/client-logos/ponte.webp",
    sector: "Professional services",
    impact: "Our work with Ponte focuses on turning client-facing advisory work into role-based AI practice, with stronger verification, delegation, and judgment before work reaches a client.",
  },
  {
    company: "Aurea Legal",
    logo: "/client-logos/aurea-legal.webp",
    shortName: "Aurea",
    shortLogo: "/client-logos/aurea.webp",
    sector: "Legal services",
    impact: "Our work with Aurea focuses on translating legal workflows into realistic simulations, so the team can practice stronger review habits, clearer boundaries, and evidence-backed decisions.",
  },
  {
    company: "Serena Health",
    logo: "/client-logos/serena-health.webp",
    shortName: "Serena",
    shortLogo: "/client-logos/serena-clean.webp",
    sector: "Healthcare",
    impact: "Our work with Serena focuses on AI-readiness practice for healthcare workflows: recognizing risky handoffs, protecting context, and verifying outputs before acting.",
    logoPosition: "center 48%",
  },
];

export default function Testimonials({ namesOnly = false }: { namesOnly?: boolean }) {
  const [activeClient, setActiveClient] = useState<string | null>(null);

  return (
    <section className="section motion-visible bg-[#f5f7fb]" aria-labelledby="client-stories-title">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{namesOnly ? "Organizations" : "Clients"}</p>
          <h2 id="client-stories-title" className="mx-auto">{namesOnly ? "Ponte. Aurea. Serena." : "Teams already building stronger AI judgment with Itera."}</h2>
          {!namesOnly && <p className="lead mx-auto">Select a client to see the current publication status of their story.</p>}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {clients.map((client) => {
            if (namesOnly) return (
              <article key={client.shortName} className="client-card client-card-names-only">
                <div className="client-card-body">
                  <span className="client-logo-frame"><img src={client.shortLogo} alt={`${client.shortName} logo`} width="846" height="244" loading="lazy" decoding="async" /></span>
                  <span className="client-card-heading"><span><strong>{client.shortName}</strong><small className="client-sector">{client.sector}</small></span></span>
                  <p className="client-impact">{client.impact}</p>
                </div>
              </article>
            );

            const isActive = activeClient === client.company;
            const panelId = `client-${client.company.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <article key={client.company} className={`client-card ${isActive ? "is-active" : ""}`}>
                <button type="button" className="client-card-button" aria-expanded={isActive} aria-controls={panelId} onClick={() => setActiveClient(isActive ? null : client.company)}>
                  <span className="client-logo-frame"><img src={client.logo} alt={`${client.company} logo`} width="720" height="420" loading="lazy" decoding="async" style={{ objectPosition: client.logoPosition ?? "center" }} /></span>
                  <span className="client-card-heading"><span><strong>{client.company}</strong><small>{isActive ? "Close client status" : "View client status"}</small></span><span className="client-card-action" aria-hidden="true">{isActive ? "−" : "+"}</span></span>
                </button>
                <div id={panelId} className="client-card-detail" hidden={!isActive}><p>The client relationship is confirmed. The full story and exact quotation will be published after written approval.</p><span>Pending client approval</span></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
