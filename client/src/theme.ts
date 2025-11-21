import { createTheme } from '@mui/material/styles';

// Notion-style color palette
export const notionColors = {
  text: {
    primary: 'rgba(55, 53, 47, 1)',
    secondary: 'rgba(55, 53, 47, 0.65)',
    tertiary: 'rgba(55, 53, 47, 0.5)',
    disabled: 'rgba(55, 53, 47, 0.3)',
    icon: 'rgba(55, 53, 47, 0.8)',
  },
  background: {
    default: '#ffffff',
    hover: 'rgba(55, 53, 47, 0.08)',
    hoverLight: 'rgba(55, 53, 47, 0.03)',
    button: 'rgba(55, 53, 47, 1)',
    buttonHover: 'rgba(55, 53, 47, 0.85)',
    buttonDisabled: 'rgba(55, 53, 47, 0.3)',
  },
  border: {
    default: 'rgba(55, 53, 47, 0.09)',
    hover: 'rgba(55, 53, 47, 0.16)',
    focus: 'rgba(55, 53, 47, 0.3)',
    active: 'rgba(55, 53, 47, 0.5)',
  },
  chip: {
    default: 'rgba(55, 53, 47, 0.08)',
    text: 'rgba(55, 53, 47, 0.8)',
    success: 'rgba(46, 170, 220, 0.1)',
    successText: 'rgba(46, 170, 220, 1)',
  },
  error: {
    background: 'rgba(235, 87, 87, 0.1)',
    text: 'rgba(235, 87, 87, 1)',
    border: 'rgba(235, 87, 87, 0.2)',
  },
  shadow: {
    dialog: 'rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px',
  },
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: notionColors.text.primary,
    },
    secondary: {
      main: notionColors.text.secondary,
    },
    background: {
      default: notionColors.background.default,
      paper: notionColors.background.default,
    },
    text: {
      primary: notionColors.text.primary,
      secondary: notionColors.text.secondary,
    },
  },
  typography: {
    fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
    h1: {
      fontWeight: 700,
      fontSize: '48px',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: notionColors.text.primary,
    },
    h2: {
      fontWeight: 600,
      fontSize: '32px',
      letterSpacing: '-0.01em',
      color: notionColors.text.primary,
    },
    h3: {
      fontWeight: 600,
      fontSize: '24px',
      letterSpacing: '-0.01em',
      color: notionColors.text.primary,
    },
    h4: {
      fontWeight: 600,
      fontSize: '20px',
      color: notionColors.text.primary,
    },
    h5: {
      fontWeight: 600,
      fontSize: '18px',
      color: notionColors.text.primary,
    },
    h6: {
      fontWeight: 600,
      fontSize: '16px',
      color: notionColors.text.primary,
    },
    body1: {
      fontSize: '18px',
      lineHeight: 1.6,
      color: notionColors.text.secondary,
    },
    body2: {
      fontSize: '14px',
      color: notionColors.text.secondary,
    },
    button: {
      textTransform: 'none',
      fontSize: '14px',
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 3,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '3px',
          textTransform: 'none',
          fontSize: '14px',
          fontWeight: 400,
          transition: 'all 0.2s',
        },
        contained: {
          backgroundColor: notionColors.background.button,
          color: 'white',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: notionColors.background.buttonHover,
            boxShadow: 'none',
          },
          '&:disabled': {
            backgroundColor: notionColors.background.buttonDisabled,
          },
        },
        text: {
          color: notionColors.text.secondary,
          '&:hover': {
            backgroundColor: notionColors.background.hover,
          },
        },
        outlined: {
          borderColor: notionColors.border.hover,
          color: notionColors.text.secondary,
          '&:hover': {
            backgroundColor: notionColors.background.hover,
            borderColor: notionColors.border.focus,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '3px',
            '& fieldset': {
              borderColor: notionColors.border.hover,
            },
            '&:hover fieldset': {
              borderColor: notionColors.border.focus,
            },
            '&.Mui-focused fieldset': {
              borderColor: notionColors.border.active,
            },
            '& input': {
              fontSize: '14px',
            },
            '& textarea': {
              fontSize: '14px',
            },
            '& .MuiSelect-select': {
              fontSize: '14px',
            },
          },
          '& .MuiInputLabel-root': {
            color: notionColors.text.secondary,
            fontSize: '14px',
          },
          '& .MuiFormHelperText-root': {
            color: notionColors.text.tertiary,
            fontSize: '12px',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '14px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '12px',
          height: '24px',
          border: 'none',
        },
        outlined: {
          backgroundColor: notionColors.chip.default,
          color: notionColors.chip.text,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTab-root': {
            textTransform: 'none',
            fontSize: '14px',
            fontWeight: 400,
            color: notionColors.text.secondary,
            minHeight: 40,
            '&.Mui-selected': {
              color: notionColors.text.primary,
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: notionColors.text.primary,
            height: '2px',
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            borderColor: notionColors.border.default,
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: notionColors.background.hoverLight,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: notionColors.text.secondary,
          fontSize: '12px',
          fontWeight: 500,
          padding: '12px 16px',
        },
        body: {
          fontSize: '14px',
          color: notionColors.text.primary,
          padding: '12px 16px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '3px',
          boxShadow: notionColors.shadow.dialog,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          paddingBottom: '8px',
          borderBottom: `1px solid ${notionColors.border.default}`,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
          borderTop: `1px solid ${notionColors.border.default}`,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: `1px solid ${notionColors.border.default}`,
          borderRadius: '3px',
          boxShadow: 'none',
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          '& .MuiAccordionSummary-content': {
            margin: '12px 0',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '3px',
          '&.MuiAlert-error': {
            backgroundColor: notionColors.error.background,
            color: notionColors.error.text,
            border: `1px solid ${notionColors.error.border}`,
            '& .MuiAlert-icon': {
              color: notionColors.error.text,
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: notionColors.text.secondary,
          '&:hover': {
            backgroundColor: notionColors.background.hover,
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: notionColors.text.secondary,
        },
      },
    },
  },
});

