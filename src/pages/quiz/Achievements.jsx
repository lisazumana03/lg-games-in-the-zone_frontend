import { Link } from 'react-router-dom';

function Achievements(){
  // Reuse heritage framing used elsewhere
  const containerStyle = {
    minHeight: '100vh',
    backgroundImage: "url('/heritage-orange.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem'
  };
  const overlayStyle = {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(180deg, rgba(44,20,5,0.55), rgba(70,34,8,0.45) 40%, rgba(255,241,224,0.06))',
    pointerEvents: 'none'
  };
  const cardStyle = {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    maxWidth: '1100px',
    borderRadius: '1rem',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
    backdropFilter: 'blur(6px)'
  };

  // sample achievements — replace with real data / API later
  const achievements = [
    { id: 1, title: 'First Quiz Completed', description: 'Completed your first heritage quiz', date: '2025-04-01', points: 50 },
    { id: 2, title: 'Map Explorer', description: 'Visited 5 heritage sites on the map', date: '2025-05-12', points: 120 },
    { id: 3, title: 'Sharer', description: 'Shared a quiz with friends', date: '2025-06-02', points: 30 },
    { id: 4, title: 'Top Scorer', description: 'Scored 90%+ on a quiz', date: '2025-07-20', points: 200 },
    { id: 5, title: 'Curator', description: 'Submitted 3 reviews', date: '2025-08-05', points: 80 }
  ];

  return (
    <div style={containerStyle}>
      <div style={overlayStyle} />
      <div style={cardStyle} className="p-4 p-md-5">
        <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap">
          <div>
            <h1 className="fw-bold" style={{ color: '#F6C85F' }}>Achievements</h1>
            <p className="text-muted mb-0">Your milestones and earned points</p>
          </div>
          <div className="mt-2">
            <Link to="/" className="btn btn-sm btn-link text-muted" style={{ textDecoration: 'none' }}>
              ← Back to Home
            </Link>
          </div>
        </div>

        <div className="row g-3">
          {achievements.map(a => (
            <div key={a.id} className="col-12 col-md-6 col-lg-4">
              <div style={{ borderRadius: 12, padding: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', minHeight: 120 }}>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 style={{ color: '#F6C85F', margin: 0 }}>{a.title}</h5>
                  <span className="text-muted small">{a.date}</span>
                </div>
                <p className="text-muted mb-2" style={{ marginBottom: 8 }}>{a.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-light text-dark">{a.points} pts</span>
                  <small className="text-muted">Unlocked</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="text-center mt-4">
          <small className="text-muted">Earn more achievements by exploring quizzes and maps</small>
        </footer>
      </div>

      <img src="/heritage-corner.svg" alt="" style={{ position: 'absolute', left: 24, bottom: 24, width: 88, opacity: 0.6, zIndex: 2 }} />
    </div>
  );
}

export default Achievements;