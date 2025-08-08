import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
    details: err.details || null,
  });
};

export default globalErrorHandler;
