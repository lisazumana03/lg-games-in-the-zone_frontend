import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageShell from './components/PageShell';
import authService from './services/authService';

function Home() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = authService.getAuth();
    if (!auth) {
      navigate('/login', { replace: true });
    } else if (auth?.role?.toUpperCase() === 'ADMIN') {
      navigate('/admin', { replace: true });
    } else {
      setCurrentUser(auth);
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login', { replace: true });
  };

  if (!currentUser) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  return (
    <PageShell
      title="HeriPlay"
      subtitle={`Welcome, ${currentUser.userName || currentUser.email}!`}
      maxWidth="760px"
      footer={<footer className="text-center mt-4"><small className="text-muted">Inspired by FIFA energy • Quizzes • Maps</small></footer>}
    >
      <nav className="d-flex flex-column gap-3">
        {currentUser?.role?.toUpperCase() === 'ADMIN' && (
          <Link
            to="/create-quiz"
            className="btn hero-button btn-lg d-flex align-items-center justify-content-center"
          >
            Create Quiz
          </Link>
        )}

        <Link
          to="/quiz"
          className="btn ghost-button btn-lg d-flex align-items-center justify-content-center"
        >
          Take Quiz
        </Link>

        <Link
          to="/achievements"
          className="btn btn-lg d-flex align-items-center justify-content-center"
          style={{ background: 'linear-gradient(120deg, #f2c94c, #f7d96f)', color: '#0b1a3c' }}
        >
          View Achievements
        </Link>

        <Link
          to="/create-review"
          className="btn btn-lg d-flex align-items-center justify-content-center"
          style={{ background: '#4caf50', color: 'white' }}
        >
          Submit a Review
        </Link>

        <Link to="/about" className="text-center text-muted mt-2">
          About HeriPlay
        </Link>
      </nav>

      <div className="text-center mt-4">
        <button
          onClick={handleLogout}
          className="btn btn-danger btn-lg w-100"
        >
          Logout
        </button>
      </div>
    </PageShell>
  );
}

export default Home;