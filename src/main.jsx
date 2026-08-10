import React from 'react'
import { createRoot } from 'react-dom/client'
import Chooser from './pages/Chooser'
import OptionOne from './pages/OptionOne'
import OptionTwo from './pages/OptionTwo'
import OptionThree from './pages/OptionThree'
import OptionFour from './pages/OptionFour'
import './styles/global.css'

const routes = { '/itera-option-1': OptionOne, '/itera-option-2': OptionTwo, '/itera-option-3': OptionThree, '/itera-option-4': OptionFour }
const titles = {
  '/itera-option-1': 'Itera — Product-Led SaaS',
  '/itera-option-2': 'Itera — Enterprise',
  '/itera-option-3': 'Itera — Next-Gen AI',
  '/itera-option-4': 'Itera — Product-Led Kinetic Grid',
}
const path = window.location.pathname.replace(/\/$/, '') || '/'
const App = routes[path] || Chooser
document.title = titles[path] || 'Itera — Design directions'
createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
