import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import reviewService from '../../services/reviewService';

function ReviewForm(){
    // Heritage frame styles (matching Home/RegisterPage)
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
      maxWidth: '720px',
      borderRadius: '1rem',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
      backdropFilter: 'blur(6px)'
    };

    const primaryBtnStyle = {
      background: 'linear-gradient(90deg,#7a4b15 0%,#c17b2a 100%)',
      borderColor: 'rgba(0,0,0,0.15)',
      color: '#fff',
      boxShadow: '0 8px 30px rgba(193,123,42,0.18)'
    };

    const navigate = useNavigate();
    const [form, setForm] = useState({ rating: '', comments: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
      const auth = authService.getAuth();
      if (!auth) {
        navigate('/login', { replace: true });
        return;
      }
    }, [navigate]);

    const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitting(true);
      try {
        const auth = authService.getAuth();
        const payload = {
          rating: Number(form.rating),
          comments: form.comments,
          userId: auth?.id || auth?.userId
        };
        await reviewService.submitReview(payload);
        navigate('/achievements');
      } catch (err) {
        console.error('Submit review failed:', err);
        alert(err?.message || 'Failed to submit review');
      } finally {
        setSubmitting(false);
      }
    };

    return(
      <div style={containerStyle}>
        <div style={overlayStyle} />
        <div style={cardStyle} className="p-4 p-md-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold" style={{ color: '#F6C85F' }}>Submit Your Review</h2>
            <p className="text-muted mb-0">Tell us about your experience with HeriPlay</p>
          </div>

          <form onSubmit={handleSubmit} className="m-0 p-0">
            <div className="m-3 p-3">
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <select name="rating" value={form.rating} onChange={handleChange} className="form-select" required>
                  <option value="">Select a rating</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Comments</label>
                <textarea name="comments" value={form.comments} onChange={handleChange} rows="4" className="form-control" placeholder="Share your thoughts..." required />
              </div>

              <div className="d-flex justify-content-center mt-3">
                <button type="submit" className="btn btn-lg d-flex align-items-center justify-content-center" style={primaryBtnStyle} disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </div>
          </form>

          <footer className="text-center mt-3">
            <small className="text-muted">Thank you — your feedback helps us preserve heritage experiences</small>
          </footer>

          {/* Back to home */}
          <div className="text-center mt-2">
            <Link to="/" className="text-muted" style={{ textDecoration: 'none' }}>
              ← Back to Home
            </Link>
          </div>
        </div>

        <img src="/heritage-corner.svg" alt="" style={{ position: 'absolute', left: 24, bottom: 24, width: 88, opacity: 0.6, zIndex: 2 }} />
      </div>
    );
}

export default ReviewForm;