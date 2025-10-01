import { Link } from 'react-router-dom';

function Home(){
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="glass-neon d-flex flex-column gap-4 align-items-center">
                <Link to="/make-booking" className="btn btn-danger btn-lg fw-bold">
                    Create Booking
                </Link>
                <Link to="/games" className="btn btn-outline-light btn-lg btn-games">
                    View Available Games
                </Link>
                <Link to="/consoles" className="btn btn-outline-light btn-lg btn-consoles">
                    View Available Consoles
                </Link>
            </div>
        </div>
    )
}

export default Home;