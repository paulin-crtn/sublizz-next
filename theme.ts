/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { extendTheme, Theme } from "@mui/joy/styles";
import { experimental_extendTheme as extendMuiTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { poppins } from "./utils/nextFont";

/* -------------------------------------------------------------------------- */
/*                                    THEME                                   */
/* -------------------------------------------------------------------------- */
export const joyTheme: Theme = extendTheme({
  fontFamily: {
    body: poppins.style.fontFamily,
    display: poppins.style.fontFamily,
    fallback: "Helvetica",
  },
  colorSchemes: {
    dark: {
      palette: {
        text: {
          secondary: "#ffffff",
        },
        background: {
          surface: "#110a24",
        },
        neutral: {
          50: "#ffffff",
          100: "#ffffff",
          200: "#f0eaff",
          300: "#E4D9FF",
          400: "#1a8cff",
          500: "#966bfe",
          600: "#5916fe",
          700: "#4401e9",
          800: "#2b0194",
          900: "#060015",
          darkChannel: "#060015", // Background outside modal

          solidBg: "#231c36", // Radio + Input + TextArea
          solidHoverBg: "#231c36", // Select
        },
        info: {
          50: "#ffffff",
          100: "#ffffff",
          200: "#ffffff",
          300: "#ffffff",
          400: "#ffffff",
          500: "#ffffff",
          600: "#ffffff",
          700: "#ffffff",
          800: "#ffffff",
          900: "#ffffff",

          solidColor: "#000000",
          solidHoverBg: "#eeeeee",

          softColor: "#000000",
          softHoverBg: "#eeeeee",

          outlinedHoverColor: "#000000",
        },
        primary: {
          solidBg: "#4401e9", // Radio (hover & checked)
          solidHoverBg: "#4401e9", // Radio (hover & checked)
          plainHoverBg: "#4401e9", // Select (option)
        },
      },
    },
  },
  components: {
    JoyTypography: {
      styleOverrides: {
        root: {
          padding: "0",
        },
      },
    },
    JoyButton: {
      styleOverrides: {
        root: {
          fontWeight: "400",
        },
      },
    },
    JoyInput: {
      defaultProps: {
        variant: "soft",
      },
      styleOverrides: {
        root: (theme) => ({
          backgroundColor:
            theme.theme.colorSchemes.dark.palette.neutral.solidBg,
          "& > input": {
            width: "100%", // Fix input not shrinking in flex
          },
        }),
      },
    },
    JoyTextarea: {
      defaultProps: {
        variant: "soft",
      },
      styleOverrides: {
        root: (theme) => ({
          backgroundColor:
            theme.theme.colorSchemes.dark.palette.neutral.solidBg,
        }),
      },
    },
    JoyChip: {
      styleOverrides: {
        root: {},
      },
    },
    JoyModalDialog: {
      styleOverrides: {
        root: {
          width: "100%",
          maxWidth: "500px",
          maxHeight: "95vh",
          overflowY: "auto",
          borderWidth: "3px",
        },
      },
    },
    JoyFormControl: {
      styleOverrides: {
        root: {
          marginBottom: "20px",
        },
      },
    },
    JoyFormLabel: {
      styleOverrides: {
        root: { fontSize: "1.05rem", marginBottom: "10px" },
      },
    },
    JoyAlert: {
      styleOverrides: {
        root: { fontWeight: "400" },
      },
    },
    JoySelect: {
      styleOverrides: {
        button: { fontFamily: poppins.style.fontFamily },
        listbox: (theme) => ({
          backgroundColor: theme.theme.colorSchemes.dark.palette.neutral[900],
        }),
      },
    },
    JoyOption: {
      styleOverrides: {
        root: (theme) => ({
          "&:hover": {
            backgroundColor: theme.theme.colorSchemes.dark.palette.neutral[800],
          },
        }),
      },
    },
    JoyRadio: {
      styleOverrides: {
        root: {
          paddingTop: "10px",
          paddingRight: "15px",
          paddingBottom: "10px",
          paddingLeft: "15px",
        },
        action: (theme) => ({
          borderRadius: "5px",
        }),
      },
    },
    JoySvgIcon: {
      styleOverrides: {
        root: { margin: 0 }, // JoyAvatar default icons
      },
    },
    JoyMenu: {
      styleOverrides: {
        root: (theme) => ({
          backgroundColor:
            theme.theme.colorSchemes.dark.palette.background.surface,
        }),
      },
    },
    JoyMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem",
          paddingLeft: "20px",
          paddingRight: "60px",
        },
      },
    },
    JoyListItemDecorator: {
      styleOverrides: {
        root: { color: "inherit" },
      },
    },
    JoyAvatar: {
      defaultProps: {
        variant: "solid",
      },
      styleOverrides: {
        root: {
          backgroundColor: "#eeeeee",
          color: "#000000",
          borderRadius: "8px",
        },
      },
    },
    JoyCircularProgress: {
      defaultProps: {
        thickness: 3,
      },
    },
    JoyCard: {
      styleOverrides: {
        root: { borderWidth: "3px" },
      },
    },
  },
});

const muiTheme = extendMuiTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: "40px",
          fontSize: "0.95rem",
          backgroundColor: "#231c36",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          "&.Mui-error": {
            backgroundColor: "#FFE9E8",
          },
        },
        notchedOutline: {
          border: 0,
        },
      },
    },
  },
});

export const theme = deepmerge(muiTheme, joyTheme);
