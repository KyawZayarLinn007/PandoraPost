import { Form, useActionData } from "react-router-dom";

const Login = () => {
  const message = useActionData();

  return (
    <>
      <h1>Login</h1>
      {message ? message : ""}
      <Form action="/login" method="POST">
        <label>
          Enter email
          <input type="text" name="email" id="email" />
        </label>
        <br />
        <label>
          Enter password
          <input type="text" name="password" id="password" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </Form>
    </>
  );
};

export default Login;
