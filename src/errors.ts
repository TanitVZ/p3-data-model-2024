import type { ErrorRequestHandler, RequestHandler } from "express";
import { send } from "./response";
import type { ZodError } from "zod";

const zodErrorMessage = (err: ZodError): string => {
  const [firstIssue] = err.issues;
  // console.log(err.issues);
  const { code, path, message } = firstIssue;
  // console.log(`Zod error:${code}`);
  switch (code) {
    case "too_small": {
      return `${path[0]} massa petit.`;
    }
    case "too_big": {
      return `${path[0]} massa gran.`;
    }
    case "invalid_string": {
      return `${message}.`;
    }
    case "invalid_type": {
      return `${path[0]} ${message}.`;
    }
    case "custom": {
      return `${message}.`;
    }
    default: {
      return `Input data is wrong.`;
    }
  }
};

export const defaultErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  //console.log(err.name);
  //console.log(err);
  switch (err.name) {
    case "NotFoundError":
      return send(res).notFound();
    case "ZodError":
      // return send(res).badRequest(zodErrorMessage(err));
      return send(res).badRequest(zodErrorMessage(err));
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
