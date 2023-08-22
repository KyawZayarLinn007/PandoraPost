import { Form, useLoaderData, useParams } from "react-router-dom";

const PostUpdate = () => {
  const { postId } = useParams();
  const { title, content } = useLoaderData();

  return (
    <>
      <h1>Post Update</h1>
      <Form action={`/update/${postId}`} method="POST">
        <input type="text" name="title" id="title" value={title} />
        <input type="text" name="content" id="content" value={content} />
        <button type="submit">Submit</button>
      </Form>
    </>
  );
};

export default PostUpdate;
