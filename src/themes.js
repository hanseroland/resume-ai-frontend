import { createTheme } from "@mui/material/styles";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#1388d5" },
          secondary: { main: "#80b1d0" },
          background: { default: "#ffffff", paper: "#f5f5f5" },
          text: { primary: "#000", secondary: "#444" },
          gradient: "linear-gradient(208deg, #1388d5 0%, #80b1d0 50%)", // Gradient Light
        }
        
      : {
          primary: { main: "#1388d5" },
          secondary: { main: "#80b1d0" },
          background: { default: "#000", paper: "#121212" },
          text: { primary: "#fff", secondary: "#aaa" },
          gradient: "linear-gradient(208deg, #1388d5 0%, #80b1d0 50%)", // Gradient Dark
        }),
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h6: {
      fontWeight: "bold",
    },
  },
});

export const createCustomTheme = (mode) => createTheme(getDesignTokens(mode));
