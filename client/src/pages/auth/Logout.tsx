import { Form } from "react-router-dom";

const Logout = () => {
    return ( 
        <>
            <h1>Logout</h1>
            <Form action="/logout" method="POST">
                <p>Are you sure to logout?</p>
                <button type="submit">Logout</button>
            </Form>
        </>
    );
}
 
export default Logout;