import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./screens/home";
import Photo from "./screens/Photo";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Logout from "./components/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/photos",
            element: <Photo />,
          },
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/user/:id",
            element: <Profile />,
          },
          {
            path: "/logout",
            element: <Logout />,
          },
        ],
      },
    ],
  },
]);

export default router;
