import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageShell from '../../components/PageShell';
import quizService from '../../services/quizService';

function normalizeOptions(options) {
  if (!Array.isArray(options)) return [];
  // Accept string[], or object[] with {text} or {label}, and may include {isCorrect|correct}
  return options.map((opt) => {
    if (typeof opt === 'string') {
      return { text: opt };
    }
    if (opt && typeof opt === 'object') {
      return {
        text: opt.text || opt.label || '',
        isCorrect: Boolean(opt.isCorrect || opt.correct)
      };
    }
    return { text: String(opt) };
  });
}

function deriveCorrectIndex(q) {
  // Prefer explicit correctAnswerIndex if provided
  if (typeof q.correctAnswerIndex === 'number') return q.correctAnswerIndex;
  // Else inspect options for a correct flag
  const idx = (q._normOptions || []).findIndex((o) => o.isCorrect);
  return idx >= 0 ? idx : null;
}

export default function QuizAttempt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({}); // { [qIndex]: optionIndex }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await quizService.getById(id);
        // Normalize questions/options for rendering
        const questions = Array.isArray(data?.questions) ? data.questions.map((q) => {
          const _normOptions = normalizeOptions(q.options || q.choices || []);
          return { ...q, _normOptions };
        }) : [];
        setQuiz({ ...data, questions });
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const score = useMemo(() => {
    if (!submitted || !quiz?.questions?.length) return null;
    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      const ansIdx = answers[idx];
      if (typeof ansIdx !== 'number') return;
      const correctIndex = deriveCorrectIndex(q);
      if (typeof correctIndex === 'number' && ansIdx === correctIndex) correct += 1;
    });
    const total = quiz.questions.length;
    const percent = total ? Math.round((correct / total) * 100) : 0;
    return { correct, total, percent };
  }, [submitted, quiz, answers]);

  const onSelect = (qIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Optionally, POST attempt to backend here
  };

  return (
    <PageShell
      title={quiz?.title || 'Quiz Attempt'}
      subtitle={quiz?.description || 'Answer all questions and submit your attempt.'}
      maxWidth="900px"
    >
      {error && <div className="alert error">{error}</div>}
      {loading ? (
        <div>Loading quiz...</div>
      ) : !quiz ? (
        <div className="muted">Quiz not found.</div>
      ) : (
        <form onSubmit={onSubmit} className="card">
          {(quiz.questions || []).map((q, qIndex) => (
            <div key={q.id || qIndex} className="question">
              <div className="question-title"><strong>Q{qIndex + 1}.</strong> {q.text || q.questionText || q.title || 'Question'}</div>
              <div className="options" style={{ display: 'grid', gap: 8, marginTop: 8 }}>
                {(q._normOptions || []).map((opt, oIndex) => {
                  const checked = answers[qIndex] === oIndex;
                  return (
                    <label key={oIndex} className={`option ${checked ? 'selected' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input
                        type="radio"
                        name={`q-${qIndex}`}
                        checked={checked}
                        onChange={() => onSelect(qIndex, oIndex)}
                      />
                      <span>{opt.text || `Option ${oIndex + 1}`}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="actions" style={{ marginTop: 16 }}>
            <button className="btn primary" type="submit">Submit</button>
            <button className="btn" type="button" onClick={() => navigate('/quiz')}>Back</button>
          </div>

          {submitted && score && (
            <div className="result" style={{ marginTop: 16 }}>
              <h3>Your Result</h3>
              <p>
                Score: <strong>{score.correct}</strong> / {score.total} ({score.percent}%)
              </p>
            </div>
          )}
        </form>
      )}
    </PageShell>
  );
}
