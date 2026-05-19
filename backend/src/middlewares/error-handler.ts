import { NextFunction, Request, Response } from 'express';

export default function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const { statusCode = 500, message } = err;

  const finalMessage = statusCode === 500
    ? 'На сервере произошла ошибка'
    : message;

  res.status(statusCode).send({ message: finalMessage });
}
