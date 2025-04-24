import IPost from "../../../domain/interfaces/IPost";
import RepositoryInterface from "./RepositoryInterface";

export default interface IPostRepository extends RepositoryInterface<number, IPost>{}