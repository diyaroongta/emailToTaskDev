import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { notionColors } from '../theme';
import type { FetchEmailsParams } from '../api';

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  formData: FetchEmailsParams;
  onFormDataChange: (data: FetchEmailsParams) => void;
  onSave: () => void;
}

export default function SettingsDialog({
  open,
  onClose,
  formData,
  onFormDataChange,
  onSave,
}: SettingsDialogProps) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          boxShadow: notionColors.shadow.dialog,
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontSize: '16px' }}>
            Settings
          </Typography>
          <IconButton 
            onClick={onClose} 
            size="small"
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            select
            label="Task Provider"
            value={formData.provider}
            onChange={(e) => onFormDataChange({ ...formData, provider: e.target.value })}
            fullWidth
          >
            <MenuItem value="google_tasks">Google Tasks</MenuItem>
          </TextField>
          <TextField
            type="number"
            label="Max Emails (default)"
            value={formData.max || ''}
            onChange={(e) => onFormDataChange({ ...formData, max: e.target.value ? Number(e.target.value) : undefined })}
            placeholder="(blank = all)"
            inputProps={{ min: 1 }}
            fullWidth
          />
          <TextField
            select
            label="Time Window (default)"
            value={formData.window}
            onChange={(e) => onFormDataChange({ ...formData, window: e.target.value })}
            fullWidth
          >
            <MenuItem value="">All emails</MenuItem>
            <MenuItem value="1d">Last 24 hours</MenuItem>
            <MenuItem value="7d">Last 7 days</MenuItem>
            <MenuItem value="30d">Last 30 days</MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          variant="text"
          sx={{ px: 2, py: 0.75 }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onSave} 
          variant="contained"
          sx={{ px: 2.5, py: 0.75 }}
        >
          Save Settings
        </Button>
      </DialogActions>
    </Dialog>
  );
}

