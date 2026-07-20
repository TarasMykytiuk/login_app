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
        <div>
            <div>
                <h1>Dashboard</h1>
                <button onClick={handleLogout}>Log Out</button>
            </div>
            <div>
                <p>Hello <strong>{user.email}</strong></p>
            </div>
        </div>
    );
};