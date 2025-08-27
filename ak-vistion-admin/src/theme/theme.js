import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#ae3f3d" },
    secondary: { main: "#3d3d3d" },
    background: { default: "#f4f6f8" },
  },
  typography: { fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif' },
});

export default theme;
