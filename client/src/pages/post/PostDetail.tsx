import { useLoaderData } from "react-router-dom";

const PostDetail = () => {
    const post = useLoaderData();

    return (
        <>
            <h1>PostDetail</h1>
            {JSON.stringify(post)}
        </>
    );
}

export default PostDetail;