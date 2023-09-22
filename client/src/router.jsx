import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./screens/Home";
import Photo from "./screens/Photo";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Logout from "./components/Logout";
import Posts from "./screens/Posts";
import Upload from "./screens/upload";
// import Detail from "./components/Detail";
import Todo from "./components/Todo/Todo";
import Slide from "./components/Slide/Slide";
import Detail from "./components/Detail";

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
            path: "/",
            element: <Slide />,
          },
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
            path: "/users/:shortId",
            element: <Profile />,
            children: [
              {
                path: "/users/:shortId/todo",
                element: <Todo />,
              },
            ],
          },
          {
            path: "/logout",
            element: <Logout />,
          },
          // url /board에서 /posts로 변경 api와 같은 url로 변경
          {
            path: "/posts",
            element: <Posts />,
            children: [
              {
                path: "/posts/:shortId",
                element: <Detail />,
              },
            ],
          },
          {
            path: "/upload",
            element: <Upload />,
          },
        ],
      },
    ],
  },
]);

export default router;
