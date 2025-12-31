import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import About from "./About.jsx";
import ProtectedRoute from './components/PrivateRoute';
import Contact from "./Contact.jsx";
import Home from "./Home.jsx";
import './index.css';
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import RegisteredUsers from "./pages/admin/authentication/RegisteredUsers.jsx";
import LoginPage from "./pages/authentication/LoginPage.jsx";
import RegisterPage from './pages/authentication/RegisterPage.jsx';
import UserProfile from "./pages/authentication/UserProfile.jsx";
import Footer from './pages/common/Footer';
import Header from './pages/common/Header';
import ReviewForm from "./pages/feedback/ReviewForm.jsx";
import ReviewList from "./pages/feedback/ReviewList.jsx";
import Achievements from "./pages/quiz/Achievements.jsx";
import CreateQuiz from "./pages/quiz/CreateQuiz.jsx";
import QuizAttempt from "./pages/quiz/QuizAttempt.jsx";
import QuizMenu from "./pages/quiz/QuizMenu.jsx";
import QuizResults from "./pages/quiz/QuizResults.jsx";
import SubjectForm from "./pages/quiz/SubjectForm.jsx";
import SubjectList from "./pages/quiz/SubjectList.jsx";
import authService from './services/authService';

function RegisterHeader() {
    return (
        <header className="text-white text-center">
            <h1 className="text-2xl font-bold">REGISTER AN ACCOUNT</h1>
        </header>
    );
}

function LoginHeader() {
    return (
        <header className="text-white text-center">
            <h1 className="text-2xl font-bold">USER LOGIN</h1>
        </header>
    );
}

function AdminDashboardHeader() {
    return (
        <header className="text-white text-center">
            <h1 className="text-2xl font-bold">ADMIN DASHBOARD</h1>
        </header>
    );
}

function AppContent() {
    const location = useLocation();
    const userRole = authService.getUserRole();

    // Redirect based on role
    if (userRole === "ADMIN" && location.pathname === "/") {
        return <Navigate to="/admin" replace />;
    } else if (userRole === "USER" && location.pathname === "/admin") {
        return <Navigate to="/" replace />;
    }

    const isHomePage = location.pathname === "/" || location.pathname === "/home";
    const isAdminPage = location.pathname === "/admin";
    const isLoginPage = location.pathname === "/login";
    const isRegisterPage = location.pathname === "/register";
    const isAuthPage = isLoginPage || isRegisterPage;

    return (
        <>
            {isLoginPage ? (
                <LoginHeader />
            ) : isRegisterPage ? (
                <RegisterHeader />
            ) : isAdminPage ? (
                <AdminDashboardHeader />
            ) : !isAuthPage ? (
                <Header showNavigation={isHomePage} />
            ) : null}
            <main>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
                    <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                    <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
                    <Route path="/users" element={<ProtectedRoute><RegisteredUsers /></ProtectedRoute>} />
                    <Route path="/create-review" element={<ProtectedRoute><ReviewForm /></ProtectedRoute>} />
                    <Route path="/review-list" element={<ProtectedRoute><ReviewList /></ProtectedRoute>} />
                    <Route path="/quiz" element={<ProtectedRoute><QuizMenu /></ProtectedRoute>} />
                    <Route path="/quiz/:id" element={<ProtectedRoute><QuizAttempt /></ProtectedRoute>} />
                    <Route path="/create-quiz" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
                    <Route path="/quiz-results/:id" element={<ProtectedRoute><QuizResults /></ProtectedRoute>} />
                    <Route path="/subject-form" element={<ProtectedRoute><SubjectForm /></ProtectedRoute>} />
                    <Route path="/subject-form/:id" element={<ProtectedRoute><SubjectForm /></ProtectedRoute>} />
                    <Route path="/subject-list" element={<ProtectedRoute><SubjectList /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                    <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to={authService.isAuthenticated() ? "/" : "/login"} replace />} />
                </Routes>
            </main>
            {!isAuthPage && <Footer />}
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
