import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

function Header({ showNavigation }){
    const navigate = useNavigate();
    const currentUser = authService.getAuth();

    const handleLogout = () => {
        authService.logout();
        navigate('/login', { replace: true });
    };

    const goProfile = () => {
        navigate('/profile');
    };

    return (
        <header style={{
            backgroundColor: '#1a1a1a',
            color: '#F6C85F',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid #F6C85F'
        }}>
            <div>
                <h1 style={{ margin: 0, fontSize: '1.5rem' }}>HERI-PLAY</h1>
            </div>
            {currentUser && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem'
                }}>
                    <span style={{ color: '#90EE90' }}>Welcome, <strong>{currentUser?.userName || currentUser?.username || 'User'}</strong>!</span>
                    <button
                        onClick={goProfile}
                        style={{
                            background: 'linear-gradient(90deg,#7a4b15 0%,#c17b2a 100%)',
                            color: '#fff',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.25rem',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: 'bold'
                        }}
                    >
                        Edit Profile
                    </button>
                    <button
                        onClick={handleLogout}
                        style={{
                            background: 'linear-gradient(90deg,#d32f2f 0%,#b71c1c 100%)',
                            color: '#fff',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.25rem',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: 'bold'
                        }}
                    >
                        Logout
                    </button>
                </div>
            )}
        </header>
    )
}

export default Header;