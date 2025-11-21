import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import type { Task } from '../api';

export default function AllResults() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await api.getAllTasks();
      setTasks(data.tasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="notion-alert notion-alert-error">
        <i className="bi bi-exclamation-triangle notion-icon"></i>
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="notion-slide-up">
      <div className="notion-card">
        <div className="notion-card-header">
          <h1 className="notion-card-title">
            <i className="bi bi-list-check notion-icon" style={{ color: 'var(--notion-accent)' }}></i>
            All Processed Tasks
          </h1>
          <p className="notion-card-subtitle">
            View all emails that have been processed and added to Google Tasks.
          </p>
        </div>

        {tasks.length > 0 ? (
          <div className="notion-card">
            <div className="notion-card-header">
              <h4 className="notion-card-title">
                <i className="bi bi-list-ul notion-icon"></i>
                Task History
              </h4>
            </div>
            <div className="notion-table-container">
              <table className="notion-table">
                <thead>
                  <tr>
                    <th>Task Title</th>
                    <th>Sender</th>
                    <th>Provider</th>
                    <th>Received</th>
                    <th>Processed</th>
                    <th>Due</th>
                    <th>Open</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, idx) => (
                    <tr key={idx}>
                      <td>
                        <div
                          className="notion-text-truncate"
                          style={{ maxWidth: '320px' }}
                          title={task.task_title || task.email_subject || 'No title'}
                        >
                          {task.task_title || task.email_subject || 'No title'}
                        </div>
                      </td>
                      <td>
                        <div
                          className="notion-text-truncate"
                          style={{ maxWidth: '220px' }}
                          title={task.email_sender || 'Unknown'}
                        >
                          {task.email_sender || 'Unknown'}
                        </div>
                      </td>
                      <td>
                        <span className="notion-badge notion-badge-primary">{task.provider}</span>
                      </td>
                      <td className="notion-text-mono notion-text-small">
                        {task.email_received_at ? task.email_received_at.slice(0, 19).replace('T', ' ') : ''}
                      </td>
                      <td className="notion-text-mono notion-text-small">
                        {task.created_at ? task.created_at.slice(0, 19).replace('T', ' ') : ''}
                      </td>
                      <td>{task.task_due || '—'}</td>
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
        ) : (
          <div className="notion-card">
            <div className="notion-card-header">
              <h4 className="notion-card-title">
                <i className="bi bi-inbox notion-icon"></i>
                No Tasks Found
              </h4>
            </div>
            <p>No tasks have been processed yet. Start by fetching and processing emails from your Gmail account.</p>
          </div>
        )}

        <div className="notion-flex notion-gap-md notion-mt-lg">
          <Link to="/fetch-emails" className="notion-btn notion-btn-primary">
            <i className="bi bi-download notion-icon"></i>
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

