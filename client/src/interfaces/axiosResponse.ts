type errorType = null | { status: number, message: string };

interface axiosResponse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: null | any;
    error: errorType
}

export type { errorType, axiosResponse }