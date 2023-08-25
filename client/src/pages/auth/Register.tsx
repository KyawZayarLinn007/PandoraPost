import { Form, useActionData } from "react-router-dom";

const Register = () => {
  const message = useActionData();

  return (
    <>
      <h1>Register</h1>
      {message ? (
        <div className="alert alert-error">
          <img
            src="/error.svg"
            className="stroke-current shrink-0 h-6 w-6"
            alt="error"
          />
          <span>{`${message}`}</span>
        </div>
      ) : (
        <div></div>
      )}
      <Form action="/register" method="POST">
        <label>
          Enter username
          <input type="text" name="username" id="username" />
        </label>
        <br />
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
        <label>
          Enter confirm password
          <input type="text" name="confirm_password" id="confirm_password" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </Form>
    </>
  );
};

export default Register;
