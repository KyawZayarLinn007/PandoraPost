import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "../pages/post/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PostDetail from "../pages/post/PostDetail";
import fetchAPI from "../util/fetchAPI";
import NotFoundPage from "../pages/error/404";
import { axiosResponse } from "../interfaces/axiosResponse";
import ServerError from "../pages/error/500";
import NotAuthorized from "../pages/error/403";
import handleError from "../util/handleError";
import Logout from "../pages/auth/Logout";
import PostUpdate from "../pages/post/PostUpdate";
import PostDelete from "../pages/post/PostDelete";
import { HomeAction, HomeLoader } from "../functions/postFunctions";

const env = import.meta.env;

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
    loader: async ({params}) => {
      const postId = parseInt(params.postId!);

      const res = await fetchAPI(`${env.VITE_APP_API_URL}/posts/${postId}`, "GET", {}) as axiosResponse;

      if(res.error) {
        const url = handleError(res.error);
        return redirect(url!);
      } else {
        return res.data;
      }
    }
  },
  {
    path: "/update/:postId",
    element: <PostUpdate />,
    loader: async ({params}) => {
      const postId = parseInt(params.postId!);

      const res = await fetchAPI(`${env.VITE_APP_API_URL}/posts/${postId}`, "GET", {}) as axiosResponse;

      if(res.error) {
        const url = handleError(res.error);
        return redirect(url!);
      } else {
        return res.data;
      }
    },
    action: async ({request, params}) => {
      const postId = parseInt(params.postId!);

      const formData = await request.formData();
      const title = formData.get("title");
      const content = formData.get("content");

      const res = await fetchAPI(`${env.VITE_APP_API_URL}/posts/${postId}`, "PATCH", {
        title, content
      }) as axiosResponse;

      if(res.error) {
        const url = handleError(res.error);
        return redirect(url!);
      } else {
        return redirect(`/detail/${postId}`);
      }
    }
  },
  {
    path: "/delete/:postId",
    element: <PostDelete />,
    action: async ({params}) => {
      const postId = parseInt(params.postId!);

      const res = await fetchAPI(`${env.VITE_APP_API_URL}/posts/${postId}`, "DELETE", {}) as axiosResponse;

      if(res.error) {
        const url = handleError(res.error);
        return redirect(url!);
      } else {
        return redirect(`/`);
      }
    }
  },
  {
    path: "/login",
    element: <Login />,
    action: async ({request}) => {
      const formData = await request.formData();
      const email = formData.get("email");
      const password = formData.get("password");

      const res = await fetchAPI(`${env.VITE_APP_API_URL}/auth/login`, "POST", {
        email, password
      }) as axiosResponse;

      const error = res.error;
      if(error) {
        if(error.status === 400) {
          return error.message;
        } else {
          const url = handleError(error);
          return redirect(url!);
        }
      } else {
        return redirect("/");
      }
    }
  },
  {
    path: "/logout",
    element: <Logout />,
    action: async () => {
      const res = await fetchAPI(`${env.VITE_APP_API_URL}/auth/logout`, "POST", {}) as axiosResponse;

      if(res.error) {
        const url = handleError(res.error);
        return redirect(url!);
      } else {
        return redirect("/login");
      }
    }
  },
  {
    path: "/register",
    element: <Register />,
    action: async ({request}) => {
      const formData = await request.formData();
      const username = formData.get("username");
      const email = formData.get("email");
      const password = formData.get("password");
      const confirm_password = formData.get("confirm_password");

      const res = await fetchAPI(`${env.VITE_APP_API_URL}/auth/register`, "POST", {
        username, email, password, confirm_password
      }) as axiosResponse;

      const error = res.error;
      if(error) {
        if(error.status === 400) {
          return error.message;
        } else {
          const url = handleError(error);
          return redirect(url!);
        }
      } else {
        return redirect("/");
      }
    }
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
