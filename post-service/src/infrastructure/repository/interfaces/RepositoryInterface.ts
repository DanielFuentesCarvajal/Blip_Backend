export default interface RepositoryInterface<E, T> {
    findAll(): Promise<T[]>;
    findOneById(id: E): Promise<T | null>;
    exists(id: E): Promise<boolean>;
    save(entity: T): Promise<T>;
    update(id: E, partial: T): Promise <T | null>;
    delete(id: E): Promise<boolean>;
}  