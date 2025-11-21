import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import type { FetchEmailsParams } from '../api';

export default function FetchEmails() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FetchEmailsParams>({
    provider: 'google_tasks',
    max: undefined,
    window: '',
    since_hours: undefined,
    since: '',
    q: '',
    dry_run: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem('emailToTaskSettings');
    if (saved) {
      const settings = JSON.parse(saved);
      setFormData((prev) => ({ ...prev, ...settings }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const params: FetchEmailsParams = {
        ...formData,
        max: formData.max ? Number(formData.max) : undefined,
        since_hours: formData.since_hours ? Number(formData.since_hours) : undefined,
        dry_run: formData.dry_run || false,
      };

      const result = await api.fetchEmails(params);

      // Save form data
      localStorage.setItem('emailToTaskSettings', JSON.stringify(formData));

      // Navigate based on results
      if (result.processed === 0 && result.already_processed === 0) {
        navigate('/no-emails-found');
      } else if (result.processed === 0 && result.already_processed > 0) {
        alert(`Found ${result.already_processed} emails, but they were already processed. No new tasks created.`);
      } else {
        // Store results in sessionStorage for EmailResults page
        sessionStorage.setItem('emailResults', JSON.stringify(result));
        navigate('/email-results');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing emails');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notion-slide-up">
      <div className="notion-card">
        <div className="notion-card-header">
          <h1 className="notion-card-title">
            <i className="bi bi-download notion-icon" style={{ color: 'var(--notion-accent)' }}></i>
            Fetch and Process Emails
          </h1>
          <p className="notion-card-subtitle">
            Configure your search parameters and process emails from your Gmail account.
          </p>
        </div>

        <form id="fetchForm" className="notion-mb-xl" onSubmit={handleSubmit}>
          <div className="notion-grid notion-grid-4">
            <div className="notion-form-group">
              <label htmlFor="provider" className="notion-label">Task Provider</label>
              <select
                className="notion-select"
                id="provider"
                name="provider"
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
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
                name="max"
                min="1"
                placeholder="(blank = all)"
                value={formData.max || ''}
                onChange={(e) => setFormData({ ...formData, max: e.target.value ? Number(e.target.value) : undefined })}
              />
            </div>

            <div className="notion-form-group">
              <label htmlFor="window" className="notion-label">Gmail Window (coarse)</label>
              <select
                className="notion-select"
                id="window"
                name="window"
                value={formData.window}
                onChange={(e) => setFormData({ ...formData, window: e.target.value })}
              >
                <option value="">All emails</option>
                <option value="1d">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
              </select>
            </div>

            <div className="notion-form-group">
              <label htmlFor="dry_run" className="notion-label">Dry Run</label>
              <select
                className="notion-select"
                id="dry_run"
                name="dry_run"
                value={formData.dry_run ? 'true' : 'false'}
                onChange={(e) => setFormData({ ...formData, dry_run: e.target.value === 'true' })}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>

          <div className="notion-grid notion-grid-4" style={{ marginTop: 'var(--notion-space-md)' }}>
            <div className="notion-form-group">
              <label htmlFor="since_hours" className="notion-label">Since (hours)</label>
              <input
                type="number"
                className="notion-input"
                id="since_hours"
                name="since_hours"
                placeholder="e.g., 24"
                value={formData.since_hours || ''}
                onChange={(e) => setFormData({ ...formData, since_hours: e.target.value ? Number(e.target.value) : undefined })}
              />
            </div>

            <div className="notion-form-group">
              <label htmlFor="since" className="notion-label">Since (ISO 8601)</label>
              <input
                type="text"
                className="notion-input"
                id="since"
                name="since"
                placeholder="e.g., 2025-10-27T12:00:00Z"
                value={formData.since}
                onChange={(e) => setFormData({ ...formData, since: e.target.value })}
              />
              <div className="notion-help">Overrides hours if both provided.</div>
            </div>
          </div>

          <div className="notion-grid notion-grid-1" style={{ marginTop: 'var(--notion-space-md)' }}>
            <div className="notion-form-group">
              <label htmlFor="q" className="notion-label">Custom Gmail Query</label>
              <input
                type="text"
                className="notion-input"
                id="q"
                name="q"
                placeholder="e.g., from:boss@example.com has:attachment"
                value={formData.q}
                onChange={(e) => setFormData({ ...formData, q: e.target.value })}
              />
              <div className="notion-help">
                If provided, this overrides the label unless you include it in your query.
              </div>
            </div>
          </div>

          <div className="notion-flex notion-gap-md">
            <button
              type="submit"
              className="notion-btn notion-btn-primary notion-btn-lg"
              id="fetchBtn"
              disabled={loading}
            >
              <i className="bi bi-download notion-icon"></i>{' '}
              {loading ? 'Processing...' : 'Process Emails → Create Tasks'}
            </button>
          </div>

          {error && (
            <div className="notion-alert notion-alert-error" style={{ marginTop: 'var(--notion-space-md)' }}>
              <i className="bi bi-exclamation-triangle notion-icon"></i>
              <div>
                <h4>Error</h4>
                <div>{error}</div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

