// src/infrastructure/mapper/impl/PostMapperImpl.ts

import { posts as PrismaPost } from "@prisma/client/wasm";
import { IPostMapper } from "./interface/IPostMapper";
import IPost from "../../domain/interfaces/IPost";
import { StatusMapper } from "./StatusMapper";


export class PostMapperImpl implements IPostMapper {
  toDomain(prismaPost: PrismaPost): IPost {
    return {
      id: prismaPost.id,
      idCommunity: prismaPost.id_community,
      idUser: prismaPost.id_user,
      tittle: prismaPost.title,
      body: prismaPost.body,
      media: prismaPost.media,
      status: StatusMapper.toDomainStatus(prismaPost.status),
      postDate: prismaPost.post_date
    };
  }

  toPrisma(domainPost: IPost): PrismaPost{
    return {
      id: domainPost.id,
      id_community: domainPost.idCommunity,
      id_user: domainPost.idUser,
      title: domainPost.tittle,
      body: domainPost.body,
      media: domainPost.media,
      status: domainPost.status ? StatusMapper.toPrismaStatus(domainPost.status) : undefined,
      post_date: domainPost.postDate
    };
  }
}