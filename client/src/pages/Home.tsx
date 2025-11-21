import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

interface HomeProps {
  authenticated: boolean;
}

export default function Home({ authenticated }: HomeProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    provider: 'google_tasks',
    max: '',
    window: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('emailToTaskSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem('emailToTaskSettings', JSON.stringify(settings));
    setShowSettings(false);
    showAlert('Settings saved successfully!');
  };

  const showAlert = (message: string) => {
    // Simple alert implementation - can be enhanced with a toast library
    alert(message);
  };

  if (authenticated) {
    return (
      <div className="notion-slide-up">
        <div className="notion-card">
          <div className="notion-card-header">
            <h1 className="notion-card-title">
              <i className="bi bi-check-circle notion-icon" style={{ color: 'var(--notion-success)' }}></i>
              Connected to Gmail
            </h1>
            <p className="notion-card-subtitle">
              You're successfully connected! You can now fetch emails and convert them to tasks.
            </p>
          </div>

          <div className="notion-grid notion-grid-2">
            <div className="notion-card">
              <div className="notion-text-center">
                <i className="bi bi-download notion-icon-xl" style={{ color: 'var(--notion-accent)' }}></i>
                <h3 className="notion-mt-md">Fetch Emails</h3>
                <p>Process emails from your Gmail account and convert them to tasks.</p>
                <Link to="/fetch-emails" className="notion-btn notion-btn-primary notion-btn-lg">
                  <i className="bi bi-download notion-icon"></i> Fetch Emails
                </Link>
              </div>
            </div>
            <div className="notion-card">
              <div className="notion-text-center">
                <i className="bi bi-sliders notion-icon-xl" style={{ color: 'var(--notion-text-secondary)' }}></i>
                <h3 className="notion-mt-md">Settings</h3>
                <p>Configure your email processing preferences and task provider.</p>
                <button className="notion-btn notion-btn-lg" onClick={() => setShowSettings(true)}>
                  <i className="bi bi-sliders notion-icon"></i> Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {showSettings && (
          <div className="notion-modal" style={{ display: 'block' }}>
            <div className="notion-modal-content">
              <div className="notion-modal-header">
                <h3 className="notion-modal-title">
                  <i className="bi bi-sliders notion-icon"></i> Settings
                </h3>
                <button type="button" className="notion-btn notion-btn-sm" onClick={() => setShowSettings(false)}>
                  <i className="bi bi-x notion-icon"></i>
                </button>
              </div>
              <div className="notion-modal-body">
                <div className="notion-form-group">
                  <label htmlFor="provider" className="notion-label">Task Provider</label>
                  <select
                    className="notion-select"
                    id="provider"
                    value={settings.provider}
                    onChange={(e) => setSettings({ ...settings, provider: e.target.value })}
                  >
                    <option value="google_tasks">Google Tasks</option>
                  </select>
                </div>
                <div className="notion-form-group">
                  <label htmlFor="max" className="notion-label">Max Emails</label>
                  <input
                    type="number"
                    className="notion-input"
                    id="max"
                    value={settings.max}
                    onChange={(e) => setSettings({ ...settings, max: e.target.value })}
                    min="1"
                    placeholder="(blank = all)"
                  />
                </div>
                <div className="notion-form-group">
                  <label htmlFor="window" className="notion-label">Time Window</label>
                  <select
                    className="notion-select"
                    id="window"
                    value={settings.window}
                    onChange={(e) => setSettings({ ...settings, window: e.target.value })}
                  >
                    <option value="">All emails</option>
                    <option value="1d">Last 24 hours</option>
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                  </select>
                </div>
              </div>
              <div className="notion-modal-footer">
                <button type="button" className="notion-btn" onClick={() => setShowSettings(false)}>
                  Cancel
                </button>
                <button type="button" className="notion-btn notion-btn-primary" onClick={saveSettings}>
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="notion-slide-up">
      <div className="notion-card notion-text-center" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="notion-card-header">
          <h1 className="notion-card-title" style={{ fontSize: '2rem', marginBottom: 'var(--notion-space-sm)', justifyContent: 'center' }}>
            <i className="bi bi-envelope-check notion-icon-xl" style={{ color: 'var(--notion-text)' }}></i>
            Taskflow
          </h1>
          <p className="lead" style={{ fontSize: '1rem', marginBottom: 'var(--notion-space-md)' }}>
            Convert Gmail emails to tasks automatically
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--notion-space-lg)' }}>
            <div style={{ textAlign: 'center' }}>
              <i className="bi bi-shield-check notion-icon-lg" style={{ color: 'var(--notion-success)' }}></i>
              <p style={{ margin: 'var(--notion-space-xs) 0 0 0', fontSize: '0.75rem', color: 'var(--notion-text-tertiary)' }}>Secure</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <i className="bi bi-lightning notion-icon-lg" style={{ color: 'var(--notion-accent)' }}></i>
              <p style={{ margin: 'var(--notion-space-xs) 0 0 0', fontSize: '0.75rem', color: 'var(--notion-text-tertiary)' }}>Fast</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <i className="bi bi-check-square notion-icon-lg" style={{ color: 'var(--notion-success)' }}></i>
              <p style={{ margin: 'var(--notion-space-xs) 0 0 0', fontSize: '0.75rem', color: 'var(--notion-text-tertiary)' }}>Simple</p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 'var(--notion-space-lg)' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--notion-text-secondary)', margin: 0 }}>
            Connect your Gmail account to start converting forwarded emails into organized tasks
          </p>
        </div>

        <div className="notion-text-center">
          <button
            onClick={() => api.authorize()}
            className="notion-btn notion-btn-primary notion-btn-lg"
            style={{ fontSize: '16px', padding: '12px 24px' }}
          >
            <i className="bi bi-google notion-icon"></i> Connect with Google
          </button>
        </div>
      </div>
    </div>
  );
}

