import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style/style.css'

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <h2 className="loader-title">Pastelería<br />Wonderland</h2>
        <div className="loader-spinner"></div>
      </div>
    </div>
  )
}

function Root() {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
    setTimeout(() => setIsReady(true), 900)
    return <Loader />
  }

  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
