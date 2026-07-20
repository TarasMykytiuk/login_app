import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api';

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/auth/signup', { email, password });
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <form onSubmit={handleSignup} className="w-full max-w-md space-y-4 rounded bg-white p-8 shadow">
                <h2 className="text-2xl font-bold">Sign Up</h2>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full border p-2 rounded" />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full border p-2 rounded" />
                <button type="submit" className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700">Create Account</button>
                <p className="text-sm">Already registered? <Link to="/login" className="text-blue-600">Login</Link></p>
            </form>
        </div>
    );
};