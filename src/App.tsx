import "./App.css";
import { RouterProvider } from "react-router-dom";
import { createAppRouter } from "./routes/Router";
import "./i18n/config";
import { ThemeProvider } from "@mui/material/styles";
import defaultTheme from "./theme/theme";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  const router = createAppRouter();

  return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
  );
};

export default App;
