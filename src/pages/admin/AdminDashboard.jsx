import {Link} from "react-router-dom";
import './index.css';

function AdminDashboard() {
    return (
        <div>
            <Link to="/register-console" className="btn btn-danger btn-lg fw-bold">
                Register console
            </Link>
            <Link to="/register-game" className="btn btn-outline-light btn-lg">
                View Available Games
            </Link>
        </div>
    )
}

export default AdminDashboard;