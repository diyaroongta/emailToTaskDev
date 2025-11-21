import { Link } from 'react-router-dom';
import { api } from '../api';

interface NavbarProps {
  authenticated: boolean;
  onAuthChange: () => void;
}

export default function Navbar({ authenticated, onAuthChange }: NavbarProps) {
  const handleLogout = async () => {
    await api.logout();
    onAuthChange();
  };

  return (
    <nav className="notion-navbar">
      <div className="container">
        <Link className="notion-brand" to="/">
          <i className="bi bi-envelope-check notion-icon"></i> Taskflow
        </Link>
        <div className="notion-nav-links">
          {authenticated ? (
            <>
              <Link className="notion-nav-link" to="/fetch-emails">
                <i className="bi bi-download notion-icon"></i> Fetch Emails
              </Link>
              <Link className="notion-nav-link" to="/view-all-results">
                <i className="bi bi-list-check notion-icon"></i> All Results
              </Link>
              <button className="notion-nav-link" onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <i className="bi bi-box-arrow-right notion-icon"></i> Logout
              </button>
            </>
          ) : (
            <button 
              className="notion-nav-link" 
              onClick={() => api.authorize()}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <i className="bi bi-google notion-icon"></i> Login with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

