import { Params, redirect } from "react-router-dom";
import { axiosResponse } from "../interfaces/axiosResponse";
import fetchAPI from "../util/fetchAPI";
import handleError from "../util/handleError";
import { env } from "../util/environment";

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

export async function DetailLoader({ params }: { params: Params }) {
    const postId = parseInt(params.postId!);

    const res = await fetchAPI(`${env.VITE_APP_API_URL}/posts/${postId}`, "GET", {}) as axiosResponse;

    if (res.error) {
        const url = handleError(res.error);
        return redirect(url!);
    } else {
        return res.data;
    }
}

export async function UpdateAction({ request, params }: { request: Request, params: Params }) {
    const postId = parseInt(params.postId!);

    const formData = await request.formData();
    const title = formData.get("title");
    const content = formData.get("content");

    const res = await fetchAPI(`${env.VITE_APP_API_URL}/posts/${postId}`, "PATCH", {
        title, content
    }) as axiosResponse;

    if (res.error) {
        const url = handleError(res.error);
        return redirect(url!);
    } else {
        return redirect(`/detail/${postId}`);
    }
}

export async function DeleteAction({ params }: { params: Params }) {
    const postId = parseInt(params.postId!);

    const res = await fetchAPI(`${env.VITE_APP_API_URL}/posts/${postId}`, "DELETE", {}) as axiosResponse;

    if (res.error) {
        const url = handleError(res.error);
        return redirect(url!);
    } else {
        return redirect(`/`);
    }
}