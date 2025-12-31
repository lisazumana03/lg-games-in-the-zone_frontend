import { Link } from "react-router-dom";
import PageShell from "../../components/PageShell";

function AdminDashboard() {
    return (
        <PageShell
          title="Admin Dashboard"
          subtitle="Manage users, subjects, and content"
          maxWidth="820px"
        >
          <div className="d-flex flex-row align-items-center justify-content-center gap-3 flex-wrap">
              <Link to="/users" className="btn btn-danger btn-lg fw-bold">
                  View Registered Users
              </Link>
              <Link to="/subject-form" className="btn hero-button btn-lg fw-bold">
                  Create Subject
              </Link>
              <Link to="/content-management" className="btn ghost-button btn-lg fw-bold">
                  Content Management
              </Link>
              <Link to="/create-quiz" className="btn hero-button btn-lg fw-bold">
              Create Quiz
              </Link>
          </div>
          <nav className="d-flex flex-column gap-3">
            <Link
              to="/users"
              className="btn btn-lg d-flex align-items-center justify-content-center"
              style={{ background: '#f2c94c', color: '#0b1a3c' }}
            >
              Manage Users
            </Link>

            <Link
              to="/review-list"
              className="btn btn-lg d-flex align-items-center justify-content-center"
              style={{ background: '#4caf50', color: 'white' }}
            >
              Manage Reviews
            </Link>
          </nav>
        </PageShell>
    )
}

export default AdminDashboard;