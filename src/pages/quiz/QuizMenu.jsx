import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../../components/PageShell';
import quizService from '../../services/quizService';
import { getAllSubjects } from '../../services/subjectService';

function QuizMenu() {
    const [quizzes, setQuizzes] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [minQuestions, setMinQuestions] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('QuizMenu component mounted'); // Debugging log
        let isMounted = true; // Track if the component is still mounted
        const load = async () => {
            setLoading(true);
            setError('');
            try {
                const [quizData, subjectData] = await Promise.all([
                    quizService.getAll(),
                    getAllSubjects()
                ]);
                if (isMounted) {
                    console.log('Quizzes loaded:', quizData); // Debugging log
                    console.log('Subjects loaded:', subjectData); // Debugging log
                    setQuizzes(Array.isArray(quizData) ? quizData : []);
                    setSubjects(Array.isArray(subjectData) ? subjectData : []);
                }
            } catch (err) {
                if (isMounted) {
                    console.error('Error loading quizzes or subjects:', err); // Debugging log
                    setError(err?.response?.data?.message || 'Failed to load quizzes or subjects');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        load();
        return () => {
            isMounted = false; // Cleanup on unmount
        };
    }, []);

    const filteredQuizzes = quizzes.filter((quiz) => {
        const matchesSubject = selectedSubject ? quiz.subject?.subjectId === parseInt(selectedSubject) : true;
        const matchesQuestions = minQuestions ? (quiz.questions?.length || 0) >= parseInt(minQuestions) : true;
        return matchesSubject && matchesQuestions;
    });

    const handleEditQuiz = (quiz) => {
        // Navigate to edit page or open modal for editing
        console.log('Edit quiz:', quiz);
    };

    const handleDeleteQuiz = async (quizId) => {
        if (window.confirm('Are you sure you want to delete this quiz?')) {
            try {
                await quizService.delete(quizId);
                setQuizzes((prev) => prev.filter((q) => q.id !== quizId));
            } catch (err) {
                alert('Failed to delete quiz');
            }
        }
    };

    return (
        <PageShell title="Quizzes" subtitle="Pick a quiz and test your skills!" maxWidth="1000px">
            {error && <div className="alert error">{error}</div>}
            <div className="filters" style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
                <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="form-control"
                >
                    <option value="">All Subjects</option>
                    {subjects.map((subject) => (
                        <option key={subject.subjectId} value={subject.subjectId}>
                            {subject.subjectName}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Min Questions"
                    value={minQuestions}
                    onChange={(e) => setMinQuestions(e.target.value)}
                    className="form-control"
                />
            </div>
            {loading ? (
                <div>Loading quizzes...</div>
            ) : (
                <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                    {filteredQuizzes.length === 0 && <div className="muted">No quizzes available yet.</div>}
                    {filteredQuizzes.map((q) => (
                        <div key={q.id || q.quizId || q.title} className="card">
                            <h3 style={{ marginBottom: 8 }}>{q.title || 'Untitled Quiz'}</h3>
                            {q.description && <p className="muted" style={{ minHeight: 40 }}>{q.description}</p>}
                            <div className="pill-row" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '8px 0' }}>
                                {q.category && <span className="pill">{q.category}</span>}
                                {q.subject && <span className="pill">{q.subject.subjectName}</span>}
                                {q.timeLimit ? <span className="pill">{q.timeLimit} min</span> : null}
                                <span className="pill">{q.questions?.length || 0} Questions</span>
                            </div>
                            <div className="actions">
                                <Link className="btn primary" to={`/quiz/${q.id || q.quizId}`}>Attempt</Link>
                                <button className="btn secondary" onClick={() => handleEditQuiz(q)}>Edit</button>
                                <button className="btn danger" onClick={() => handleDeleteQuiz(q.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </PageShell>
    );
}

export default QuizMenu;