import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material';
import { api } from './api';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { theme, notionColors } from './theme';

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
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ minHeight: '100vh', backgroundColor: notionColors.background.default, pb: 6 }}>
          <Navbar authenticated={authenticated} onAuthChange={checkAuth} />
          <Box sx={{ maxWidth: '900px', width: '100%', mx: 'auto' }}>
            <Routes>
              <Route path="/" element={<Home authenticated={authenticated} />} />
              <Route path="*" element={<Home authenticated={authenticated} />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
