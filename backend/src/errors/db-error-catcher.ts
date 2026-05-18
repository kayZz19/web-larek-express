import { Error as MongooseError } from 'mongoose';
import { NextFunction } from 'express';
import BadRequestError from './bad-request-error';
import ConflictError from './conflict-error';

const catchMongooseErrors = (error: unknown, next: NextFunction): boolean => {
  if (error instanceof MongooseError.ValidationError) {
    next(new BadRequestError(error.message));
    return true;
  }

  if (error instanceof Error && error.message.includes('E11000')) {
    next(new ConflictError('Продукт с таким названием уже существует'));
    return true;
  }

  return false;
};

export default catchMongooseErrors;
