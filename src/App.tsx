import "./App.css";
import { RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createAppRouter } from "./routes/Router";
import './i18n/config';

const App = () => {
  const router = createAppRouter();

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

export default App;
