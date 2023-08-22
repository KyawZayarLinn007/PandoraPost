import { Form, useLoaderData } from "react-router-dom";

const Home = () => {
  const posts = useLoaderData();
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
