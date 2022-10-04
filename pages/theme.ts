import { extendTheme, Theme } from "@mui/joy/styles";

export const theme: Theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: "#D2883D",
          outlinedBorder: "#D2883D",
          outlinedColor: "#D2883D",
        },
      },
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          // borderRadius: "9999px",
          fontWeight: "400",
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
  },
});
