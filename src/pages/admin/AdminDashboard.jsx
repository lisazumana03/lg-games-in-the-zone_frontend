import {Link} from "react-router-dom";

function AdminDashboard() {
    return (
        <div className="d-flex flex-row align-items-center justify-content-center text-center vh-100 text-light gap-3">
            <Link to="/register-console" className="btn btn-danger btn-lg fw-bold btn-console">
                Register console
            </Link>
            <Link to="/register-game" className="btn btn-outline-light btn-lg btn-games">
                View Available Games
            </Link>
        </div>
    )
}

export default AdminDashboard;