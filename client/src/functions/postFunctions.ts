import { redirect } from "react-router-dom";
import { axiosResponse } from "../interfaces/axiosResponse";
import fetchAPI from "../util/fetchAPI";
import handleError from "../util/handleError";

const env = import.meta.env;

export async function HomeLoader() {
    const res = await fetchAPI(`${env.VITE_APP_API_URL}/posts`, "GET", {}) as axiosResponse;
    if (res.error) {
        const url = handleError(res.error);
        return redirect(url!);
    } else {
        return res.data;
    }
}

export async function HomeAction({ request }: { request: Request }) {
    const formData = await request.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    //TODO get auth user id
    const user_id = 1;

    const res = await fetchAPI(`${env.VITE_APP_API_URL}/posts`, "POST", {
        title,
        content,
        user_id,
    }) as axiosResponse;

    if (res.error) {
        const url = handleError(res.error);
        return redirect(url!);
    } else {
        return redirect("/");
    }
}