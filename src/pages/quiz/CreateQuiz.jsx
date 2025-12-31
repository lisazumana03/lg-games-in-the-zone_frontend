import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../../components/PageShell';
import authService from '../../services/authService';
import questionService from '../../services/questionService';
import quizService from '../../services/quizService';
import { getAllSubjects } from '../../services/subjectService';
import QuestionForm from './QuestionForm';

export default function CreateQuiz() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [timeLimit, setTimeLimit] = useState('');
    const [subject, setSubject] = useState('');
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [questions, setQuestions] = useState([]);
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

    useEffect(() => {
        const auth = authService.getAuth();
        const role = auth?.role || auth?.user?.role;
        if (!role || String(role).toUpperCase() !== 'ADMIN') {
            setError('Only administrators can create quizzes.');
        }
    }, []);

    useEffect(() => {
        setSubjects([
            { subjectId: 1, subjectName: 'Mathematics' },
            { subjectId: 2, subjectName: 'Science' },
        ]);
    }, []);

    const handleAddQuestion = (question) => {
        setQuestions((prev) => [...prev, question]);
    };
ts:', err); // Log detailed error
    const handleSubmit = async (e) => {   setError(err.response?.data?.message || 'Failed to load subjects. Please try again later.');
        e.preventDefault();   }
        setError('');  }
        setSaving(true);
        try {;
            const payload = {
                title,  isMounted = false; // Cleanup on unmount
                category,
                description,    }, []);
                timeLimit: timeLimit ? Number(timeLimit) : null,
                subject,
            };  setQuestions((prev) => [...prev, question]);
            const quiz = await quizService.create(payload);    };

            // Add questions to the quizync (e) => {
            for (const question of questions) {ult();
                await questionService.addQuestion(quiz.id, question);
            }ving(true);

            navigate('/quiz');oad = {
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to create quiz');
        } finally {
            setSaving(false);t: timeLimit ? Number(timeLimit) : null,
        }  subject,
    };
            const quiz = await quizService.create(payload);
    return (
        <PageShell>
            <div style={containerStyle}>
                <div style={overlayStyle} />   await questionService.addQuestion(quiz.id, question);
                <div style={cardStyle} className="p-4 p-md-5">            }
                    <div className="text-center mb-4">
                        <h2 className="fw-bold" style={{ color: '#F6C85F' }}>Create Quiz</h2>quiz');
                        <p className="text-muted mb-0">Design a new challenge for learners</p>
                    </div>r(err?.response?.data?.message || 'Failed to create quiz');

                    <form onSubmit={handleSubmit} className="m-0 p-0">   setSaving(false);
                        <div className="m-3 p-3">  }
                            <label> Title: </label>    };
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter quiz title"
                                required
                                value={title}p-md-5">
                                onChange={(e) => setTitle(e.target.value)}
                                className="form-control mb-2"
                            /> className="text-muted mb-0">Design a new challenge for learners</p>
                            <label> Category: </label>                    </div>
                            <input
                                type="text" className="m-0 p-0">
                                name="category"
                                placeholder="Enter quiz category"> Title: </label>
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="form-control mb-2"
                            />der="Enter quiz title"
                            <label> Description: </label>
                            <textarea
                                name="description"arget.value)}
                                placeholder="Enter quiz description"  className="form-control mb-2"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}> Category: </label>
                                className="form-control mb-2"
                                rows="3"
                            />
                            <label> Time Limit (minutes): </label>er quiz category"
                            <input
                                type="number"e.target.value)}
                                name="timeLimit"  className="form-control mb-2"
                                placeholder="Enter time limit"
                                min="0"escription: </label>
                                value={timeLimit}
                                onChange={(e) => setTimeLimit(e.target.value)}
                                className="form-control mb-2"quiz description"
                            />
                            <label> Subject: </label>on(e.target.value)}
                            <selecte="form-control mb-2"
                                name="subject"  rows="3"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}> Time Limit (minutes): </label>
                                className="form-control mb-2"
                                required
                            >
                                <option value="">Select a Subject</option>lder="Enter time limit"
                                {subjects.map((subj) => (
                                    <option key={subj.subjectId} value={subj.subjectId}>
                                        {subj.subjectName}(e.target.value)}
                                    </option>  className="form-control mb-2"
                                ))}
                            </select> Subject: </label>
                            <h4>Questions</h4>
                            {questions.map((q, index) => (
                                <div key={index} className="mb-2">
                                    <strong>Q{index + 1}:</strong> {q.text} ({q.marks} marks).target.value)}
                                </div>e="form-control mb-2"
                            ))}   required
                            <QuestionForm onSave={handleAddQuestion} />
                            {error && <div style={{ color: 'red', margin: '8px 0' }}>{error}</div>} Subject</option>
                            <div className="d-flex justify-content-center mt-3">
                                <button type="submit" className="btn btn-primary" disabled={saving}>ectId} value={subj.subjectId}>
                                    {saving ? 'Creating...' : 'Create Quiz'}.subjectName}
                                </button> </option>
                            </div>
                        </div>
                    </form>

                    <div className="text-center mt-2">
                        <button className="btn btn-link text-muted" style={{ textDecoration: 'none' }} onClick={() => navigate(-1)}>trong>Q{index + 1}:</strong> {q.text} ({q.marks} marks)
                            ← Back to Previous Page </div>
                        </button>
                    </div>
                </div>' }}>{error}</div>}
            </div>
        </PageShell>mary" disabled={saving}>
    );ng ? 'Creating...' : 'Create Quiz'}
}}