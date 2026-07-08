import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const API = import.meta.env.DEV ? '' : 'https://form.wbzard.com'

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) { setLoading(false); return }

        fetch(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.json())
            .then(data => {
                if (data.success) setUser(data.user)
                else localStorage.removeItem('token')
            })
            .catch(() => localStorage.removeItem('token'))
            .finally(() => setLoading(false))
    }, [])

    const login = async (email, password) => {
        const res = await fetch(`${API}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        if (!data.success) throw new Error(data.message)
        localStorage.setItem('token', data.token)
        setUser(data.user)
        return data.user
    }

    const signup = async (name, email, password) => {
        const res = await fetch(`${API}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        })
        const data = await res.json()
        if (!data.success) throw new Error(data.message)
        localStorage.setItem('token', data.token)
        setUser(data.user)
        return data.user
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    const refreshUser = async () => {
        const token = localStorage.getItem('token')
        if (!token) return
        try {
            const res = await fetch(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
            const data = await res.json()
            if (data.success) setUser(data.user)
        } catch {}
    }

    const authFetch = (url, options = {}) => {
        const token = localStorage.getItem('token')
        return fetch(`${API}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
                Authorization: `Bearer ${token}`
            }
        })
    }

    const updateProfile = async (name, company_name, company_website) => {
        const res = await authFetch('/api/auth/profile', {
            method: 'PATCH',
            body: JSON.stringify({ name, company_name, company_website })
        })
        const data = await res.json()
        if (!data.success) throw new Error(data.message)
        setUser(data.user)
        return data.user
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, authFetch, refreshUser, updateProfile }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
