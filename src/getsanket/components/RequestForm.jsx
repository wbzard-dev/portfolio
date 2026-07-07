import React, { useState } from 'react'
import { CheckCircle, Send, Loader2, ArrowLeft, Copy, Check } from 'lucide-react'

const RequestForm = ({ onCancel }) => {
    const [loading, setLoading] = useState(false)
    const [formKey, setFormKey] = useState(null)
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({ name: '', email: '', useCase: '' })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await fetch('/api/request-backend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await response.json()
            if (data.success) {
                setFormKey(data.formKey)
            } else {
                setError(data.message || 'Something went wrong.')
            }
        } catch {
            setError('Failed to connect to the server.')
        } finally {
            setLoading(false)
        }
    }

    const copyKey = () => {
        navigator.clipboard.writeText(formKey)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (formKey) {
        const endpoint = `https://api.wbzard.com/api/s/${formKey}`
        return (
            <div className="card text-center py-20" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ color: '#10b981', marginBottom: '1.5rem' }}>
                    <CheckCircle size={48} />
                </div>
                <h2>Your backend is ready!</h2>
                <p>Point your HTML form's action to this endpoint:</p>

                <div className="code-block mt-8" style={{ textAlign: 'left', position: 'relative' }}>
                    <pre style={{ margin: 0, paddingRight: '40px', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                        {`<form action="${endpoint}" method="POST">\n  ...\n</form>`}
                    </pre>
                    <button
                        onClick={copyKey}
                        style={{
                            position: 'absolute', top: '12px', right: '12px',
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: copied ? '#10b981' : '#9ca3af', padding: '4px'
                        }}
                        title="Copy endpoint"
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                </div>

                <p style={{ marginTop: '1.5rem', fontSize: '14px' }}>
                    Save your form key: <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>{formKey}</code>
                    <br />You'll need it to view your submissions.
                </p>

                <button onClick={onCancel} className="btn-primary mt-8">
                    Back to Home
                </button>
            </div>
        )
    }

    return (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <button onClick={onCancel} className="btn-secondary" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={16} /> Back
            </button>

            <h2>Configure Backend</h2>
            <p className="mb-8">We'll generate a unique endpoint for your forms.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label style={{ fontSize: '14px', fontWeight: 600 }}>Name</label>
                    <input
                        required
                        type="text"
                        className="input-field"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label style={{ fontSize: '14px', fontWeight: 600 }}>Email Address</label>
                    <input
                        required
                        type="email"
                        className="input-field"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label style={{ fontSize: '14px', fontWeight: 600 }}>Use Case (Optional)</label>
                    <textarea
                        className="input-field"
                        style={{ minHeight: '100px', resize: 'vertical' }}
                        value={formData.useCase}
                        onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                    />
                </div>

                {error && (
                    <p style={{ color: '#ef4444', margin: 0, fontSize: '14px' }}>{error}</p>
                )}

                <button disabled={loading} type="submit" className="btn-primary justify-center mt-4">
                    {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <>Create My Backend <Send size={18} /></>
                    )}
                </button>
            </form>
        </div>
    )
}

export default RequestForm
