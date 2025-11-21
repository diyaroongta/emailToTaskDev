import { Box, Typography, Button } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { api } from '../api';

export default function LandingPage() {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 8, px: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
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

