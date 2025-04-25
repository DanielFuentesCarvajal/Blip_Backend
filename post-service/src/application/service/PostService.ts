import { ForbiddenError } from "../../api/error/ForbiddenError";
import { NotFoundError } from "../../api/error/NotFoundError";
import IPost from "../../domain/interfaces/IPost";
import Post from "../../domain/post/Post";
import CommunityHTTPService from "../../infrastructure/httpService/CommunityHTTPService";
import PostMapper from "../../infrastructure/mapper/PostMapper";
import IPostRepository from "../../infrastructure/repository/interfaces/IPostRepository";
import Status from "../../util/StatusEnum";
import UserRole from "../../util/UserRoleEnum";
import PostServiceInterface from "./interface/PostServiceInterface";

export default class PostService implements PostServiceInterface {

    constructor(
        private postRepository: IPostRepository,
        private communityService: CommunityHTTPService
    ) {}

    async createPost(post: IPost): Promise<Post> {
        /* -Validar que el usuario pertenece a la comunidad
        - Guardar el contenido del post en la base de datos
        - retornar el post para que el controlador obtenga su id */
        // Validación con servicio externo
    if (!await this.communityService.userBelongsToCommunity(post.idUser, post.idCommunity)) {
        throw new Error("User not in community");
      }

      const postDomain = PostMapper.InterfaceToDomain(post);
      const createdPost = await this.postRepository.save(postDomain);

      return createdPost
    } 
    
    async deletePost(id: number, currentUser: number): Promise<boolean> {
        try{
            //Es necesario validar si el post existe y si el usuario fue el que lo creó
            //TODO: se permitirá que los usuarios con permiso de moderador o admin lo eliminen
            const post = await this.postRepository.findOneById(id);
            if(!post){
                throw new Error("Post not found");
            }

            // se valida la autorización. El usuario debe ser el creador del post o un moderador/admin de la comunidad
            await this.validateDeleteAuthorization(post, currentUser);

            return this.postRepository.delete(id);
        }catch(error: unknown){
            const message = error instanceof Error ? error.message : 'Unknown database error';
            throw new Error(message);
        }
    }
    private async validateDeleteAuthorization(post: Post, currentUserId: number): Promise<boolean> {
     //  Verificar si el usuario es el creador
    const isOwner = post.getIdUser() === currentUserId;
    if (isOwner) return true;

    // Obtener rol del usuario desde el microservicio
    const userRole = await this.communityService.getUserRole(currentUserId, post.getIdCommunity());
    // Verificar si tiene privilegios
    const hasPrivileges = [UserRole.MODERATOR, UserRole.ADMIN].includes(userRole);
    if (!hasPrivileges) {
        throw new ForbiddenError("Unauthorized to delete this post");
    }
    return true;
  }
    
    updatePost(id: number, post: IPost): Promise<Post> {
        throw new Error("Method not implemented.");
    }
    getAllPosts(): Promise<Post[]> {
        /**
         * Los posts deben estar paginados
         * Obtiene solo los posts con status 'active'.
            Calcula una especie de "ranking" por:
            - Cantidad de likes (peso alto).
            - Cantidad de comentarios (peso medio).
            - Fecha (peso más bajo, pero influye).
         * Devuelve 15 posts distintos aleatorios, pero con más peso para los populares y recientes.
         * Cambian cada vez que se recarga la página 
         * */ 

         //TODO
        throw new Error("Method not implemented.");
    }
    getPostsFromMyCommunities(userId: number): Promise<Post[]> {
        throw new Error("Method not implemented.");
    }
    getPostsFromCommunity(communityId: number): Promise<Post[]> {
        throw new Error("Method not implemented.");
    }

    async getPostById(id: number): Promise<Post> {
        const post = await this.postRepository.findOneById(id);

        if (!post || post.getStatus() === Status.deleted) {
            throw new NotFoundError('Post', id.toString());
        }

        return post;
    }

}