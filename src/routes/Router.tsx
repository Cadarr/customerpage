// src/routes/index.tsx oder einen ähnlichen Pfad

import { createBrowserRouter } from "react-router-dom";
import Root from "./../pages/RootPage";
import ErrorPage from "./../pages/ErrorPage";
import CustomerListPage from "./../pages/CustomerListPage";
import EditCustomerPage from "./../pages/EditCustomerPage";
import CreateCustomerPage from "./../pages/CreateCustomerPage";

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <CustomerListPage />,
        },
        {
          path: "createCustomer",
          element: <CreateCustomerPage />,
        },
        {
          path: "editCustomer/:customerId",
          element: <EditCustomerPage />,
        },
      ],
    },
  ]);
