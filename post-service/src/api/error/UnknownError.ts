export class UnknownError extends Error {
    constructor(message: string = 'Unknown error occurred') {
      super(message);
      this.name = 'UnknownError';
    }
  }
  