import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { Email as EmailIcon, Settings as SettingsIcon, AutoAwesome as ConverterIcon, Google as GoogleIcon, Logout as LogoutIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { api } from '../apis/api';
import { notionColors } from '../theme';

interface NavbarProps {
  authenticated: boolean;
  onAuthChange: () => void;
}

export default function Navbar({ authenticated, onAuthChange }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path?: string) => {
    handleMenuClose();
    if (path) {
      navigate(path);
    }
  };

  const handleLogout = async () => {
    handleMenuClose();
    await api.logout();
    onAuthChange();
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        mb: 0,
        backgroundColor: '#FFFFFF',
        color: 'text.primary',
        borderBottom: `1px solid ${notionColors.border.default}`,
      }}
    >
      <Toolbar sx={{ maxWidth: '900px', width: '100%', mx: 'auto', px: 3, py: 1.5, minHeight: '48px !important' }}>
        <Box 
          component={Link} 
          to="/" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5, 
            textDecoration: 'none', 
            color: notionColors.text.primary,
            '&:hover': { opacity: 0.7 },
            transition: 'opacity 0.2s',
          }}
        >
          <EmailIcon sx={{ fontSize: 22, color: notionColors.primary.main }} />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 600,
              fontSize: '24px',
              letterSpacing: '-0.01em',
              color: notionColors.primary.main,
            }}
          >
            Taskflow
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {authenticated ? (
            <>
              <IconButton
                onClick={handleProfileClick}
                sx={{
                  padding: 0,
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    backgroundColor: 'transparent',
                    color: notionColors.text.secondary,
                  }}
                >
                  <AccountCircleIcon sx={{ fontSize: 36 }} />
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                sx={{
                  '& .MuiPaper-root': {
                    borderRadius: '8px',
                    border: `1px solid ${notionColors.border.default}`,
                    boxShadow: notionColors.shadow.dialog,
                    mt: 1,
                    minWidth: 180,
                  },
                }}
              >
                <MenuItem
                  onClick={() => handleMenuItemClick('/converter')}
                  selected={location.pathname === '/converter'}
                  sx={{
                    fontSize: '14px',
                    py: 1.5,
                    '&.Mui-selected': {
                      backgroundColor: notionColors.background.hover,
                      '&:hover': {
                        backgroundColor: notionColors.background.hover,
                      },
                    },
                  }}
                >
                  <ConverterIcon sx={{ fontSize: 18, mr: 1.5, color: notionColors.text.secondary }} />
                  Converter
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuItemClick('/settings')}
                  selected={location.pathname === '/settings'}
                  sx={{
                    fontSize: '14px',
                    py: 1.5,
                    '&.Mui-selected': {
                      backgroundColor: notionColors.background.hover,
                      '&:hover': {
                        backgroundColor: notionColors.background.hover,
                      },
                    },
                  }}
                >
                  <SettingsIcon sx={{ fontSize: 18, mr: 1.5, color: notionColors.text.secondary }} />
                  Settings
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    fontSize: '14px',
                    py: 1.5,
                    color: notionColors.error.text,
                    '&:hover': {
                      backgroundColor: notionColors.error.background,
                    },
                  }}
                >
                  <LogoutIcon sx={{ fontSize: 18, mr: 1.5 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              onClick={() => api.authorize()}
              variant="contained"
              startIcon={<GoogleIcon sx={{ fontSize: 18 }} />}
              sx={{ 
                fontSize: '14px',
                px: 2,
                py: 0.75,
                borderRadius: '3px',
                minWidth: 'auto',
              }}
            >
              Google Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

