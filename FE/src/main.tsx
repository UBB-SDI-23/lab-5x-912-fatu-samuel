import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

export const API_URL = '/api'
// export const API_URL = 'http://46.101.118.44/main'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
