import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { IntranetProvider } from './context'
import registerServiceWorker from './registerServiceWorker'

// ReactDOM.render(
//   <IntranetProvider>
//     <App />
//   </IntranetProvider>,

//   document.getElementById('root')
// )

// After
import { createRoot } from 'react-dom/client'
const container = document.getElementById('root')
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(
  <IntranetProvider>
    <App />
  </IntranetProvider>
)

registerServiceWorker()
