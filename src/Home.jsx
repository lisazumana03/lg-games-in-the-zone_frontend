import {Link} from 'react-router-dom'
import './index.css'


function Home(){
    return (
        <div className="d-flex flex-column align-items-center justify-content-center text-center vh-100 bg-dark text-light"
             style={{
                 backgroundImage: "url('/images/netflix-bg.jpg')", // replace with your bg image
                 backgroundSize: "cover",
                 backgroundPosition: "center",
                 backgroundRepeat: "no-repeat",
                 backgroundColor: "rgba(157, 0, 255, 0.5)",
                 backgroundBlendMode: "overlay"
             }}
        >
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