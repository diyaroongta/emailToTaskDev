import { useState, useCallback } from 'react';
import { api, type CalendarEvent } from '../apis/api';

export function useCalendarEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getAllCalendarEvents();
      setEvents(data.events);
      return data.events;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load calendar events';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEvents = useCallback(async (eventIds: number[]) => {
    setError(null);
    try {
      await api.deleteCalendarEvents(eventIds);
      setEvents(prevEvents => prevEvents.filter(event => !eventIds.includes(event.id)));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete calendar events';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const confirmEvents = useCallback(async (eventIds: number[]) => {
    setError(null);
    try {
      await api.calendar.confirmCalendarEvents(eventIds);
      // Reload events to get updated status
      await loadEvents();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to confirm calendar events';
      setError(errorMessage);
      throw err;
    }
  }, [loadEvents]);

  return {
    events,
    loading,
    error,
    loadEvents,
    deleteEvents,
    confirmEvents,
  };
}

