import { errorType } from "../interfaces/axiosResponse";

export default function handleError(error: errorType) {
    if(error) {
        if(error.status === 401) {
            return "/login"
        }
        if(error.status === 403) {
            return "/not-authorized"
        }
        if(error.status === 404) {
            return "/not-found"
        }
        if(error.status === 500) {
            return "/server-error"
        }
    }
}