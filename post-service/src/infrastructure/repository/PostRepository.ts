
import IPostRepository from "./interfaces/IPostRepository";
import IPost from "../../domain/interfaces/IPost";
import { PrismaClient } from "@prisma/client";
import { DatabaseError } from "../error/DatabaseError";
import { ConflictError } from "../../api/error/ConflictError";
import { NotFoundError } from "../../api/error/NotFoundError";
import { IPostMapper } from "../mapper/interface/IPostMapper";
import { PostMapperImpl } from "../mapper/PostMapper";

export default class PostRepository implements IPostRepository{
    private prisma: PrismaClient;
    private mapper: IPostMapper;

    constructor(prisma: PrismaClient = new PrismaClient()
, mapper: IPostMapper = new PostMapperImpl()
    ) {
      this.prisma = prisma;
      this.mapper = mapper;
    }
  
    async findAll(): Promise<IPost[]> {
      try {
          const posts = await this.prisma.posts.findMany();
          return posts.map(post => this.mapper.toDomain(post));
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown database error';
        throw new DatabaseError(message, error);
      }
  }

  async findOneById(id: number): Promise<IPost | null> {
    try {
        const post = await this.prisma.posts.findUnique({
            where: { id }
        });
        return post ? this.mapper.toDomain(post) : null;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown database error';
        throw new DatabaseError(message, error);
    }
}

async exists(id: number): Promise<boolean> {
  try {
      const post = await this.prisma.posts.findUnique({
          where: { id },
          select: { id: true }
      });
      return !!post;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown database error';
    throw new DatabaseError(message, error);
  }
}

      
async save(entity: IPost): Promise<IPost> {
  try {
      const prismaData = this.mapper.toPrisma({
          ...entity,
      });

      const post = await this.prisma.posts.create({
          data: {
              ...prismaData,
              post_date: entity.postDate || new Date()
          }
      });

      return this.mapper.toDomain(post);
  } catch (error: unknown) {
      if (error instanceof Error && 'code' in error && error.code === 'P2002') {
          throw new ConflictError('Post already exists');
      }
      const message = error instanceof Error ? error.message : 'Unknown database error';
        throw new DatabaseError(message, error);
  }
}
    
async update(id: number, partial: IPost): Promise<IPost> {
  try {
      const prismaData = this.mapper.toPrisma(partial);
      const updatedPost = await this.prisma.posts.update({
          where: { id },
          data: prismaData
      });
      return this.mapper.toDomain(updatedPost);
  } catch (error: unknown) {
      if (error instanceof Error && 'code' in error && error.code === 'P2025') {
          throw new NotFoundError('Post', id.toString());
      }
      const message = error instanceof Error ? error.message : 'Unknown database error';
        throw new DatabaseError(message, error);
  }
}


async delete(id: number): Promise<boolean> {
  try {
      await this.prisma.posts.delete({
          where: { id }
      });
      return true
  } catch (error: unknown) {
      if (error instanceof Error && 'code' in error && error.code === 'P2025') {
          throw new NotFoundError('Post', id.toString());
      }
      const message = error instanceof Error ? error.message : 'Unknown database error';
        throw new DatabaseError(message, error);
  }
  return false
}
}