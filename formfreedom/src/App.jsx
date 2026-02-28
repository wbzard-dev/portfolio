import React, { useState } from 'react'
import LandingPage from './components/LandingPage'
import RequestForm from './components/RequestForm'

const App = () => {
    const [showForm, setShowForm] = useState(false)

    return (
        <div className="container">
            <header className="py-20 flex justify-between items-center">
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>FormFreedom</h1>
                {!showForm && (
                    <button onClick={() => setShowForm(true)} className="btn-primary">
                        Get Started
                    </button>
                )}
            </header>

            <main>
                {!showForm ? (
                    <LandingPage onGetStarted={() => setShowForm(true)} />
                ) : (
                    <RequestForm onCancel={() => setShowForm(false)} />
                )}
            </main>

            <footer className="mt-20 py-20 text-center" style={{ borderTop: '1px solid #eee' }}>
                <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} FormFreedom.</p>
                <p style={{ marginTop: '8px', fontSize: '14px', color: '#888' }}>
                    Need help? <a href="mailto:vivekg.work@gmail.com" style={{ color: '#000', fontWeight: 'bold' }}>Email support</a>
                </p>
            </footer>
        </div>
    )
}

export default App
