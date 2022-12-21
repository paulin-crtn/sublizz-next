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
  main: "#3fb8ac", // "#4700CC"
  lighter: "#44C7BC",
  darker: "#33968E",
  soft: "#FAFFFA",
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
    fallback: "Helvetica",
  },
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          solidBorder: PRIMARY_COLORS.main,
          solidActiveBorder: PRIMARY_COLORS.main,
          solidActiveColor: PRIMARY_COLORS.main,
          solidActiveBg: PRIMARY_COLORS.darker,
          solidBg: PRIMARY_COLORS.main,
          solidHoverBg: PRIMARY_COLORS.darker,
          solidDisabledBg: PRIMARY_COLORS.darker,
          solidDisabledBorder: PRIMARY_COLORS.darker,
          solidDisabledColor: PRIMARY_COLORS.darker,

          softColor: "#000000",
          softBg: "#ffffff",
          softDisabledBg: "#ffffff",
          softHoverBg: PRIMARY_COLORS.soft,
          softActiveBg: PRIMARY_COLORS.soft,

          outlinedBorder: PRIMARY_COLORS.main,
          outlinedColor: PRIMARY_COLORS.main,
          outlinedHoverBg: "#ffffff",
          outlinedHoverBorder: PRIMARY_COLORS.main,

          plainColor: PRIMARY_COLORS.main,
          plainBg: PRIMARY_COLORS.main,
          plainHoverBg: PRIMARY_COLORS.main,
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
        button: { fontFamily: poppins.style.fontFamily },
      },
    },
    JoyOption: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#42454D", // Same as default JoySelect
          },
        },
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
          backgroundColor: "#272930",
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
