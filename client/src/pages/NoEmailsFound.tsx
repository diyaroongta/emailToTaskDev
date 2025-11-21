import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import type { FetchEmailsParams } from '../api';

export default function NoEmailsFound() {
  const navigate = useNavigate();

  const performSearch = async (query: string, window: string, max: number) => {
    const params: FetchEmailsParams = {
      provider: 'google_tasks',
      window: window || undefined,
      max,
      q: query || undefined,
    };

    try {
      const result = await api.fetchEmails(params);

      if (result.processed === 0 && result.already_processed === 0) {
        // Still no emails found
        alert('Still no emails found. Try a different search.');
      } else if (result.processed === 0 && result.already_processed > 0) {
        alert(`Found ${result.already_processed} emails, but they were already processed. No new tasks created.`);
      } else {
        // Store results and navigate
        sessionStorage.setItem('emailResults', JSON.stringify(result));
        navigate('/email-results');
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
    }
  };

  const tryInbox = () => performSearch('in:inbox', '', 5);
  const tryUnread = () => performSearch('is:unread', '', 5);
  const tryRecent = () => performSearch('in:inbox', '7d', 5);

  return (
    <div className="notion-slide-up">
      <div className="notion-card">
        <div className="notion-card-header notion-text-center">
          <h1 className="notion-card-title">
            <i className="bi bi-exclamation-triangle notion-icon" style={{ color: 'var(--notion-warning)' }}></i>
            No Emails Found
          </h1>
        </div>
        <div className="notion-grid notion-grid-2 notion-mb-xl">
          <div className="notion-card">
            <div className="notion-card-header">
              <h3 className="notion-card-title">
                <i className="bi bi-question-circle notion-icon" style={{ color: 'var(--notion-text-secondary)' }}></i>
                Setup Guide
              </h3>
            </div>
            <div>
              <p>Try adjusting your search criteria or use one of the quick solutions below.</p>
            </div>
          </div>
          <div className="notion-card">
            <div className="notion-card-header">
              <h3 className="notion-card-title">
                <i className="bi bi-lightbulb notion-icon" style={{ color: 'var(--notion-warning)' }}></i>
                Quick Solutions
              </h3>
            </div>
            <div className="notion-flex notion-flex-column notion-gap-sm">
              <button className="notion-btn notion-btn-primary" onClick={tryInbox}>
                <i className="bi bi-inbox notion-icon"></i> Try Inbox Emails
              </button>
              <button className="notion-btn notion-btn-primary" onClick={tryUnread}>
                <i className="bi bi-envelope notion-icon"></i> Try Unread Emails
              </button>
              <button className="notion-btn notion-btn-primary" onClick={tryRecent}>
                <i className="bi bi-clock notion-icon"></i> Try Recent Emails (7 days)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

