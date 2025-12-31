import { useEffect, useState } from 'react';
import { axiosInstance } from '../../services/axiosConfig';
import { useNavigate } from 'react-router-dom';

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axiosInstance.get('/api/review'); // Fix endpoint
      setReviews(res.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch reviews');
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await axiosInstance.delete(`/api/reviews/${reviewId}`);
      setReviews(reviews.filter((review) => review.reviewId !== reviewId));
    } catch (err) {
      setError(err.message || 'Failed to delete review');
    }
  };

  return (
    <div>
      <h2>Review List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Review ID</th>
            <th>Rating</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.reviewId}>
              <td>{review.reviewId}</td>
              <td>{review.rating}</td>
              <td>{review.description}</td>
              <td>
                <button onClick={() => deleteReview(review.reviewId)}>Delete</button>
                <button onClick={() => navigate(`/edit-review/${review.reviewId}`)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewList;