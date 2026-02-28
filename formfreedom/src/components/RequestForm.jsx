import React, { useState } from 'react'
import { CheckCircle, Send, Loader2, ArrowLeft } from 'lucide-react'

const RequestForm = ({ onCancel }) => {
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        useCase: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch('/api/request-backend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()
            if (data.success) {
                setSubmitted(true)
            } else {
                alert(data.message || 'Something went wrong.')
            }
        } catch (error) {
            console.error('Request error:', error)
            alert('Failed to connect to the server. Make sure the backend is running.')
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <div className="card text-center py-20">
                <div style={{ color: '#10b981', marginBottom: '1.5rem' }}>
                    <CheckCircle size={48} />
                </div>
                <h2>Request successful!</h2>
                <p>
                    We've sent your unique key and instructions to <strong>{formData.email}</strong>.
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
            <p className="mb-8">Tell us where to send your submissions.</p>

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

                <button
                    disabled={loading}
                    type="submit"
                    className="btn-primary justify-center mt-4"
                >
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
