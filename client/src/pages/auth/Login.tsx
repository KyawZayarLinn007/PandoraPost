import { Form, useActionData } from "react-router-dom";

const Login = () => {
  const message = useActionData();

  return (
    <div className="mx-auto w-3/12 mt-12">
      <p className="text-2xl text-center mb-8">Login</p>
      {message ? (
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{ `${message}` }</span>
        </div>
      ) : (
        <div></div>
      )}
      <Form action="/login" method="POST" className="mt-4">
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text">Enter your email</span>
          </label>
          <input
            type="text"
            placeholder="johndoe@gmail.com"
            className="input input-bordered input-accent w-full"
            name="email"
          />
        </div>
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text">Enter your password</span>
          </label>
          <input
            type="password"
            placeholder="example password"
            className="input input-bordered input-accent w-full"
            name="password"
          />
        </div>
        <button className="btn btn-primary w-full mt-2">Submit</button>
      </Form>
    </div>
  );
};

export default Login;
