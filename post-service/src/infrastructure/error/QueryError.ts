export class QueryError extends Error {
    constructor(query: string, reason?: string) {
      super(`Query failed: "${query}"${reason ? ` - ${reason}` : ''}`);
      this.name = 'QueryError';
    }
  }
  