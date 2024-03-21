import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import Root from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import CustomerListPage from "./pages/CustomerListPage";
import EditCustomerPage from "./pages/EditCustomerPage";
import CreateCustomerPage from "./pages/CreateCustomerPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element:  <CustomerListPage />,
        },
        {
          path: "createcustomer",
          element:  <CreateCustomerPage />,
        },
        {
          path: "editcustomer/:customerId",
          element:  <EditCustomerPage />,
        },
      ],
    },
  ]);

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

export default App;
export default App;
