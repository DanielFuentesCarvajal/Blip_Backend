// src/infrastructure/mapper/PostMapper.ts
import { posts as PrismaPost } from "@prisma/client/wasm";
import Post from "../../../domain/post/Post";
import IPost from "../../../domain/interfaces/IPost";

export default interface IPostMapper {
   toDomain(prismaPost: PrismaPost): Post;
   toPrisma(domainPost: Post): PrismaPost;
   InterfaceToDomain(ipost: IPost): Post;
   DomainToInterface(post: Post): IPost ;
}