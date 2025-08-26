import './index.css';

function Footer(){
    return(
        <footer className="bg-primary text-white text-center">
            <p>&copy; {new Date().getFullYear()} LG's Games In-The-Zone. All rights reserved.</p>
        </footer>
    );
}

export default Footer;