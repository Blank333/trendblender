import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import App from "./App.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import ManageProducts from "./components/ManageProducts.jsx";
import AdminStatus from "./components/AdminStatus.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPanel />,
    children: [
      {
        path: "",
        element: <AdminStatus />,
      },
      {
        path: "products",
        element: <ManageProducts />,
      },
    ],
  },
]);

export default router;
