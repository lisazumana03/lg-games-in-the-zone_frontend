import Header from './pages/common/Header'
import Footer from './pages/common/Footer'
import GameList from './pages/products/GameList.jsx'
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import BookingForm from "./pages/reservation/BookingForm.jsx";
import BookingList from "./pages/reservation/BookingList.jsx";
import GameForm from "./pages/admin/products/GameForm.jsx";
import Home from "./Home.jsx";
import BookingHistory from "./pages/reservation/BookingHistory.jsx";
import ConsoleForm from "./pages/admin/products/ConsoleForm.jsx";
import './index.css';
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

function BookingHeader() {
    return (
        <header className="text-white text-center">
            <h1>MAKE YOUR BOOKING</h1>
        </header>
    );
}

function BookingHistoryHeader() {
    return (
        <header className="bg-primary text-white text-center">
            <h1 className="text-2xl font-bold">VIEW YOUR BOOKING HISTORY</h1>
        </header>
    );
}

function GameHeader() {
    return (
        <header className="bg-primary text-white text-center">
            <h1 className="text-2xl font-bold">REGISTER A GAME</h1>
        </header>
    );
}

function ConsoleHeader() {
    return (
        <header className="bg-primary text-white text-center">
            <h1>REGISTER A CONSOLE</h1>
        </header>
    )
}

function GameViewHeader() {
    return (
        <header className="bg-primary text-white text-center">
            <h1>VIEW AVAILABLE GAMES</h1>
        </header>
    );
}

function BookingListHeader() {
    return (
        <header className="bg-primary text-white text-center">
            <h1>VIEW YOUR BOOKINGS</h1>
        </header>
    )
}

function ConsoleListHeader() {
    return (
        <header className="bg-red-600 text-white p-6 flex justify-center items-center">
            <h1> VIEW AVAILABLE CONSOLES </h1>
        </header>
    )
}

function AppContent() {
    const location = useLocation();
    const isBookingPage = location.pathname === "/make-booking";
    const isGamingListPage = location.pathname === "/games";
    const isHomePage = location.pathname === "/";
    const isBookingListPage = location.pathname === "/bookings";
    const isBookingHistoryPage = location.pathname === "/booking-history";
    const isGamePage = location.pathname === "/register-game";
    const isConsoleListPage = location.pathname === "/consoles";
    const isConsolePage = location.pathname === "/register-console";

    return (
        <>
            {isBookingPage ? (
                <BookingHeader />
            ) : isGamingListPage ? (
                <GameViewHeader />
            ) : isBookingListPage ? (
                <BookingListHeader />
            ) : isGamePage ? (
                <GameHeader />
            ) : isBookingHistoryPage ? (
                <BookingHistoryHeader />
            ) : isConsolePage ? (
                <ConsoleHeader />
            ) : isConsoleListPage ? (
                    <ConsoleListHeader />
            ) : (
                <Header showNavigation={isHomePage} />
            )}
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/make-booking" element={<BookingForm />} />
                    <Route path="/bookings" element={<BookingList />} />
                    <Route path="/booking-history" element={<BookingHistory />} />
                    <Route path="/games" element={<GameList />} />
                    <Route path="/register-game" element={<GameForm/>} />
                    <Route path="/register-console" element={<ConsoleForm/>} />
                    <Route path="/admin" element={<AdminDashboard/>}/>
                </Routes>
            </main>
            <Footer />
        </>
    );
}

function App() {
  return (
      <Router>
          <AppContent />
      </Router>
  )
}

export default App;
