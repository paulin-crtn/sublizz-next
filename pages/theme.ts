import { extendTheme, Theme } from "@mui/joy/styles";

export const theme: Theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: "#D2883D",
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
    JoyModalDialog: {
      styleOverrides: {
        root: {
          width: "100%",
          maxWidth: "500px",
        },
      },
    },
  },
});
