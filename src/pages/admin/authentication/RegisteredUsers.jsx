import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../services/userService';

function RegisteredUsers(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            console.error('Failed to fetch users:', err); // Log the error for debugging
            setError(err.message || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const containerStyle = {
        minHeight: '100vh',
        padding: '2rem',
        backgroundColor: '#f5f5f5'
    };

    const tableStyle = {
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        width: '100%',
        borderCollapse: 'collapse'
    };

    const headerStyle = {
        backgroundColor: '#F6C85F',
        padding: '1rem',
        borderBottom: '1px solid #e0e0e0'
    };

    return(
        <div style={containerStyle}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{ marginBottom: '2rem' }}>Registered Users</h2>
                
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

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>Loading users...</div>
                ) : users.length === 0 ? (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '2rem', 
                        backgroundColor: 'white', 
                        borderRadius: '0.5rem' 
                    }}>
                        <p>No users found.</p>
                    </div>
                ) : (
                    <table style={tableStyle}>
                        <thead>
                            <tr style={headerStyle}>
                                <th style={{ textAlign: 'left', padding: '1rem', borderRight: '1px solid #e0e0e0' }}>User ID</th>
                                <th style={{ textAlign: 'left', padding: '1rem', borderRight: '1px solid #e0e0e0' }}>First Name</th>
                                <th style={{ textAlign: 'left', padding: '1rem', borderRight: '1px solid #e0e0e0' }}>Last Name</th>
                                <th style={{ textAlign: 'left', padding: '1rem', borderRight: '1px solid #e0e0e0' }}>Email</th>
                                <th style={{ textAlign: 'left', padding: '1rem', borderRight: '1px solid #e0e0e0' }}>Username</th>
                                <th style={{ textAlign: 'left', padding: '1rem' }}>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.userId} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                    <td style={{ padding: '1rem', borderRight: '1px solid #e0e0e0' }}>{user.userId}</td>
                                    <td style={{ padding: '1rem', borderRight: '1px solid #e0e0e0' }}>{user.name?.firstName || ''}</td>
                                    <td style={{ padding: '1rem', borderRight: '1px solid #e0e0e0' }}>{user.name?.lastName || ''}</td>
                                    <td style={{ padding: '1rem', borderRight: '1px solid #e0e0e0' }}>{user.email}</td>
                                    <td style={{ padding: '1rem', borderRight: '1px solid #e0e0e0' }}>{user.userName || 'N/A'}</td>
                                    <td style={{ padding: '1rem' }}>{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default RegisteredUsers;