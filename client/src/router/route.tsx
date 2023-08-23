import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/post/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PostDetail from "../pages/post/PostDetail";
import NotFoundPage from "../pages/error/404";
import ServerError from "../pages/error/500";
import NotAuthorized from "../pages/error/403";
import Logout from "../pages/auth/Logout";
import PostUpdate from "../pages/post/PostUpdate";
import PostDelete from "../pages/post/PostDelete";
import { DeleteAction, DetailLoader, HomeAction, HomeLoader, UpdateAction } from "../functions/postFunctions";
import { LoginAction, LogoutAction, RegisterAction } from "../functions/authFunctions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: HomeLoader,
    action: HomeAction,
  },
  {
    path: "/detail/:postId",
    element: <PostDetail />,
    loader: DetailLoader,
  },
  {
    path: "/update/:postId",
    element: <PostUpdate />,
    loader: DetailLoader,
    action: UpdateAction,
  },
  {
    path: "/delete/:postId",
    element: <PostDelete />,
    action: DeleteAction,
  },
  {
    path: "/login",
    element: <Login />,
    action: LoginAction,
  },
  {
    path: "/logout",
    element: <Logout />,
    action: LogoutAction,
  },
  {
    path: "/register",
    element: <Register />,
    action: RegisterAction,
  },
  {
    path: "/not-found",
    element: <NotFoundPage />,
  },
  {
    path: "/server-error",
    element: <ServerError />
  },
  {
    path: "/not-authorized",
    element: <NotAuthorized />
  }
]);

export default router;
