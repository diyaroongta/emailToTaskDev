export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '—';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  } catch {
    return dateString.slice(0, 10);
  }
}

