import { ProductLedPage } from './OptionOne'

const allowedBackgrounds = new Set(['signal', 'blueprint', 'midnight'])

export default function OptionFour() {
  const requested = new URLSearchParams(window.location.search).get('bg') ?? 'signal'
  const background = allowedBackgrounds.has(requested) ? requested : 'signal'
  return <><nav className="background-proposal-switcher" aria-label="Compare page background proposals"><span>Background</span>{[['signal','Signal Wash'],['blueprint','Blueprint'],['midnight','Midnight Flow']].map(([value,label]) => <a key={value} href={`/itera-option-4?bg=${value}`} aria-current={background === value ? 'page' : undefined}>{label}</a>)}</nav><ProductLedPage kinetic background={background} /></>
}