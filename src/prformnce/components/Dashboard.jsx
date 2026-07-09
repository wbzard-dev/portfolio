import React, { useState } from 'react'
import { Search, Loader2, ArrowLeft, ClipboardList, Clock, ChevronDown, ChevronUp } from 'lucide-react'

const SubmissionCard = ({ submission }) => {
    const [expanded, setExpanded] = useState(true)
    const fields = Object.entries(submission.data)

    return (
        <div className="card" style={{ padding: '16px 20px' }}>
            <button
                onClick={() => setExpanded(v => !v)}
                style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', background: 'none', border: 'none',
                    cursor: 'pointer', padding: 0
                }}
            >
                <span style={{ fontSize: '13px', color: '#888', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={13} />
                    {new Date(submission.submitted_at).toLocaleString()}
                </span>
                {expanded ? <ChevronUp size={16} color="#aaa" /> : <ChevronDown size={16} color="#aaa" />}
            </button>

            {expanded && (
                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {fields.map(([field, value]) => (
                        <div key={field} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '8px', fontSize: '14px' }}>
                            <span style={{ fontWeight: 600, color: '#666', textTransform: 'capitalize' }}>
                                {field.replace(/_/g, ' ')}
                            </span>
                            <span style={{ color: '#1a1a1a', wordBreak: 'break-word' }}>{String(value)}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

const Dashboard = ({ onBack }) => {
    const [key, setKey] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [result, setResult] = useState(null)

    const fetchSubmissions = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setResult(null)

        try {
            const res = await fetch(`/api/s/${key.trim()}/submissions`)
            const data = await res.json()

            if (data.success) {
                setResult(data)
            } else {
                setError(data.message || 'Invalid form key.')
            }
        } catch {
            setError('Failed to connect to server.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <button
                onClick={onBack}
                className="btn-secondary"
                style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
                <ArrowLeft size={16} /> Back
            </button>

            <h2>View Submissions</h2>
            <p>Enter your form key to load all submissions.</p>

            <form onSubmit={fetchSubmissions} className="flex gap-4" style={{ marginBottom: '2rem' }}>
                <input
                    required
                    type="text"
                    className="input-field"
                    placeholder="Your form key (e.g. 3f2a1b4c-...)"
                    value={key}
                    onChange={e => setKey(e.target.value)}
                    style={{ flex: 1, fontFamily: 'monospace', fontSize: '13px' }}
                />
                <button type="submit" disabled={loading} className="btn-primary">
                    {loading
                        ? <Loader2 size={18} className="animate-spin" />
                        : <><Search size={16} /> Load</>
                    }
                </button>
            </form>

            {error && (
                <div className="card" style={{ borderColor: '#ef4444', marginBottom: '1.5rem' }}>
                    <p style={{ color: '#ef4444', margin: 0 }}>{error}</p>
                </div>
            )}

            {result && (
                <>
                    <div className="card" style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ marginBottom: '4px' }}>{result.form.name}</h3>
                                <p style={{ margin: 0, fontSize: '14px' }}>{result.form.use_case || 'General form'}</p>
                            </div>
                            <span style={{ fontSize: '14px', color: '#888', whiteSpace: 'nowrap' }}>
                                {result.submissions.length} submission{result.submissions.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                    </div>

                    {result.submissions.length === 0 ? (
                        <div className="card text-center" style={{ padding: '48px' }}>
                            <ClipboardList size={40} style={{ color: '#ccc', marginBottom: '1rem' }} />
                            <p style={{ margin: 0, color: '#aaa' }}>No submissions yet.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {result.submissions.map(sub => (
                                <SubmissionCard key={sub.id} submission={sub} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Dashboard
