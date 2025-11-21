import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { api } from './api';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FetchEmails from './pages/FetchEmails';
import EmailResults from './pages/EmailResults';
import AllResults from './pages/AllResults';
import NoEmailsFound from './pages/NoEmailsFound';
import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  const checkAuth = useCallback(async () => {
    const isAuth = await api.checkAuth();
    setAuthenticated(isAuth);
  }, []);

  // Initialize auth state on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const isAuth = await api.checkAuth();
      if (!cancelled) {
        setAuthenticated(isAuth);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (authenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="notion-page">
        <Navbar authenticated={authenticated} onAuthChange={checkAuth} />
        <main className="notion-container notion-main">
          <Routes>
            <Route path="/" element={<Home authenticated={authenticated} />} />
            <Route 
              path="/fetch-emails" 
              element={
                authenticated ? (
                  <FetchEmails />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/email-results" 
              element={
                authenticated ? (
                  <EmailResults />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/view-all-results" 
              element={
                authenticated ? (
                  <AllResults />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/no-emails-found" 
              element={
                authenticated ? (
                  <NoEmailsFound />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
