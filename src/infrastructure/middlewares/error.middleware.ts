import { ApiError } from "../errors/error";
import { Request, Response, NextFunction } from "express";

type ErrorType = Error | ApiError;

const ErrorMiddleware = (error: ErrorType, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    console.log("handler");
    if(error instanceof ApiError) {
    return res.status(error.status).json({message: error.message});
  }
  return res.status(500).json({message: 'Something went wrong'});
}

export { ErrorMiddleware };
