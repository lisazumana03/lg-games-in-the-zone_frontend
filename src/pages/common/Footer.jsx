function Footer(){
    return(
        // inline styles to ensure footer stays white across pages without altering global theme
        <footer style={{ backgroundColor: '#ffffff', color: '#333333', padding: '1.5rem', textAlign: 'center', marginTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>&copy; {new Date().getFullYear()} Isihlaganiso Academy. All rights reserved.</p>
        </footer>
    );
}

export default Footer;