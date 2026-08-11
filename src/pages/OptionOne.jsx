import { Dashboard, Evidence, Footer, Nav, PageShell, ProductScreens, ProductWorkbench, Reveal, Simulation } from '../components/Site'
import { AnimatedHeroTitle } from '../components/ui/animated-hero'
import { GradientBackground } from '../components/ui/horizon-glow-gradient'
import KineticGrid from '../components/ui/kinetic-grid'
import HowItWorks from '@/components/ui/how-it-works'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { BackgroundPaths } from '@/components/ui/background-paths'
import Testimonials from '@/components/ui/testimonial'
import { AboutUs, PricingCalculator, ProductFormat } from '@/components/ui/product-led-sections'
import { Clock3, RefreshCw, ScanSearch, TimerReset } from 'lucide-react'
import { flow, links } from '../data/content'

const processFeatures = flow.map(([title, heading, description, output]) => ({
  title,
  description: `${heading} ${description}`,
  output,
}))

const productFormatCards = [
  { eyebrow: 'Assessment', metric: '15 min', title: 'One real case', description: 'A short role-based simulation ends in a real decision, not a generic quiz.', icon: Clock3 },
  { eyebrow: 'Evaluation', metric: '6 dimensions', title: 'Evidence behind every score', description: 'Judgment, accuracy, adoption, performance, risk control, and transparency are evaluated with citations.', icon: ScanSearch },
  { eyebrow: 'Practice', metric: '6 min', title: 'Fits inside the workday', description: 'Targeted practice addresses the exact weakness surfaced without interrupting the team’s operating rhythm.', icon: TimerReset },
  { eyebrow: 'Coverage', metric: 'Continuous', title: 'Evolves as AI ships', description: 'New scenarios keep assessment and practice aligned with the way AI changes at work.', icon: RefreshCw },
]

export function ProductLedPage({ kinetic = false }) { return <PageShell className={`option option-one ${kinetic ? 'option-four' : ''}`}><Nav productLed /><main id="main">
  <section className="lab-hero">{kinetic ? <KineticGrid className="lab-hero-kinetic" /> : <GradientBackground className="lab-hero-glow" />}<div className="container lab-hero-grid"><Reveal className="lab-copy"><p className="eyebrow">AI fluency you can measure</p><AnimatedHeroTitle /><p className="lead">Your team runs 15-minute simulations of the work they actually do. You see whose judgment holds up, where the gaps are, and what each person needs next.</p><div className="cta-row"><a className="button itera-primary-cta" href={links.demo}>Request a demo</a><a className="text-link" href="#product">See the product →</a></div></Reveal><Reveal className="workbench-wrap"><ProductWorkbench /></Reveal></div></section>
  <section className="lab-proof"><div className="container proof-line"><span>Real work</span><i/> <span>Observed decisions</span><i/> <span>Cited evidence</span><i/> <strong>Targeted practice</strong></div></section>
  <section id="product" className="lab-product section"><div className="container"><Reveal className="editorial-head"><p className="eyebrow">Product lab</p><h2>Practice the decision, not the prompt.</h2><p className="lead">Short practices use real artifacts: the made-up number in the draft, the customer data pasted into a prompt. Every practice ends in an action, not a quiz.</p></Reveal><Reveal><ProductScreens /></Reveal><div className="lab-features"><Reveal><span>01</span><h3>Simulate real work</h3><p>“The email your manager asked for”, “urgent incident”, “price objection”. People make the calls in flows they already own.</p></Reveal><Reveal><span>02</span><h3>Catch the cost before it ships</h3><p>Your team finds the hallucination or risky handoff before it reaches a customer, sensitive data, or a campaign.</p></Reveal><Reveal><span>03</span><h3>Measure what changed</h3><p>Assign targeted practice and re-assess to see what moved, backed by cited evidence.</p></Reveal></div></div></section>
  <section className="problem section"><div className="container narrow"><Reveal><p className="eyebrow">Why Itera</p><h2>Your team already uses AI.<br/><span>Nobody's checking their judgment.</span></h2><p className="lead">Prompting is the part everyone teaches. The harder part is choosing what to hand over in the first place, and judging what comes back. That's what we measure.</p></Reveal><Evidence inline /></div></section>
  <section id="how" className="how lab-flow section"><div className="container"><Reveal><p className="eyebrow">Nine-stage process</p><h2>From company context to measurable adoption.</h2><p className="lead">Follow the evidence from the work your people do to the readiness your managers can defend.</p></Reveal><HowItWorks features={processFeatures} className="mt-16 md:mt-20" /></div></section>
  <section id="managers" className="manager lab-manager dark overflow-hidden"><ContainerScroll titleComponent={<div className="px-5"><p className="eyebrow !text-[#8fb4ff]">For managers</p><h2 className="mx-auto !text-white">The dashboard that tells you who's ready for AI and who isn't.</h2><p className="lead mx-auto !text-[#b8c6dc]">See who decides well, where the team needs support, and assign the right practice with one click.</p><a className="text-link light-link mt-3" href={links.demo}>See the dashboard in a demo →</a></div>}><Dashboard className="h-full" /></ContainerScroll></section>
  <section className="measurement section"><div className="container"><div className="measurement-heading"><p className="eyebrow">Product format</p><h2>Small sessions. Defensible evidence.</h2><p className="lead">Four parts of one continuous system, centered on the decisions your team makes with AI.</p></div><ProductFormat cards={productFormatCards} /><p className="citation measurement-citation">Organizations with high shadow-AI use averaged $670K more in breach costs — IBM, Cost of a Data Breach Report 2025.</p></div></section>
  <PricingCalculator />
  <Testimonials />
  <AboutUs />
  <BackgroundPaths title="Find out where your team actually stands" description="Run one real case, see the evidence it produces, and know exactly what to improve next." primaryLabel="Request a demo" primaryHref={links.demo} />
 </main><Footer /></PageShell> }

export default function OptionOne() { return <ProductLedPage /> }
