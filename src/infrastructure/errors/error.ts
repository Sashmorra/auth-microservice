class ApiError extends Error {
    status: number;
    message: string;

    constructor(message: string, status: number) {
        super(message);
        this.message = message;
        this.status = status;
    }
}
const BadRequest = (message: string) => {
    return new ApiError(message, 400);
};
const Unauthorized = (message: string) => {
    return new ApiError(message, 401);
}


export { ApiError, BadRequest, Unauthorized };
