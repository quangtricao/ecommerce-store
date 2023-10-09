import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout";
import Cart from "../pages/Cart";
import ProductDetail from "../components/ProductDetail";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import ErrorPage from "../pages/ErrorPage";
import SellProduct from "../pages/SellProduct";
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
        element: <Home />,
      },
      {
        path: "/sell",
        element: <SellProduct />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
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
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
