// API service for communicating with Flask backend

export type FetchEmailsParams = {
  provider?: string;
  window?: string;
  max?: number;
  since_hours?: number;
  since?: string;
  q?: string;
  dry_run?: boolean;
};

export type Task = {
  provider: string;
  provider_task_id: string;
  created_at: string;
  email_subject: string;
  email_sender: string;
  email_received_at: string;
  task_title?: string;
  task_link?: string;
  task_due?: string;
};

export type FetchEmailsResponse = {
  processed: number;
  query: string;
  created: Array<{
    message_id: string;
    provider: string;
    task: {
      id?: string;
      title?: string;
      due?: string;
      status?: string;
      [key: string]: string | undefined;
    };
  }>;
  total_found: number;
  already_processed: number;
  considered: number;
};

class ApiService {
  private baseUrl = '/api';

  async checkAuth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/status`);
      const data = await response.json();
      return data.authenticated === true;
    } catch (error) {
      console.error('Auth check failed:', error);
      return false;
    }
  }

  async authorize(): Promise<void> {
    window.location.href = '/authorize';
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/logout`, { method: 'POST' });
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  async fetchEmails(params: FetchEmailsParams): Promise<FetchEmailsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params.provider) queryParams.append('provider', params.provider);
    if (params.window) queryParams.append('window', params.window);
    if (params.max) queryParams.append('max', params.max.toString());
    if (params.since_hours) queryParams.append('since_hours', params.since_hours.toString());
    if (params.since) queryParams.append('since', params.since);
    if (params.q) queryParams.append('q', params.q);
    if (params.dry_run !== undefined) queryParams.append('dry_run', params.dry_run.toString());

    const response = await fetch(`${this.baseUrl}/fetch-emails?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || 'Failed to fetch emails');
    }

    return await response.json();
  }

  async getAllTasks(): Promise<{ tasks: Task[]; total: number }> {
    const response = await fetch(`${this.baseUrl}/tasks/all`);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || 'Failed to fetch tasks');
    }

    return await response.json();
  }
}

export const api = new ApiService();

