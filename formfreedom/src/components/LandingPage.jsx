import React from 'react'
import { Mail, Shield, Zap, ArrowRight, Code, Terminal } from 'lucide-react'

const LandingPage = ({ onGetStarted }) => {
    const features = [
        {
            icon: <Zap size={20} />,
            title: "Zero Setup",
            desc: "Get a production-ready endpoint in seconds."
        },
        {
            icon: <Shield size={20} />,
            title: "Built-in Security",
            desc: "Rate limiting and honeypots included."
        },
        {
            icon: <Mail size={20} />,
            title: "Direct to Email",
            desc: "Submissions go straight to your inbox."
        }
    ]

    return (
        <div className="flex flex-col gap-8">
            <section className="text-center py-20">
                <h1>Your Forms, Simply Managed.</h1>
                <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Stop building complex backends. Get a unique endpoint and collect submissions instantly.
                </p>
                <button onClick={onGetStarted} className="btn-primary">
                    Get Your Backend <ArrowRight size={18} />
                </button>
            </section>

            <section className="grid md-grid-cols-3 gap-8">
                {features.map((f, i) => (
                    <div key={i} className="card">
                        <div style={{ marginBottom: '1rem', color: '#3b82f6' }}>{f.icon}</div>
                        <h3>{f.title}</h3>
                        <p style={{ margin: 0 }}>{f.desc}</p>
                    </div>
                ))}
            </section>

            <section className="card mt-20">
                <h2 style={{ fontSize: '1.5rem' }}>How it works</h2>
                <p>Just point your form's action to your unique URL. No API keys, no configuration.</p>

                <div className="code-block mt-8">
                    <pre style={{ margin: 0 }}>
                        {`<form action="https://formfreedom.com/api/s/YOUR_KEY" method="POST">
  <input type="text" name="name" placeholder="Name" />
  <input type="email" name="email" placeholder="Email" />
  <button type="submit">Submit</button>
</form>`}
                    </pre>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
