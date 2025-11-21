import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { FetchEmailsResponse } from '../api';

export default function EmailResults() {
  const navigate = useNavigate();
  const [results, setResults] = useState<FetchEmailsResponse | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('emailResults');
    if (stored) {
      setResults(JSON.parse(stored));
      sessionStorage.removeItem('emailResults');
    } else {
      navigate('/fetch-emails');
    }
  }, [navigate]);

  if (!results) {
    return <div>Loading...</div>;
  }

  return (
    <div className="notion-slide-up">
      <div className="notion-card">
        <div className="notion-card-header">
          <h1 className="notion-card-title">
            <i className="bi bi-check-circle notion-icon" style={{ color: 'var(--notion-success)' }}></i>
            Email Processing Complete
          </h1>
          <p className="notion-card-subtitle">
            Your emails have been successfully processed and added to Google Tasks.
          </p>
        </div>

        {results.created && results.created.length > 0 && (
          <div className="notion-card">
            <div className="notion-card-header">
              <h4 className="notion-card-title">
                <i className="bi bi-list-ul notion-icon"></i>
                Created Tasks
              </h4>
            </div>
            <div className="notion-table-container">
              <table className="notion-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Provider</th>
                    <th>Status</th>
                    <th>Open</th>
                  </tr>
                </thead>
                <tbody>
                  {results.created.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="notion-text-truncate" style={{ maxWidth: '420px' }} title={item.task.title || '(no title)'}>
                          {item.task.title || '(no title)'}
                        </div>
                      </td>
                      <td>
                        <span className="notion-badge notion-badge-primary">{item.provider}</span>
                      </td>
                      <td>
                        <span className="notion-badge notion-badge-success">
                          <i className="bi bi-check-circle notion-icon"></i>
                          Created
                          {item.task.due && (
                            <span className="notion-text-mono notion-text-small">
                              {' '}· due {item.task.due}
                            </span>
                          )}
                        </span>
                      </td>
                      <td>
                        <a
                          className="notion-btn notion-btn-sm"
                          href="https://tasks.google.com/"
                          target="_blank"
                          rel="noopener"
                        >
                          <i className="bi bi-box-arrow-up-right notion-icon"></i> Open Google Tasks
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="notion-flex notion-gap-md notion-mt-lg">
          <Link to="/fetch-emails" className="notion-btn notion-btn-primary">
            <i className="bi bi-arrow-left notion-icon"></i>
            Process More Emails
          </Link>
          <Link to="/" className="notion-btn notion-btn-secondary">
            <i className="bi bi-house notion-icon"></i>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

