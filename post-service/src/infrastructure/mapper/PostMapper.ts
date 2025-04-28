// src/infrastructure/mapper/impl/PostMapperImpl.ts

import { posts as PrismaPost } from "@prisma/client/wasm";

import { StatusMapper } from "./StatusMapper";
import Post from "../../domain/post/Post";
import IPost from "../../domain/interfaces/IPost";
export default class PostMapper /*implements IPostMapper*/ {

  static toDomain(prismaPost: PrismaPost): Post {
    return new Post({
      id: prismaPost.id,
      idCommunity: prismaPost.id_community,
      idUser: prismaPost.id_user,
      tittle: prismaPost.title, 
      body: prismaPost.body,
      postDate: prismaPost.post_date,
      media: prismaPost.media,
      status: StatusMapper.toDomainStatus(prismaPost.status),
    }
    );
  }

  static toPrisma(domainPost: Post): PrismaPost{
    return {
      id: domainPost.getId(),
      id_community: domainPost.getIdCommunity(),
      id_user: domainPost.getIdUser(),
      title: domainPost.getTittle(),
      body: domainPost.getBody(),
      media: domainPost.getMedia(),
      status: StatusMapper.toPrismaStatus(domainPost.getStatus()),
      post_date: domainPost.getPostDate()
    };
  }

  static InterfaceToDomain(ipost: IPost): Post {
    return new Post({
      id: ipost.id,
      idCommunity: ipost.idCommunity,
      idUser: ipost.idUser,
      tittle: ipost.tittle, 
      body: ipost.body,
      postDate: ipost.postDate,
      media: ipost.media,
      status: ipost.status,
    });
  }

  static DomainToInterface(post: Post): IPost {
    return {
      id: post.getId(),
      idCommunity: post.getIdCommunity(),
      idUser: post.getIdUser(),
      tittle: post.getTittle(),
      body: post.getBody(),
      postDate: post.getPostDate(),
      media: post.getMedia(),
      status: post.getStatus()
    };
  }
}