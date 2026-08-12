"use client";

const integrations = [
  { name: "Anthropic", purpose: "Claude models", logo: "/brand-logos/anthropic.svg" },
  { name: "OpenAI", purpose: "GPT models", logo: "/brand-logos/openai.svg" },
  { name: "Voyage", purpose: "Embeddings", logo: "/brand-logos/voyage.svg" },
  { name: "Supabase", purpose: "Secure data", logo: "/brand-logos/supabase.svg" },
  { name: "Stripe", purpose: "Billing", logo: "/brand-logos/stripe.svg" },
];

function IntegrationCard({ integration, featured = false }: { integration: typeof integrations[number]; featured?: boolean }) {
  return (
    <article className={`built-with-itera__provider liquid-glass-panel ${featured ? "is-featured" : ""}`}>
      <img src={integration.logo} alt={`${integration.name} logo`} width="180" height="56" loading="lazy" decoding="async" />
      <strong>{integration.name}</strong>
      <span>{integration.purpose}</span>
    </article>
  );
}

export default function BuiltWithItera({ staticCore = false }: { staticCore?: boolean }) {
  const left = integrations.slice(0, 2);
  const center = integrations[2];
  const right = integrations.slice(3);

  return (
    <section id="built-with-itera" className="built-with-itera section" aria-labelledby="built-with-itera-title">
      <div className="container">
        <header className="built-with-itera__heading">
          <p className="eyebrow">Built with Itera</p>
          <h2 id="built-with-itera-title">A living stack around every decision.</h2>
          <p className="lead">Models, embeddings, secure data, and billing connected in one practice layer that keeps moving with the market.</p>
        </header>
        <div className="built-with-itera__layout" aria-label="Technology providers connected through Itera">
          <div className="built-with-itera__side">{left.map(integration => <IntegrationCard key={integration.name} integration={integration} />)}</div>
          <div className="built-with-itera__center">
            <div className="built-with-itera__core liquid-glass-panel" aria-label="Itera, one continuous practice layer">
              {!staticCore && <><span className="built-with-itera__orbit" aria-hidden="true" /><span className="built-with-itera__orbit orbit-two" aria-hidden="true" /></>}
              <img src="/a0ba166a-1b60-4d4e-bf9f-8b669276e87c.png" alt="Itera" width="1371" height="659" />
              <strong>One continuous layer</strong>
              <span>Practice · decide · measure</span>
            </div>
            {center && <IntegrationCard integration={center} featured />}
          </div>
          <div className="built-with-itera__side">{right.map(integration => <IntegrationCard key={integration.name} integration={integration} />)}</div>
        </div>
      </div>
    </section>
  );
}
