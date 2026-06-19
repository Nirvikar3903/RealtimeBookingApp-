/**
 * Theme configuration for SortMyScene
 * This file contains theme constants used throughout the application
 * for consistent styling, spacing, typography, and colors.
 */

import { createTheme } from '@mui/material/styles';

export const colors = {
  // Primary color from design spec
  primary: {
    main: '#06b6d4', // SortMyScene cyan accent
  },

  // Feedback/Semantic colors from design spec
  success: {
    main: '#22c55e', // SortMyScene timer safe color
  },
  warning: {
    main: '#f59e0b', // SortMyScene timer warning / seat reserved color
  },
  error: {
    main: '#ef4444', // SortMyScene timer danger / seat booked color
  },
  info: {
    main: '#06b6d4', // Info is cyan
  },

  // Light mode colors (basic structure for compatibility)
  text: {
    primary: '#213547',
    secondary: '#6e6e6e',
    disabled: '#a0a0a0',
  },
  background: {
    default: '#ffffff',
    paper: '#f5f5f5',
  },

  // Dark mode colors from design spec
  dark: {
    background: {
      page: '#080b14', // --bg-primary
      card: '#131929', // --bg-card
      layer2: '#0f1422', // --bg-surface
      popup: '#0f1422', // --bg-surface
      topnav: '#080b14', // topnav bg
      helper: '#0f1422',
      notificationAlt: '#131929',
      button: {
        primary: '#06b6d4',
        disabled: '#1e293b',
      },
    },
    text: {
      heading: '#f1f5f9', // --text-primary
      subtext: '#94a3b8', // --text-secondary
      subheading: '#94a3b8',
      body: '#94a3b8',
      paragraph: '#94a3b8',
      helper: {
        disabled: '#475569', // --text-muted
        enabled: '#94a3b8',
      },
      label: '#f1f5f9',
      button: {
        onPrimary: '#080b14',
        onSecondary: '#f1f5f9',
        onDisabled: '#475569',
      },
    },
    stroke: {
      divider: 'rgba(255, 255, 255, 0.08)', // --border
      textField: '#06b6d4',
      outline: {
        secondary: 'rgba(255, 255, 255, 0.08)',
        active: '#06b6d4',
        disabled: '#1e293b',
      },
    },
    icon: {
      disabled: '#475569',
      active: '#f1f5f9',
      primary: '#06b6d4',
    },
  },

  // Custom seat status colors for SortMyScene
  seats: {
    available: '#1e293b',
    availableBorder: '#334155',
    selected: '#06b6d4',
    selectedGlow: '0 0 20px rgba(6,182,212,0.6)',
    reserved: '#f59e0b',
    reservedGlow: '0 0 15px rgba(245,158,11,0.5)',
    booked: '#ef4444',
  },

  // Accents for SortMyScene
  accent: {
    purple: '#a855f7',
    cyan: '#06b6d4',
  },
};

export const typography = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
  fontSize: {
    h1: '2.125rem',      // 34px
    h2: '1.75rem',       // 28px
    h3: '1.5rem',        // 24px
    h4: '1.25rem',       // 20px
    subheading1: '1.125rem', // 18px
    body1: '1rem',       // 16px
    paragraph: '0.875rem', // 14px
    label: '0.75rem',    // 12px
    helperText: '0.625rem', // 10px
    helperTextSmall: '0.5rem', // 8px
    buttonLarge: '0.875rem', // 14px
    buttonMedium: '0.75rem', // 12px
    buttonSmall: '0.625rem', // 10px
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

export const zIndex = {
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

// Common theme configuration helper
const getCommonThemeConfig = () => ({
  typography: {
    fontFamily: typography.fontFamily,
    // Custom typography variants
    custom: {
      heading4: {
        fontSize: typography.fontSize.h4,
        fontWeight: typography.fontWeight.regular,
      },
      subheading1: {
        fontSize: typography.fontSize.subheading1,
        fontWeight: typography.fontWeight.regular,
      },
      subheading2: {
        fontSize: typography.fontSize.subheading1,
        fontWeight: typography.fontWeight.semibold,
      },
      subheading3: {
        fontSize: typography.fontSize.subheading1,
        fontWeight: typography.fontWeight.medium,
      },
      paragraph: {
        fontSize: typography.fontSize.paragraph,
        fontWeight: typography.fontWeight.regular,
      },
      paragraph1: {
        fontSize: typography.fontSize.paragraph,
        fontWeight: typography.fontWeight.semibold,
      },

      label: {
        fontSize: typography.fontSize.label,
        fontWeight: typography.fontWeight.regular,
      },
      helperText: {
        fontSize: typography.fontSize.helperText,
        fontWeight: typography.fontWeight.regular,
      },
      helperTextSmall: {
        fontSize: typography.fontSize.helperTextSmall,
        fontWeight: typography.fontWeight.regular,
      },
      buttonLarge: {
        fontSize: typography.fontSize.buttonLarge,
        fontWeight: typography.fontWeight.semibold,
      },
      buttonMedium: {
        fontSize: typography.fontSize.buttonMedium,
        fontWeight: typography.fontWeight.semibold,
      },
      buttonSmall: {
        fontSize: typography.fontSize.buttonSmall,
        fontWeight: typography.fontWeight.semibold,
      },
      avatar: {
        fontSize: typography.fontSize.body1,
        fontWeight: typography.fontWeight.semibold,
      },
    },
  },
  spacing: (factor) => `${factor * 8}px`,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      mobile: 768, // Mobile breakpoint
    },
  },
  components: {
    // Mobile-optimized button component
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 48, // Touch-friendly minimum height
          fontSize: '16px', // Prevent zoom on iOS
          '@media (max-width: 768px)': {
            minHeight: 48,
            padding: '12px 24px',
            fontSize: '16px',
          },
        },
      },
    },
    // Mobile-optimized text field
    MuiTextField: {
      styleOverrides: {
        root: {
          '@media (max-width: 768px)': {
            '& .MuiInputBase-input': {
              fontSize: '16px', // Prevent zoom on iOS
            },
          },
        },
      },
    },
    // Mobile-optimized card
    MuiCard: {
      styleOverrides: {
        root: {
          '@media (max-width: 768px)': {
            margin: '8px',
            borderRadius: '12px',
          },
        },
      },
    },
  },
  zIndex: zIndex,
});

