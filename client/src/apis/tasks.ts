import { BaseApiService } from './base';
import type { Task } from './types';

export class TaskService extends BaseApiService {
  async getAllTasks(): Promise<{ tasks: Task[]; total: number }> {
    const response = await fetch(`${this.baseUrl}/tasks/all`, {
      credentials: 'include',
      headers: this.getHeaders(),
    });
    
    return this.handleResponse<{ tasks: Task[]; total: number }>(response, 'Failed to fetch tasks');
  }

  async deleteTasks(taskIds: number[]): Promise<void> {
    const response = await fetch(`${this.baseUrl}/tasks`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.getHeaders(),
      body: JSON.stringify({ task_ids: taskIds }),
    });
    
    await this.handleResponse<void>(response, 'Failed to delete tasks');
  }

  async confirmTasks(taskIds: number[]): Promise<{ message: string; confirmed_count: number; errors?: string[] }> {
    const response = await fetch(`${this.baseUrl}/tasks/confirm`, {
      method: 'POST',
      credentials: 'include',
      headers: this.getHeaders(),
      body: JSON.stringify({ task_ids: taskIds }),
    });
    
    return this.handleResponse<{ message: string; confirmed_count: number; errors?: string[] }>(response, 'Failed to confirm tasks');
  }
}

