import ICommentRepository from "./interfaces/ICommentRepository";

export default class CommentRepository implements ICommentRepository {
  findAll(): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  findOneById(id: String): Promise<string> {
    throw new Error("Method not implemented.");
  }
  exists(id: String): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  save(entity: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(id: String, partial: string): Promise<string | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: String): Promise<void> {
    throw new Error("Method not implemented.");
  }
}