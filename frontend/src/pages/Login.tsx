import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/auth/login', { email, password });
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Authentication failed');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <form onSubmit={handleLogin} className="w-full max-w-md space-y-4 rounded bg-white p-8 shadow">
                <h2 className="text-2xl font-bold">Login</h2>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full border p-2 rounded" />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full border p-2 rounded" />
                <button type="submit" className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700">Login</button>
                <p className="text-sm">Need an account? <Link to="/signup" className="text-blue-600">Sign up</Link></p>
            </form>
        </div>
    );
};