import { redirect } from "react-router-dom";
import { axiosResponse } from "../interfaces/axiosResponse";
import fetchAPI from "../util/fetchAPI";
import handleError from "../util/handleError";
import { env } from "../util/environment";

export async function LoginAction({ request }: { request: Request }) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetchAPI(`${env.VITE_APP_API_URL}/auth/login`, "POST", {
        email, password
    }) as axiosResponse;

    const error = res.error;
    if (error) {
        if (error.status === 400) {
            return error.message;
        } else {
            const url = handleError(error);
            return redirect(url!);
        }
    } else {
        return redirect("/");
    }
}

export async function LogoutAction() {
    const res = await fetchAPI(`${env.VITE_APP_API_URL}/auth/logout`, "POST", {}) as axiosResponse;

    if (res.error) {
        const url = handleError(res.error);
        return redirect(url!);
    } else {
        return redirect("/login");
    }
}

export async function RegisterAction({ request }: { request: Request }) {
    const formData = await request.formData();
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirm_password = formData.get("confirm_password");

    const res = await fetchAPI(`${env.VITE_APP_API_URL}/auth/register`, "POST", {
        username, email, password, confirm_password
    }) as axiosResponse;

    const error = res.error;
    if (error) {
        if (error.status === 400) {
            return error.message;
        } else {
            const url = handleError(error);
            return redirect(url!);
        }
    } else {
        return redirect("/");
    }
}