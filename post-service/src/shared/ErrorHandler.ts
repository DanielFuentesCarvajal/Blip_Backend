
import { BadRequestError } from "../api/error/BadRequestError";
import { ValidationError } from "../api/error/ValidationError";
import { UnauthorizedError } from "../api/error/UnauthorizedError";
import { ForbiddenError } from "../api/error/ForbiddenError";
import { NotFoundError } from "../api/error/NotFoundError";
import { ConflictError } from "../api/error/ConflictError";
import { DatabaseError } from "../infrastructure/error/DatabaseError";
import { ExternalServiceError } from "../infrastructure/error/ExternalServiceError";
import { TimeoutError } from "../api/error/TimeoutError";
import { Request, Response, NextFunction } from 'express';
import { ConnectionError } from "../infrastructure/error/ConnectionError";
import { RecordAlreadyExistsError } from "../infrastructure/error/RecordAlreadyExistsError";
import { QueryError } from "../infrastructure/error/QueryError";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ValidationError || err instanceof BadRequestError) {
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(401).json({ message: err.message });
  }

  if (err instanceof ForbiddenError) {
    return res.status(403).json({ message: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message });
  }

  if (err instanceof ConflictError) {
    return res.status(409).json({ message: err.message });
  }

  if (err instanceof DatabaseError) {
    return res.status(500).json({ message: 'Database error', detail: err.message });
  }

  if (err instanceof ExternalServiceError || err instanceof TimeoutError) {
    return res.status(503).json({ message: err.message });
  }

  console.error('Unexpected error:', err);
  return res.status(500).json({ message: 'Internal Server Error' });

  if (err instanceof ConnectionError) {
    return res.status(503).json({ message: err.message });
  }
  
  if (err instanceof RecordAlreadyExistsError) {
    return res.status(409).json({ message: err.message });
  }
  
  if ( err instanceof QueryError) {
    return res.status(500).json({ message: err.message });
  }
  
}


