import type { ErrorRequestHandler, RequestHandler } from "express";
import { send } from "./response";
import type { ZodError } from "zod";



export const defaultErrorHandler: ErrorRequestHandler = (
    err,
    req,
    res,
    next
  ) => {
  console.log(err.name);
    switch (err.name) {
      case "NotFoundError":
        return send(res).notFound();
      case "ZodError":
        return send(res).badRequest(`Bad request`);
      default:
        return send(res).internalError(`Internal error.`);
    }
  };
  
  export const catchErrors =
    (myHandler: RequestHandler): RequestHandler =>
    async (req, res, next) => {
      try {
        console.log("estic a errors");
          await myHandler(req, res, next);
      } catch (e) {
          next(e);
      }
    };