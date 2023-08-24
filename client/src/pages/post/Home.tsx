import { useContext, useEffect } from "react";
import { Form, useLoaderData } from "react-router-dom";
import fetchAPI from "../../util/fetchAPI";
import { env } from "../../util/environment";
import { axiosResponse } from "../../interfaces/axiosResponse";
import { AuthContext } from "../../context/AuthContextProvider";

const Home = () => {
  const posts = useLoaderData();

  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    async function fetchAuth() {
      const res = (await fetchAPI(
        `${env.VITE_APP_API_URL}/auth/verify-auth`,
        "POST",
        {}
      )) as axiosResponse;
      const { data } = res.data as {
        data: null | { id: number; email: string };
      };
      setAuth(data);
    }
    fetchAuth();
  }, [setAuth]);

  return (
    <>
      <h1>Home Page</h1>
      <Form action="/" method="POST">
        <label>
          Enter title
          <input type="text" name="title" id="title" />
        </label>
        <br />
        <label>
          Enter content
          <input type="text" name="content" id="content" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </Form>
      {JSON.stringify(posts)}
    </>
  );
};

export default Home;
