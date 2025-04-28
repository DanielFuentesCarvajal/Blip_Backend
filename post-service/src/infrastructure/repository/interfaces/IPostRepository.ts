import Post from "../../../domain/post/Post";
import RepositoryInterface from "./RepositoryInterface";

export default interface IPostRepository extends RepositoryInterface<number, Post>{}