// Create dynamic MUI theme based on dark mode preference
export const createDynamicTheme = (isDarkMode = true) => {
  return createTheme({
    palette: /** @type {any} */ ({
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: colors.primary.main,
        contrastText: isDarkMode ? colors.dark.text.button.onPrimary : '#ffffff',
      },
      success: {
        main: colors.success.main,
        contrastText: '#ffffff',
      },
      warning: {
        main: colors.warning.main,
        contrastText: '#000000',
      },
      error: {
        main: colors.error.main,
        contrastText: '#ffffff',
      },
      info: {
        main: colors.info.main,
        contrastText: '#ffffff',
      },
      text: isDarkMode ? {
        primary: colors.dark.text.heading,
        secondary: colors.dark.text.subheading,
        disabled: colors.dark.text.helper.disabled,
      } : colors.text,
      background: isDarkMode ? {
        default: colors.dark.background.page,
        paper: colors.dark.background.card,
        topnav: colors.dark.background.topnav,
      } : colors.background,
      divider: isDarkMode ? colors.dark.stroke.divider : '#e0e0e0',
      // Custom palette properties
      custom: isDarkMode ? {
        background: {
          page: colors.dark.background.page,
          layer2: colors.dark.background.layer2,
          popup: colors.dark.background.popup,
          topnav: colors.dark.background.topnav,
          helper: colors.dark.background.helper,
          card: colors.dark.background.card,
          notificationAlt: colors.dark.background.notificationAlt,
        },
        button: {
          primary: colors.dark.background.button.primary,
          disabled: colors.dark.background.button.disabled,
        },
        text: {
          body: colors.dark.text.body,
          heading: colors.dark.text.heading,
          subtext: colors.dark.text.subtext,
          subheading: colors.dark.text.subheading,
          disabled: colors.dark.text.helper.disabled,
          paragraph: colors.dark.text.paragraph,
          label: colors.dark.text.label,
          helperEnabled: colors.dark.text.helper.enabled,
          helperDisabled: colors.dark.text.helper.disabled,
          buttonOnPrimary: colors.dark.text.button.onPrimary,
          buttonOnSecondary: colors.dark.text.button.onSecondary,
          buttonOnDisabled: colors.dark.text.button.onDisabled,
        },
        stroke: {
          divider: colors.dark.stroke.divider,
          outlineSecondary: colors.dark.stroke.outline.secondary,
          outlineActive: colors.dark.stroke.outline.active,
          outlineDisabled: colors.dark.stroke.outline.disabled,
          textField: colors.dark.stroke.textField,
        },
        icon: {
          disabled: colors.dark.icon.disabled,
          active: colors.dark.icon.active,
          primary: colors.dark.icon.primary,
        },
      } : {
        background: {
          layer2: colors.background.paper,
          popup: colors.background.default,
          topnav: colors.background.default,
          helper: colors.background.paper,
          notificationAlt: colors.background.paper,
        },
        button: {
          primary: colors.primary.main,
          disabled: colors.text.disabled,
        },
        text: {
          body: colors.text.primary,
          paragraph: colors.text.secondary,
          label: colors.text.primary,
          helperEnabled: colors.text.secondary,
          helperDisabled: colors.text.disabled,
          buttonOnPrimary: '#ffffff',
          buttonOnSecondary: '#ffffff',
          buttonOnDisabled: colors.text.disabled,
        },
        stroke: {
          outlineSecondary: '#e0e0e0',
          outlineActive: '#333333',
          outlineDisabled: '#cccccc',
        },
        icon: {
          disabled: colors.text.disabled,
          active: colors.text.primary,
          primary: colors.primary.main,
        },
      },
    }),
    ...getCommonThemeConfig(),
  });
};

