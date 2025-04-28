export class TimeoutError extends Error {
    constructor(service: string) {
      super(`${service} timed out`);
      this.name = 'TimeoutError';
    }
  }
  