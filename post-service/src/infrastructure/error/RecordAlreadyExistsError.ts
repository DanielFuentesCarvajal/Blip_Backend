export class RecordAlreadyExistsError extends Error {
    constructor(entity: string) {
      super(`${entity} already exists`);
      this.name = 'RecordAlreadyExistsError';
    }
  }
  