import {Link} from 'react-router-dom'

function Home(){
    return (
        <div>
            <p> The number one place to book for birthday parties or gaming cons. </p>
            <Link to="/make-booking"> Create Booking </Link>
            <Link to="/games"> View Available Games </Link>
            <Link to="/consoles"> View Available Consoles </Link>
        </div>
    )
}

export default Home;