import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#ae3f3d" },
    secondary: { main: "#3d3d3d" },
    background: { default: "#f4f6f8" },
  },
  typography: { fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif' },
});
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#E64A19" }, // A slightly brighter red for dark backgrounds
    secondary: { main: "#536dfe" },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
  },
  typography: { fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif' },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
  },
});
export default theme;
