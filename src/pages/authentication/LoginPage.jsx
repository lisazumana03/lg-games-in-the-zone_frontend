import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageShell from '../../components/PageShell';
import authService from '../../services/authService';

function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const body = {
                email: username, // Use the username field to input email
                password,
            };

            await authService.login(body);
            navigate('/home');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return(
        <PageShell
          title="Welcome Back"
          subtitle="Sign in to continue"
          maxWidth="520px"
          footer={<div className="text-center mt-3">Not registered? <Link to="/register">Create an account</Link></div>}
        >
            <form onSubmit={handleSubmit} className="m-0 p-0">
                <div className="m-1 p-1">
                    <label> Username or Email </label>
                    <input 
                      type="text" 
                      name="username" 
                      placeholder="Enter your username or email" 
                      required 
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      className="form-control mb-2"
                    />
                    <label> Password </label>
                    <input 
                      type="password" 
                      name="password" 
                      placeholder="Enter your password" 
                      required 
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="form-control mb-2"
                    />
                    {error && <div className="alert alert-danger" style={{ marginTop: '0.5rem' }}>{error}</div>}
                    <div className="d-flex justify-content-center mt-3">
                      <button type="submit" className="btn hero-button w-100" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                      </button>
                    </div>
                </div>
            </form>
        </PageShell>
    )
}

export default LoginPage;