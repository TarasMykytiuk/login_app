import { useOutletContext, useNavigate } from 'react-router-dom';
import { api } from '../api';

export const Dashboard = () => {
    const { user } = useOutletContext<{ user: { email: string } }>();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await api.post('/auth/logout');
        navigate('/login');
    };

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto flex items-center justify-between border-b pb-4">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <button onClick={handleLogout} className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">Log Out</button>
            </div>
            <div className="mt-8 rounded-lg bg-gray-100 p-6 shadow">
                <p className="text-xl">Hello <strong>{user.email}</strong></p>
            </div>
        </div>
    );
};