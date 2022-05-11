import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      message: 'Missing authentication token.',
    });
  }

  const token = authToken.replace('Bearer', '').trim();

  try {
    verify(token, '33779428-f03f-4f4f-929d-b1db7d8441d0');

    return next();
  } catch (error) {
    return response.status(401).json({
      message: 'Invalid token.',
    });
  }
}
