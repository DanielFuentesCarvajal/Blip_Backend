// src/infrastructure/mapper/PostMapper.ts

import IPost from "../../../domain/interfaces/IPost";
import { posts as PrismaPost } from "@prisma/client/wasm";


export interface IPostMapper {
  toDomain(prismaPost: PrismaPost): IPost;
  toPrisma(domainPost: IPost): PrismaPost;
}