export class ConnectionError extends Error {
    constructor(message = 'Database connection failed') {
      super(message);
      this.name = 'ConnectionError';
    }
  }
  