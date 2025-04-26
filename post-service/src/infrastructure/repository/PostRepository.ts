
import { PrismaClient } from "@prisma/client";
import { DatabaseError } from "../error/DatabaseError";
import { ConflictError } from "../../api/error/ConflictError";
import { NotFoundError } from "../../api/error/NotFoundError";

import Post from "../../domain/post/Post";

import IPostRepository from "./interfaces/IPostRepository";
import PostMapper from "../mapper/PostMapper";


export default class PostRepository implements IPostRepository{
    private prisma: PrismaClient;
    private mapper: any;

    constructor(prisma: PrismaClient = new PrismaClient()
    ) {
      this.prisma = prisma;
      this.mapper = PostMapper;
    }
  
    async findAll(): Promise<Post[]> {
      try {
        //extraer todos los posts activos
        const posts = await this.prisma.posts.findMany({
          where: {
            status: 'active',
          },
        });
          return posts.map((post: any) => this.mapper.toDomain(post));
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown database error';
        throw new DatabaseError(message, error);
      }
  }

  async findOneById(id: number): Promise<Post | null> {
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
    
async save(entity: Post): Promise<Post> {
  try {
      const prismaData = this.mapper.toPrisma({
          ...entity,
      });

      const post = await this.prisma.posts.create({
          data: {
              ...prismaData,
              post_date: entity.getPostDate() || new Date()
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
    
async update(id: number, partial: Post): Promise<Post> {
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
    await this.prisma.posts.update({
      where: { id },
      data: { status: 'deleted' }
    });
    return true;
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error && (error as any).code === 'P2025') {
      throw new NotFoundError('Post', id.toString());
    }
    const message = error instanceof Error ? error.message : 'Unknown database error';
    throw new DatabaseError(message, error);
  }
}

async findPopularPaginated(page: number, pageSize: number): Promise<Post[]> {
  try {
    const popularPostIds = await this.prisma.$queryRaw<Array<{ id: number }>>`
    SELECT p.id
    FROM posts p
    LEFT JOIN comments c ON p.id = c.parent_post AND c.status = 'active'
    LEFT JOIN likes l ON p.id = l.id_post AND l.like = true AND l.type = 'post'
    WHERE p.status = 'active'
    GROUP BY p.id
    ORDER BY COUNT(DISTINCT l.id) * 2 + COUNT(DISTINCT c.id) DESC, p.post_date DESC
    LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}
  `;
  const ids = popularPostIds.map((row: { id: any; }) => row.id);

    // Paso 2: Obtener los posts por ID
    const posts = await this.prisma.posts.findMany({
      where: {
        id: { in: ids },
      },
    });
    
    return posts.map((post: any) => this.mapper.toDomain(post));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown database error';
    throw new DatabaseError(message, error);
  }
}
}