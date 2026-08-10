"use client";

import { useState } from "react";

interface ClientCard {
  company: string;
  logo: string;
  logoPosition?: string;
}

const clients: ClientCard[] = [
  {
    company: "Ponte Advisory",
    logo: "/client-logos/ponte-advisory.webp",
  },
  {
    company: "Aurea Legal",
    logo: "/client-logos/aurea-legal.webp",
  },
  {
    company: "Serena Health",
    logo: "/client-logos/serena-health.webp",
    logoPosition: "center 48%",
  },
];

export default function Testimonials() {
  const [activeClient, setActiveClient] = useState<string | null>(null);

  return (
    <section className="section motion-visible bg-[#f5f7fb]" aria-labelledby="client-stories-title">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Clients</p>
          <h2 id="client-stories-title" className="mx-auto">Teams already building stronger AI judgment with Itera.</h2>
          <p className="lead mx-auto">Select a client to see the current publication status of their story.</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {clients.map((client) => {
            const isActive = activeClient === client.company;
            const panelId = `client-${client.company.toLowerCase().replace(/\s+/g, "-")}`;

            return (
              <article key={client.company} className={`client-card ${isActive ? "is-active" : ""}`}>
                <button
                  type="button"
                  className="client-card-button"
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  onClick={() => setActiveClient(isActive ? null : client.company)}
                >
                  <span className="client-logo-frame">
                    <img
                      src={client.logo}
                      alt={`${client.company} logo`}
                      width="720"
                      height="420"
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: client.logoPosition ?? "center" }}
                    />
                  </span>
                  <span className="client-card-heading">
                    <span>
                      <strong>{client.company}</strong>
                      <small>{isActive ? "Close client status" : "View client status"}</small>
                    </span>
                    <span className="client-card-action" aria-hidden="true">{isActive ? "−" : "+"}</span>
                  </span>
                </button>

                <div id={panelId} className="client-card-detail" hidden={!isActive}>
                  <p>The client relationship is confirmed. The full story and exact quotation will be published after written approval.</p>
                  <span>Pending client approval</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
