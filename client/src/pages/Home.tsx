import { useState, useEffect } from 'react';
import {
  Box,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Button,
  Typography,
} from '@mui/material';
import {
  Download as DownloadIcon,
  List as ListIcon,
  Event as EventIcon,
  Google as GoogleIcon,
} from '@mui/icons-material';
import { api } from '../api';
import type { FetchEmailsParams, FetchEmailsResponse, Task, CalendarEvent } from '../api';
import { notionColors } from '../theme';
import PageHeader from '../components/PageHeader';
import ProcessEmailsForm from '../components/ProcessEmailsForm';
import CreatedTasksList from '../components/CreatedTasksList';
import CreatedCalendarEvents from '../components/CreatedCalendarEvents';
import AllTasksTable from '../components/AllTasksTable';
import AllCalendarEventsTable from '../components/AllCalendarEventsTable';

interface HomeProps {
  authenticated: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Home({ authenticated }: HomeProps) {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [loadingCalendarEvents, setLoadingCalendarEvents] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<FetchEmailsResponse | null>(null);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [allCalendarEvents, setAllCalendarEvents] = useState<CalendarEvent[]>([]);
  
  const [formData, setFormData] = useState<FetchEmailsParams>(() => {
    const saved = localStorage.getItem('emailToTaskSettings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {
          provider: 'google_tasks',
          max: undefined,
          window: '',
          since_hours: undefined,
          since: '',
          q: '',
          dry_run: false,
        };
      }
    }
    return {
      provider: 'google_tasks',
      max: undefined,
      window: '',
      since_hours: undefined,
      since: '',
      q: '',
      dry_run: false,
    };
  });

  useEffect(() => {
    if (authenticated && tabValue === 1) {
      loadAllTasks();
    } else if (authenticated && tabValue === 2) {
      loadAllCalendarEvents();
    }
  }, [authenticated, tabValue]);

  const loadAllTasks = async () => {
    try {
      setLoadingTasks(true);
      const data = await api.getAllTasks();
      setAllTasks(data.tasks);
    } catch (err) {
      setSnackbarMessage(err instanceof Error ? err.message : 'Failed to load tasks');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
    } finally {
      setLoadingTasks(false);
    }
  };

  const loadAllCalendarEvents = async () => {
    try {
      setLoadingCalendarEvents(true);
      const data = await api.getAllCalendarEvents();
      setAllCalendarEvents(data.events);
    } catch (err) {
      setSnackbarMessage(err instanceof Error ? err.message : 'Failed to load calendar events');
      setSnackbarSeverity('error');
    setShowSnackbar(true);
    } finally {
      setLoadingCalendarEvents(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const params: FetchEmailsParams = {
        ...formData,
        max: formData.max ? Number(formData.max) : undefined,
        since_hours: formData.since_hours ? Number(formData.since_hours) : undefined,
        dry_run: formData.dry_run || false,
      };

      const result = await api.fetchEmails(params);
      setResults(result);
      
      localStorage.setItem('emailToTaskSettings', JSON.stringify(formData));

      if (result.processed === 0 && result.already_processed === 0) {
        setSnackbarMessage('No emails found matching your criteria.');
        setSnackbarSeverity('warning');
        setShowSnackbar(true);
      } else if (result.processed === 0 && result.already_processed > 0) {
        setSnackbarMessage(`Found ${result.already_processed} emails, but they were already processed. No new tasks created.`);
        setSnackbarSeverity('info');
        setShowSnackbar(true);
      } else {
        const calendarCount = result.calendar_events?.length || 0;
        let message = `Successfully processed ${result.processed} email(s) and created ${result.processed} task(s)!`;
        if (calendarCount > 0) {
          message += ` Also created ${calendarCount} calendar event(s).`;
        }
        setSnackbarMessage(message);
        setSnackbarSeverity('success');
        setShowSnackbar(true);
        if (tabValue === 1) {
          loadAllTasks();
        } else if (tabValue === 2) {
          loadAllCalendarEvents();
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing emails');
      setSnackbarMessage(err instanceof Error ? err.message : 'An error occurred');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Box sx={{ textAlign: 'center', maxWidth: 600, px: 3 }}>
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              fontSize: '48px',
              lineHeight: 1.2,
              mb: 2,
              letterSpacing: '-0.02em',
            }}
          >
            Taskflow
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: '18px',
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            Convert Gmail emails to tasks automatically using AI-powered classification
          </Typography>
          <Button
            onClick={() => api.authorize()}
            variant="contained"
            startIcon={<GoogleIcon />}
            sx={{ 
              fontSize: '15px',
              px: 3,
              py: 1.25,
            }}
          >
            Connect with Google
          </Button>
        </Box>
      </Box>
    );
  }

    return (
      <>
      <Box sx={{ maxWidth: 900, mx: 'auto', px: 3, pt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <PageHeader />

          <Box sx={{ borderBottom: `1px solid ${notionColors.border.default}`, mb: 4 }}>
            <Tabs 
              value={tabValue} 
              onChange={(_, newValue) => setTabValue(newValue)}
            >
              <Tab label="Process Emails" icon={<DownloadIcon sx={{ fontSize: 18 }} />} iconPosition="start" />
              <Tab label="All Tasks" icon={<ListIcon sx={{ fontSize: 18 }} />} iconPosition="start" />
              <Tab label="Calendar" icon={<EventIcon sx={{ fontSize: 18 }} />} iconPosition="start" />
            </Tabs>
            </Box>

          <TabPanel value={tabValue} index={0}>
            <ProcessEmailsForm
              formData={formData}
              onFormDataChange={setFormData}
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
            />
            {results && (
              <>
                <CreatedTasksList results={results} />
                <CreatedCalendarEvents results={results} />
              </>
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <AllTasksTable
              tasks={allTasks}
              loading={loadingTasks}
              onRefresh={loadAllTasks}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <AllCalendarEventsTable
              events={allCalendarEvents}
              loading={loadingCalendarEvents}
              onRefresh={loadAllCalendarEvents}
            />
          </TabPanel>
              </Box>
            </Box>

        <Snackbar
          open={showSnackbar}
        autoHideDuration={6000}
          onClose={() => setShowSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
        <Alert onClose={() => setShowSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
          </Alert>
        </Snackbar>
      </>
    );
  }
