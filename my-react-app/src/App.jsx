import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Router>
        <div className="app">
          <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        </div>
      </Router>
    </>
  );
}

function AppContent({ isAuthenticated, setIsAuthenticated }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!isAuthPage && <Sidebar />}
      <div className={`main-content ${isAuthPage ? 'auth-page' : ''}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} /> {/* Default route set to Login */}
          <Route path="/feed" element={isAuthenticated ? <Feed /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;