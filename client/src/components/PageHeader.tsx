import { Box, Typography } from '@mui/material';

interface PageHeaderProps {
  title?: string;
  description?: string;
}

export default function PageHeader({ 
  title = 'Email to Task Converter',
  description = 'Process emails from Gmail and convert them to tasks using AI classification'
}: PageHeaderProps) {
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
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            fontSize: '14px',
          }}
        >
          {description}
        </Typography>
    </Box>
  );
}

