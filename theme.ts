import { extendTheme, Theme } from "@mui/joy/styles";
import { experimental_extendTheme as extendMuiTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

export const primaryColor = {
  main: "#4700CC",
  lighter: "#5600F5",
  darker: "#3E00B3",
  soft: "#eeeeff",
};

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
          solidBorder: primaryColor.main,
          solidActiveBorder: primaryColor.main,
          solidActiveColor: primaryColor.main,
          solidActiveBg: primaryColor.lighter,
          solidBg: primaryColor.main,
          solidHoverBg: primaryColor.lighter,
          solidDisabledBg: primaryColor.darker,
          solidDisabledBorder: primaryColor.darker,
          solidDisabledColor: primaryColor.darker,

          softColor: primaryColor.main,
          softBg: "#eeeeff",
          softHoverBg: "#f5f5ff",
          softActiveBg: "#f5f5ff",

          outlinedBorder: primaryColor.main,
          outlinedColor: primaryColor.main,
          outlinedHoverBg: primaryColor.soft,
          outlinedHoverBorder: primaryColor.main,

          plainColor: primaryColor.main,
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
    JoyInput: {
      styleOverrides: {
        root: {
          "& > input": {
            width: "100%", // Fix input not shrinking in flex
          },
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
        button: { fontFamily: "Poppins" },
        listbox: { backgroundColor: "#ffffff" },
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
        action: {
          borderRadius: "5px",
        },
      },
    },
    JoySvgIcon: {
      styleOverrides: {
        root: { margin: 0 }, // JoyAvatar default icons
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
    },
    JoyCircularProgress: {
      defaultProps: {
        thickness: 3,
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
