import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { axiosInstance } from '../../services/axiosConfig';

function UserProfile() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;

        // Prefill from stored auth to avoid empty form while network request completes
        const stored = authService.getAuth();
        if (stored?.user) {
            setUser(stored.user);
            setEmail(stored.user.email || '');
            setPhoneNumber(stored.user.phoneNumber || '');
            setLoading(false);
        } else if (stored?.email) {
            // sometimes profile fields are stored at root
            setUser(stored);
            setEmail(stored.email || '');
            setPhoneNumber(stored.phoneNumber || '');
            setLoading(false);
        }

        const fetchProfile = async () => {
            setLoading(true);
            setError('');
            try {
                const token = authService.getToken();
                if (!token) {
                    // If there's no token but we had prefilling data, show that and allow user to re-login.
                    setError('Not authenticated. Please login again.');
                    return;
                }

                const res = await axiosInstance.get('/api/authentication/profile');
                if (!mounted) return;
                const data = res.data;
                setUser(data);
                setEmail(data.email || '');
                setPhoneNumber(data.phoneNumber || '');
            } catch (err) {
                // If unauthorized, axiosInstance interceptor will have logged out; show friendly error
                console.error('Profile fetch error', err?.response || err.message);
                if (err.response?.status === 401) {
                    setError('Session expired. Please login again.');
                } else {
                    setError(err.message || 'Failed to load profile');
                }
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchProfile();

        return () => { mounted = false; };
    }, [navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setError('');
        setSuccess('');
        try {
            const res = await axiosInstance.put('/api/authentication/profile', { email, phoneNumber });
            const updatedUser = res.data;
            setUser(updatedUser);
            setSuccess('Profile updated successfully');
            try {
                const stored = authService.getAuth() || {};
                const merged = { ...stored, user: updatedUser, role: updatedUser?.role || stored?.role };
                localStorage.setItem('heriplay_auth', JSON.stringify(merged));
            } catch (ldErr) {
                console.warn('Failed to update stored auth after profile update', ldErr);
            }
        } catch (err) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setUpdating(false);
        }
    };

    const containerStyle = {
        minHeight: '100vh',
        padding: '2rem',
        backgroundColor: '#f5f5f5'
    };

    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '2rem'
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h2 style={{ marginBottom: '1.5rem', color: '#F6C85F' }}>User Profile</h2>

                {error && (
                    <div style={{ 
                        color: '#d32f2f', 
                        marginBottom: '1rem', 
                        padding: '1rem', 
                        backgroundColor: '#ffebee', 
                        borderRadius: '0.5rem' 
                    }}>
                        {error}
                    </div>
                )}

                {success && (
                    <div style={{ 
                        color: '#388e3c', 
                        marginBottom: '1rem', 
                        padding: '1rem', 
                        backgroundColor: '#e8f5e9', 
                        borderRadius: '0.5rem' 
                    }}>
                        {success}
                    </div>
                )}

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>Loading profile...</div>
                ) : user ? (
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={`${user.name?.firstName || ''} ${user.name?.lastName || ''}`}
                                disabled
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={user.userName || ''} 
                                disabled
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input 
                                type="tel" 
                                className="form-control" 
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Role</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={user.role || ''} 
                                disabled
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            disabled={updating}
                            style={{ width: '100%' }}
                        >
                            {updating ? 'Updating...' : 'Update Profile'}
                        </button>
                    </form>
                ) : (
                    <div>No profile data available</div>
                )}
            </div>
        </div>
    );
}

export default UserProfile;
