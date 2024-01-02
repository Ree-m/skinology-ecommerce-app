import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#467fcf",
      dark: "#1256ec",

    },
    secondary: {
      main: '#0000FF'
    },
    warning: {
      main: "#ffc107",
    },
    error: {
      main: "#dc3545",
    },
    success: {
      main: "#28a745",
    },
    info: {
      main: "#17a2b8",
    },
    text: {
      primary: "#495057",
      secondary: "#627283",
    },

  },
  components: {
    MuiMenu: {
      styleOverrides: {
        list: {
          maxHeight: "50vh",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: 0,

        },
        input: {
          padding: "0.375rem 0.75rem 0.375rem 0.75rem",
          color: "#495057",

        },
        notchedOutline: {
          borderColor: "rgba(0,40,100,.12)",
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          paddingBottom: "1px",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          padding: 0,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          marginBottom: "0.375rem",
          fontWeight: 600,
          color: "#495057",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          color: "#495057",
          fontSize: ".875rem",
          '.Mui-checked': {
            color: 'blue',
          }
        },


      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "#656d77",
          lineHeight: 1.3333333,
          margin: "0.75rem 0 0.25rem 0",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
        contained: {
          ":disabled": {
            color: "#fff",
            backgroundColor: "#467fcf",
            opacity: 0.65,
          },
        },
        outlined: {
          border: "1px solid rgba(0,40,100,.12)",
          background: "#ffffff",
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          backgroundColor: "#e9ecef",
          padding: "0.75rem 1rem",
          marginBottom: 16,
          borderRadius: "3px",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& th": {
            color: "#9aa0ac",
            textTransform: "uppercase",
            fontSize: ".875rem",
            fontWeight: 400,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "0.5rem 0.75rem",
          "&:first-of-type": {
            paddingLeft: "1.5rem",
          },
          "&:last-of-type": {
            paddingRight: "1.5rem",
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "0.5rem 1.5rem",
          borderBottom: "1px solid rgba(0,40,100,.12)",
          minHeight: "3.5rem",
        },
        title: {
          color: "#000",
          fontSize: "1.125rem",
          lineHeight: 1.2,
          fontWeight: 400,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "1.5rem",
        },
      },
    },
  },
  typography: {
    // used robototo instead
    // fontFamily: "geomanist",
  },
});

export default theme;
