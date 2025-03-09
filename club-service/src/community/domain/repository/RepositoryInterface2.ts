export default interface Repository2<E, T> {
  findAll: () => Promise<T[]>
  findById: (id: E) => Promise<T[]>
  save: (item: T) => void
  update: (id: E, item: T) => Promise<void>
  delete: (id: E) => Promise<boolean>
}