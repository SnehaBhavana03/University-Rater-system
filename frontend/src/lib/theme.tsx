import { createTheme } from "@mui/material";

export const HIGHLIGHTS_COLOR = "#edba32";
export const BACKGROUND_COLOR = "#f4f1e8";

export const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: BACKGROUND_COLOR,
    },
  },
  typography: {
    fontFamily: "Playfair Display Variable",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: `#6b6b6b ${BACKGROUND_COLOR}`,
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: BACKGROUND_COLOR,
          },
        },
      },
    },
  },
});
