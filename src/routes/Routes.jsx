import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/Dashboard";
import Main from "../layouts/Main";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Products from "../pages/Products";
import Register from "../pages/Register";
import ManageCoupons from "../pages/admin/ManageCoupons";
import ManageUsers from "../pages/admin/ManageUsers";
import Statistics from "../pages/admin/Statistics";
import ReportedContents from "../pages/moderator/ReportedContents";
import ReviewQueue from "../pages/moderator/ReviewQueue";
import AddProduct from "../pages/user/AddProduct";
import MyProducts from "../pages/user/MyProducts";
import MyProfile from "../pages/user/MyProfile";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "products",
        element: (
          <PrivateRoutes>
            <Products />
          </PrivateRoutes>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      // admin routes
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-coupons",
        element: <ManageCoupons />,
      },

      // moderator routes
      {
        path: "review-queue",
        element: <ReviewQueue />,
      },
      {
        path: "reported-contents",
        element: <ReportedContents />,
      },

      // user routes
      {
        path: "user-profile",
        element: <MyProfile />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "my-products",
        element: <MyProducts />,
      },
    ],
  },
]);

export default router;
