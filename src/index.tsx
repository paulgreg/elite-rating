import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/Home.page.tsx'
import TournamentPage from './Pages/Tournament.page.tsx'

const container: HTMLElement | null = document.getElementById('root')
if (container) {
    const root = createRoot(container)
    root.render(
        <React.StrictMode>
            <BrowserRouter
                basename={
                    process.env.NODE_ENV === 'production' ? '/eliterating' : ''
                }
            >
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<HomePage />} />
                        <Route path="/:name/" element={<TournamentPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    )
}
