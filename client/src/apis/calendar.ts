import { BaseApiService } from './base';
import type { CalendarEvent } from './types';

export class CalendarService extends BaseApiService {
  async getAllCalendarEvents(): Promise<{ events: CalendarEvent[]; total: number }> {
    const response = await fetch(`${this.baseUrl}/calendar-events/all`, {
      credentials: 'include',
      headers: this.getHeaders(),
    });
    
    return this.handleResponse<{ events: CalendarEvent[]; total: number }>(
      response,
      'Failed to fetch calendar events'
    );
  }

  async deleteCalendarEvents(eventIds: number[]): Promise<void> {
    const response = await fetch(`${this.baseUrl}/calendar-events`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.getHeaders(),
      body: JSON.stringify({ event_ids: eventIds }),
    });
    
    await this.handleResponse<void>(response, 'Failed to delete calendar events');
  }

  async confirmCalendarEvents(eventIds: number[]): Promise<{ message: string; confirmed_count: number; errors?: string[] }> {
    const response = await fetch(`${this.baseUrl}/calendar-events/confirm`, {
      method: 'POST',
      credentials: 'include',
      headers: this.getHeaders(),
      body: JSON.stringify({ event_ids: eventIds }),
    });
    
    return this.handleResponse<{ message: string; confirmed_count: number; errors?: string[] }>(response, 'Failed to confirm calendar events');
  }
}

