import { useState } from 'react';

function QuestionForm({ onSave, question = {} }) {
    const [type, setType] = useState(question.type || '');
    const [marks, setMarks] = useState(question.marks || '');
    const [text, setText] = useState(question.text || '');

    const handleSave = () => {
        if (!text.trim()) {
            alert('Question text cannot be empty.');
            return;
        }
        if (marks <= 0 || marks > 250) {
            alert('Marks must be between 1 and 250.');
            return;
        }
        onSave({ type, marks, text });
        setType('');
        setMarks('');
        setText('');
    };

    return (
        <div>
            <label>Question Type:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="MCQ">Multiple Choice</option>
                <option value="Short Answer">Short Answer</option>
                <option value="Essay">Essay</option>
            </select>

            <label>Marks (Max 250):</label>
            <input
                type="number"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                max="250"
            />

            <label>Question Text:</label>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button onClick={handleSave}>Save Question</button>
        </div>
    );
}

export default QuestionForm;