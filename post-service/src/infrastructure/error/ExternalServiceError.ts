export class ExternalServiceError extends Error {
    constructor(serviceName: string, details?: string) {
      super(`Failed to communicate with ${serviceName}${details ? `: ${details}` : ''}`);
      this.name = 'ExternalServiceError';
    }
  }
  