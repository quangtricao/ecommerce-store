import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Products from "../pages/Products";
import Profile from "../pages/Profile";
import ErrorPage from "../pages/ErrorPage";

import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <Product />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
