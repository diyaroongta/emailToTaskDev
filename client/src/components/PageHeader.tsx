import { Box, Typography, Button } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';

interface PageHeaderProps {
  onSettingsClick: () => void;
}

export default function PageHeader({ onSettingsClick }: PageHeaderProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
      <Box>
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
      <Button
        variant="text"
        startIcon={<SettingsIcon />}
        onClick={onSettingsClick}
        sx={{
          px: 1.5,
          py: 0.75,
        }}
      >
        Settings
      </Button>
    </Box>
  );
}

