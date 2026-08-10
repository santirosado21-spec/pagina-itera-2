import { PageShell } from '../components/Site'

const options = [
  ['/itera-option-1','01','Product-Led SaaS','Editorial Precision','Product first. A calm, light narrative with an interactive horizontal measurement pipeline.'],
  ['/itera-option-2','02','Enterprise','Data Command Center','Evidence first. A dashboard-led enterprise narrative with a vertical data pipeline.'],
  ['/itera-option-3','03','Next-Gen AI','Intelligence Surface','Precision first. A restrained dark-to-light narrative with a directed intelligence map.'],
]
export default function Chooser() { return <PageShell className="chooser"><main id="main"><div className="chooser-inner"><p className="eyebrow">Itera · Design directions</p><h1>Three ways to make AI judgment measurable.</h1><p className="chooser-lead">Each complete direction uses the same verified product story with a different buyer posture, narrative order, and interaction model.</p><nav aria-label="Choose a design direction" className="option-list">{options.map(([href,n,type,title,desc]) => <a href={href} key={href}><small>{n} / {type}</small><h2>{title}</h2><p>{desc}</p><span aria-hidden="true">View direction →</span></a>)}</nav></div></main></PageShell> }
