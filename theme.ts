import { extendTheme, Theme } from "@mui/joy/styles";
import { experimental_extendTheme as extendMuiTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

export const joyTheme: Theme = extendTheme({
  fontFamily: {
    body: "Poppins",
    display: "Poppins",
    fallback: "sans-serif",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBorder: "crimson",
          solidActiveBorder: "crimson",
          solidActiveColor: "crimson",
          solidActiveBg: "#E8153F",
          solidBg: "crimson",
          solidHoverBg: "#E8153F",
          solidDisabledBg: "#B61B32",
          solidDisabledBorder: "#B61B32",
          solidDisabledColor: "#B61B32",

          softColor: "crimson",
          softBg: "#ffedee",
          softHoverBg: "#ffdedf",
          softActiveBg: "#ffdedf",

          outlinedBorder: "crimson",
          outlinedColor: "crimson",

          plainColor: "crimson",
        },
        danger: {
          plainColor: "crimson",
        },
        info: {
          outlinedColor: "#0c68dc",
          outlinedBorder: "#0c68dc",
          outlinedHoverBorder: "#0c68dc",
          outlinedHoverBg: "#e9f5ff",
          plainColor: "#0c68dc",
          softColor: "#0c68dc",
          softBg: "#e9f5ff",
          softHoverBg: "#e9f5ff",
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
        },
      },
    },
    JoyCard: {
      styleOverrides: {
        root: {
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;",
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
        root: { fontSize: "1rem", marginBottom: "10px" },
      },
    },
    JoyAlert: {
      styleOverrides: {
        root: { fontWeight: "400" },
      },
    },
    JoySelect: {
      styleOverrides: {
        button: { fontFamily: "Poppins" },
        listbox: { backgroundColor: "#ffffff" },
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
          backgroundColor: "#EEEFF0",
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