// Automatically inject custom styling into head for tailwind compatibility
const injectThemeStyles = () => {
  if (typeof document === 'undefined') return;

  // Check if style block is already present
  if (document.getElementById('sort-my-scene-theme')) return;

  const css = `
    :root {
      /* Backgrounds */
      --bg-primary: ${colors.dark.background.page};
      --bg-surface: ${colors.dark.background.layer2};
      --bg-card: ${colors.dark.background.card};

      /* Accents */
      --accent-purple: ${colors.accent.purple};
      --accent-cyan: ${colors.accent.cyan};

      /* Text */
      --text-primary: ${colors.dark.text.heading};
      --text-secondary: ${colors.dark.text.subheading};
      --text-muted: ${colors.dark.text.helper.disabled};

      /* Seat Status */
      --seat-available: ${colors.seats.available};
      --seat-available-border: ${colors.seats.availableBorder};
      --seat-selected: ${colors.seats.selected};
      --seat-selected-glow: ${colors.seats.selectedGlow};
      --seat-reserved: ${colors.seats.reserved};
      --seat-reserved-glow: ${colors.seats.reservedGlow};
      --seat-booked: ${colors.seats.booked};

      /* Timer */
      --timer-safe: ${colors.success.main};
      --timer-warning: ${colors.warning.main};
      --timer-danger: ${colors.error.main};

      /* Core shadcn overrides to map to our premium dark theme variables */
      --background: ${colors.dark.background.page};
      --foreground: ${colors.dark.text.heading};
      
      --card: ${colors.dark.background.card};
      --card-foreground: ${colors.dark.text.heading};
      
      --popover: ${colors.dark.background.layer2};
      --popover-foreground: ${colors.dark.text.heading};
      
      --primary: ${colors.accent.cyan};
      --primary-foreground: ${colors.dark.background.page};
      
      --secondary: ${colors.seats.available};
      --secondary-foreground: ${colors.dark.text.heading};
      
      --muted: ${colors.dark.background.layer2};
      --muted-foreground: ${colors.dark.text.subheading};
      
      --accent: ${colors.seats.available};
      --accent-foreground: ${colors.accent.cyan};
      
      --destructive: ${colors.error.main};
      --destructive-foreground: ${colors.dark.text.heading};
      
      --border: ${colors.dark.stroke.outline.secondary};
      --input: ${colors.dark.stroke.outline.secondary};
      --ring: ${colors.accent.cyan};
      
      --radius: 0.75rem;
    }

    body {
      background: var(--bg-primary);
      color: var(--text-primary);
      font-family: ${typography.fontFamily};
      min-height: 100vh;
    }

    /* Keyframe Animations */
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes timerPulse {
      0%, 100% { box-shadow: 0 0 5px rgba(239, 68, 68, 0.2); }
      50% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.6); }
    }

    @keyframes glow {
      0%, 100% { box-shadow: 0 0 5px rgba(168, 85, 247, 0.2); }
      50% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.6); }
    }

    /* Custom Animation classes */
    .animate-pulse-custom {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .animate-slide-in {
      animation: slideIn 0.3s ease-out forwards;
    }

    .animate-fade-in {
      animation: fadeIn 0.4s ease-out forwards;
    }

    .animate-timer-pulse {
      animation: timerPulse 1.5s infinite;
    }

    .animate-glow {
      animation: glow 2s infinite;
    }

    /* Responsive booking layout */
    @media (min-width: 768px) {
      .booking-layout {
        display: flex;
        flex-direction: row;
        gap: 1.5rem;
      }
      .booking-main {
        width: 60%;
      }
      .booking-sidebar {
        width: 40%;
      }
    }

    @media (max-width: 767px) {
      .booking-layout {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .booking-main {
        width: 100%;
      }
      .booking-sidebar {
        width: 100%;
      }
    }
  `;

  const style = document.createElement('style');
  style.id = 'sort-my-scene-theme';
  style.textContent = css;
  document.head.appendChild(style);
};

// Run style injection
injectThemeStyles();

// Default export is the dynamic theme (dark mode by default)
export default createDynamicTheme(true);
