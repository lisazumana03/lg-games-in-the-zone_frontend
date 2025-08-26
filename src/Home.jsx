import {Link} from 'react-router-dom'

function Home(){
    return (
        <div className="d-flex flex-row align-items-center justify-content-center text-center vh-100 text-light gap-3">
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
    )
}

export default Home;