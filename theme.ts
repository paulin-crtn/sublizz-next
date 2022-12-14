/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { extendTheme, Theme } from "@mui/joy/styles";
import { experimental_extendTheme as extendMuiTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { poppins } from "./utils/nextFont";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANT                                  */
/* -------------------------------------------------------------------------- */
const PRIMARY_COLORS = {
  main: "#5600F5", // "#4700CC"
  lighter: "#5600F5",
  darker: "#3E00B3",
  soft: "#eeeeff",
};

const INFO_COLORS = {
  main: "#2435ff",
  soft: "#e9f8ff",
};

/* -------------------------------------------------------------------------- */
/*                                    THEME                                   */
/* -------------------------------------------------------------------------- */
export const joyTheme: Theme = extendTheme({
  fontFamily: {
    body: poppins.style.fontFamily,
    display: poppins.style.fontFamily,
    fallback: "sans-serif",
  },
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          solidBorder: PRIMARY_COLORS.main,
          solidActiveBorder: PRIMARY_COLORS.main,
          solidActiveColor: PRIMARY_COLORS.main,
          solidActiveBg: PRIMARY_COLORS.lighter,
          solidBg: PRIMARY_COLORS.main,
          solidHoverBg: PRIMARY_COLORS.lighter,
          solidDisabledBg: PRIMARY_COLORS.darker,
          solidDisabledBorder: PRIMARY_COLORS.darker,
          solidDisabledColor: PRIMARY_COLORS.darker,

          softColor: PRIMARY_COLORS.main,
          softBg: PRIMARY_COLORS.soft,
          softHoverBg: "#f5f5ff",
          softActiveBg: "#f5f5ff",

          outlinedBorder: PRIMARY_COLORS.main,
          outlinedColor: PRIMARY_COLORS.main,
          outlinedHoverBg: PRIMARY_COLORS.soft,
          outlinedHoverBorder: PRIMARY_COLORS.main,

          plainColor: PRIMARY_COLORS.main,
          plainBg: PRIMARY_COLORS.main,
        },
        info: {
          outlinedColor: INFO_COLORS.main,
          outlinedBorder: INFO_COLORS.main,
          outlinedHoverBorder: INFO_COLORS.main,
          outlinedHoverBg: INFO_COLORS.soft,
          plainColor: INFO_COLORS.main,
          softColor: INFO_COLORS.main,
          softBg: INFO_COLORS.soft,
          softHoverBg: INFO_COLORS.soft,
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
