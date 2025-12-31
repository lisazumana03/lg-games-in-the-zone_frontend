import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createSubject, getSubjectById, updateSubject } from '../../services/subjectService';

export default function SubjectForm() {
    const [subjectName, setSubjectName] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

    const { id } = useParams();

    useEffect(() => {
      let mounted = true;
      const load = async () => {
        if (id) {
          try {
            const data = await getSubjectById(id);
            if (!mounted) return;
            setSubjectName(data.subjectName || '');
            setSubjectCode(data.subjectCode || '');
            setDescription(data.description || '');
          } catch (err) {
            setError(err.message || 'Failed to load subject');
          }
        }
      };
      load();
      return () => { mounted = false; };
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
    try {
            if (id) {
              await updateSubject(id, { subjectName, subjectCode, description });
            } else {
              await createSubject({ subjectName, subjectCode, description });
            }
            // Redirect to subjects list after successful creation/update
            navigate('/subject-list');
    } catch (err) {
      // err may be an Error with a message (possibly JSON); show a friendly string
      const msg = err?.message ? String(err.message) : 'Failed to create subject';
      setError(msg);
    } finally {
      setLoading(false);
    }
    };

    return (
        <div style={containerStyle}>
          <div style={overlayStyle} />
          <div style={cardStyle} className="p-4 p-md-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold" style={{ color: '#F6C85F' }}>{id ? 'Edit Subject' : 'Add New Subject'}</h2>
              <p className="text-muted mb-0">Create a subject for quizzes</p>
            </div>

            <form onSubmit={handleSubmit} className="m-0 p-0">
                <div className="m-3 p-3">
                    <label> Subject Name: </label>
                    <input 
                      type="text" 
                      name="subjectName" 
                      placeholder="Enter subject name" 
                      required 
                      value={subjectName}
                      onChange={e => setSubjectName(e.target.value)}
                      className="form-control mb-2"
                    />
                    <label> Subject Code: </label>
                    <input 
                      type="text" 
                      name="subjectCode" 
                      placeholder="Enter subject code" 
                      required 
                      value={subjectCode}
                      onChange={e => setSubjectCode(e.target.value)}
                      className="form-control mb-2"
                    />
                    <label> Description: </label>
                    <textarea 
                      name="description" 
                      placeholder="Enter subject description" 
                      required 
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      className="form-control mb-2"
                      rows="3"
                    />
                    {error && <div style={{color:'red', margin:'8px 0'}}>{error}</div>}
                    <div className="d-flex justify-content-center mt-3">
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? (id ? 'Saving...' : 'Adding Subject...') : (id ? 'Save Changes' : 'Add Subject')}
                      </button>
                    </div>
                </div>
            </form>

            <div className="text-center mt-2">
              <Link to="/" className="btn btn-link text-muted" style={{ textDecoration: 'none' }}>
                ← Back to Home
              </Link>
            </div>
          </div>

          <img src="/heritage-corner.svg" alt="" style={{ position: 'absolute', left: 24, bottom: 24, width: 88, opacity: 0.6, zIndex: 2 }} />
        </div>
    )
}