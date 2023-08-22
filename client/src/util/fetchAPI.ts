import axios, { AxiosError } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchAPI = async (url: string, method: string, body: any) => {
    try {
        const response = await axios({
            method,
            url,
            data: body,
            withCredentials: true,
        });
        console.log(`The axios response is `, response);
        return response;
    } catch (error) {
        const err = error as AxiosError;
        console.log(`The axios error is `, err);
        return err.response?.data;
    }
}

export default fetchAPI;