import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageShell from '../../components/PageShell';
import authService from '../../services/authService';

function RegisterPage() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('USER');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const body = {
                name: name.trim() || null, // Send null if name is empty
                username: username.trim() || null, // Send null if username is empty
                email,
                password,
                role,
            };

            await authService.register(body);

            // If the user registered as an admin, auto-login and redirect to admin dashboard
            if ((role || 'USER').toUpperCase() === 'ADMIN') {
                try {
                    await authService.login({ username, password });
                    navigate('/admin', { replace: true });
                    return;
                } catch (loginErr) {
                    console.warn('Auto-login after registration failed', loginErr);
                    navigate('/login');
                    return;
                }
            }
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrength = (pw) => {
      let score = 0;
      if (pw.length >= 8) score++;
      if (/[A-Z]/.test(pw)) score++;
      if (/[a-z]/.test(pw)) score++;
      if (/[0-9]/.test(pw)) score++;
      if (/[^A-Za-z0-9]/.test(pw)) score++;
      const percent = Math.min(100, score * 20);
      const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'];
      const colors = ['#b71c1c', '#d32f2f', '#f57c00', '#c17b2a', '#7a4b15', '#237804'];
      return { percent, label: labels[score] || 'Too weak', color: colors[score] || '#b71c1c' };
    };
    const strength = getPasswordStrength(password);

    return(
        <PageShell
          title="Create Account"
          subtitle="Join HeriPlay"
          maxWidth="640px"
          footer={
            <div className="text-center mt-3">
              <div>Already have an account? <Link to="/login">Login here</Link></div>
              <div className="mt-2"><Link to="/" className="text-muted">← Back to Home</Link></div>
            </div>
          }
        >
            <form onSubmit={handleSubmit} className="m-0 p-0">
                <div className="m-1 p-1">
                    <label> Name (optionally surname) </label>
                    <input type="text" name="name" placeholder="Enter your name" value={name} onChange={e=>setName(e.target.value)} className="form-control mb-2" />
                    <label> Username </label>
                    <input type="text" name="username" placeholder="Enter your username" value={username} onChange={e=>setUsername(e.target.value)} className="form-control mb-2" />
                    <label> Email </label>
                    <input type="email" name="email" placeholder="Enter your email" required value={email} onChange={e=>setEmail(e.target.value)} className="form-control mb-2" />
                    <label> Enter Password </label>
                    <input type="password" name="password" placeholder="Enter your password" required value={password} onChange={e=>setPassword(e.target.value)} className="form-control mb-1" />
                    <div className="mt-1" style={{ marginBottom: '0.75rem' }}>
                      <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${strength.percent}%`, height: '8px', background: strength.color }} />
                      </div>
                      <small style={{ color: strength.color }}>Password strength: {strength.label}</small>
                    </div>
                    <label> Confirm Password </label>
                    <input type="password" name="confirmPassword" placeholder="Confirm your password" required value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className="form-control mb-2" />
                    <label> Role </label>
                    <select name="role" value={role} onChange={e=>setRole(e.target.value)} className="form-control mb-2">
                      <option value="USER">User</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                    {error && <div className="alert alert-danger" style={{marginTop:'0.5rem'}}>{error}</div>}
                    <div className="d-flex justify-content-center mt-3">
                      <button type="submit" className="btn hero-button w-100" disabled={loading}> {loading ? 'Registering...' : 'Register'} </button>
                    </div>
                </div>
            </form>
        </PageShell>
    )
}

export default RegisterPage;