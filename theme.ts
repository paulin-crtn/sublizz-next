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
          solidBg: "crimson",
          outlinedBorder: "crimson",
          outlinedColor: "crimson",
        },
      },
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          borderRadius: "9999px",
          fontWeight: "400",
        },
      },
    },
    JoyChip: {
      styleOverrides: {
        root: {
          borderRadius: "5px",
        },
      },
    },
    JoyModalDialog: {
      styleOverrides: {
        root: {
          width: "100%",
          maxWidth: "500px",
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
