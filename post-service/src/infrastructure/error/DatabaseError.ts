export class DatabaseError extends Error {
    constructor(message: string = 'Database error', public meta?: any) {
      super(message);
      this.name = 'DatabaseError';
    }
  }
  