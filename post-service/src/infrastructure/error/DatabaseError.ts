export class DatabaseError extends Error {
    constructor(message: string = 'Database error', public meta?: unknown) {
      super(message);
      this.name = 'DatabaseError';
    }
  }
  