import { cn } from "@/lib/utils";

interface ClientCard {
  company: string;
  initials: string;
  accent: string;
  surface: string;
}

const clients: ClientCard[] = [
  {
    company: "Ponte Advisory",
    initials: "PA",
    accent: "from-[#5f8cff] to-[#003aff]",
    surface: "from-[#14254a] via-[#0d1c39] to-[#071426]",
  },
  {
    company: "Aurela Legal",
    initials: "AL",
    accent: "from-[#9bbaff] to-[#315fff]",
    surface: "from-[#1b2750] via-[#111d3c] to-[#071426]",
  },
  {
    company: "Serena Health",
    initials: "SH",
    accent: "from-[#7cc8ff] to-[#003aff]",
    surface: "from-[#123454] via-[#0b2743] to-[#071426]",
  },
];

function ClientVisual({ client }: { client: ClientCard }) {
  return (
    <div className={cn("relative h-[240px] overflow-hidden rounded-[22px] bg-gradient-to-br", client.surface)} aria-hidden="true">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#003aff]/35 blur-3xl" />
      <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#7cc8ff]/20 blur-3xl" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn("flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/25 bg-gradient-to-br text-[30px] font-semibold tracking-[-0.04em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.35),0_22px_60px_-24px_rgba(0,58,255,.9)] backdrop-blur-xl", client.accent)}>
          {client.initials}
        </span>
      </div>
      <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c5d4ef] backdrop-blur-lg">Itera client</span>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="section motion-visible bg-[#f5f7fb]" aria-labelledby="client-stories-title">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Client stories</p>
          <h2 id="client-stories-title" className="mx-auto">What our clients say about working with Itera.</h2>
          <p className="lead mx-auto">The client roster is confirmed. Exact quotations and spokesperson details will be published only after written approval.</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {clients.map((client) => (
            <article key={client.company} className="group rounded-[28px] border border-white/80 bg-white/62 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,.98),0_24px_64px_-42px_rgba(7,20,38,.5)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_30px_70px_-38px_rgba(0,58,255,.42)]">
              <ClientVisual client={client} />
              <div className="px-4 pb-5 pt-6">
                <p className="min-h-[92px] border-b border-[#dfe4ee] pb-5 text-[16px] font-medium leading-7 text-[#3f4d63]">Quote pending written client approval. The approved statement will be published without altering the client’s wording.</p>
                <h3 className="mb-1 mt-5 text-[19px] font-semibold tracking-[-0.02em] text-[#171d33]">{client.company}</h3>
                <p className="mb-0 bg-gradient-to-r from-[#003aff] to-[#5f8cff] bg-clip-text text-[12px] font-semibold uppercase tracking-[0.06em] text-transparent">Pending client approval</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
