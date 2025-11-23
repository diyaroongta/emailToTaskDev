import { Box, Typography } from '@mui/material';

export default function PageHeader() {
  return (
    <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            fontSize: '32px',
            mb: 0.5,
            letterSpacing: '-0.01em',
          }}
        >
          Email to Task Converter
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            fontSize: '14px',
          }}
        >
          Process emails from Gmail and convert them to tasks using AI classification
        </Typography>
    </Box>
  );
}

