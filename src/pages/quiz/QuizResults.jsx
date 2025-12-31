import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageShell from '../../components/PageShell';
import quizService from '../../services/quizService';

export default function QuizResults() {
    const { id } = useParams();
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadResults = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await quizService.getResults(id);
                setResults(data);
            } catch (err) {
                setError(err?.response?.data?.message || 'Failed to load results');
            } finally {
                setLoading(false);
            }
        };
        loadResults();
    }, [id]);

    return (
        <PageShell title="Quiz Results" subtitle="Review your performance">
            {error && <div className="alert error">{error}</div>}
            {loading ? (
                <div>Loading results...</div>
            ) : !results ? (
                <div className="muted">No results available.</div>
            ) : (
                <div className="card">
                    <h3>Score: {results.score} / {results.total}</h3>
                    <p>Percentage: {results.percentage}%</p>
                    <h4>Question Breakdown:</h4>
                    <ul>
                        {results.questions.map((q, index) => (
                            <li key={index}>
                                <strong>Q{index + 1}:</strong> {q.text}
                                <br />
                                Your Answer: {q.userAnswer}
                                <br />
                                Correct Answer: {q.correctAnswer}
                            </li>
                        ))}
                    </ul>
                    <Link to="/quiz" className="btn primary">Back to Quizzes</Link>
                </div>
            )}
        </PageShell>
    );
}