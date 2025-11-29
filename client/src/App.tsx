import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material';
import { useAuth } from './hooks';
import { setToken } from './apis/base';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Converter from './pages/Converter';
import Settings from './pages/Settings';
import { theme } from './theme';

function AppContent() {
  const { authenticated, loading, checkAuth } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Extract token from URL query param after OAuth redirect
    const token = searchParams.get('token');
    if (token) {
      setToken(token);
      // Remove token from URL
      searchParams.delete('token');
      setSearchParams(searchParams, { replace: true });
    }
    checkAuth();
  }, [checkAuth, searchParams, setSearchParams]);

  if (loading || authenticated === null) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        pb: 6,
      }}
    >
      <Navbar authenticated={authenticated} onAuthChange={checkAuth} />
      <Box sx={{ maxWidth: '900px', width: '100%', mx: 'auto' }}>
        <Routes>
          <Route path="/" element={<Home authenticated={authenticated} />} />
          <Route path="/converter" element={<Converter authenticated={authenticated} />} />
          <Route path="/settings" element={<Settings authenticated={authenticated} />} />
          <Route path="*" element={<Home authenticated={authenticated} />} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
