import {Link} from 'react-router-dom'
import './index.css';


function Home(){
    return (
        <div className="d-flex flex-column align-items-center justify-content-center text-center vh-100 bg-dark text-light">
            <Link to="/make-booking" className="btn btn-danger btn-lg fw-bold">
                Create Booking
            </Link>
            <Link to="/games" className="btn btn-outline-light btn-lg">
                View Available Games
            </Link>
            <Link to="/consoles" className="btn btn-outline-light btn-lg">
                View Available Consoles
            </Link>
        </div>
    )
}

export default Home;