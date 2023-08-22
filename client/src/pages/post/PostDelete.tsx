import { Form, useParams } from "react-router-dom";

const PostDelete = () => {
  const { postId } = useParams();

  return (
    <>
      <h1>Post Delete</h1>
      <Form action={`/delete/${postId}`} method="POST">
        <p>Are you sure to delete?</p>
        <button type="submit">Submit</button>
      </Form>
    </>
  );
};

export default PostDelete;
