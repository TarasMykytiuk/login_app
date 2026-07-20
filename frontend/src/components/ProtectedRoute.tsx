import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { api } from '../api';

export const ProtectedRoute = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        api.get('/auth/me')
            .then(res => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="flex h-screen items-center justify-center">Verifying session...</div>;

    return user ? <Outlet context={{ user }} /> : <Navigate to="/login" replace />;
};