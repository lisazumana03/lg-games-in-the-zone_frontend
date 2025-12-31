import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteSubject, getAllSubjects } from '../../services/subjectService';
import { commonStyles } from '../../styles/componentStyles';

export default function SubjectList() {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await getAllSubjects();

            // Validate response format
            if (!Array.isArray(data)) {
                throw new Error('Unexpected response format: Expected an array of subjects');
            }

            setSubjects(data);
        } catch (err) {
            console.error('Error fetching subjects:', err);
            setError(err.message || 'Failed to fetch subjects');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (subjectId) => {
        if (window.confirm('Are you sure you want to delete this subject?')) {
            try {
                await deleteSubject(subjectId);
                setSubjects(subjects.filter(s => s.subjectId !== subjectId));
            } catch (err) {
                setError(err.message || 'Failed to delete subject');
            }
        }
    };

    return (
        <div style={commonStyles.pageContainer}>
            <div style={commonStyles.container}>
                {/* Page Header */}
                <div style={commonStyles.flexBetween}>
                    <h1 className="mb-3">Subjects</h1>
                    <Link to="/subject-form" className="btn btn-primary">
                        + Add Subject
                    </Link>
                </div>

                {/* Error Alert */}
                {error && <div style={commonStyles.alertError}>{error}</div>}

                {/* Loading State */}
                {loading ? (
                    <div style={commonStyles.loading}>Loading subjects...</div>
                ) : subjects.length === 0 ? (
                    /* Empty State */
                    <div style={commonStyles.card}>
                        <p style={commonStyles.textCenter}>
                            No subjects found. <Link to="/subject-form">Create one</Link>
                        </p>
                    </div>
                ) : (
                    /* Table */
                    <div style={commonStyles.tableContainer} className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th>Description</th>
                                    <th style={{ textAlign: 'center' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjects.map((subject, index) => {
                                    try {
                                        const subjectId = subject.subjectId || `subject-${index}`;
                                        const subjectName = subject.subjectName || 'Untitled Subject';
                                        const subjectCode = subject.subjectCode || 'N/A';
                                        const description = subject.description || 'No description available';

                                        return (
                                            <tr key={subjectId}>
                                                <td>{subjectId}</td>
                                                <td>{subjectName}</td>
                                                <td>{subjectCode}</td>
                                                <td>{description}</td>
                                                <td style={commonStyles.tableCell}>
                                                    <div className="actions">
                                                        <Link 
                                                            to={`/subjects/${subjectId}`} 
                                                            className="btn btn-sm btn-primary"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button 
                                                            onClick={() => handleDelete(subjectId)}
                                                            className="btn btn-sm btn-danger"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    } catch (error) {
                                        console.error('Error rendering subject:', error);
                                        return (
                                            <tr key={`error-${index}`}>
                                                <td colSpan="5" className="text-danger">Error displaying subject data</td>
                                            </tr>
                                        );
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}