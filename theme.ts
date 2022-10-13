import { extendTheme, Theme } from "@mui/joy/styles";

export const theme: Theme = extendTheme({
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

          outlinedBorder: "crimson",
          outlinedColor: "crimson",

          plainColor: "crimson",
        },
        danger: {
          plainColor: "crimson",
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
        root: { fontSize: "0.95rem", marginBottom: "10px" },
      },
    },
  },
});
