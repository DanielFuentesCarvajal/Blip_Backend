export class ValidationError extends Error {
    constructor(message: string = 'Invalid input') {
      super(message);
      this.name = 'ValidationError';
    }
  }
  