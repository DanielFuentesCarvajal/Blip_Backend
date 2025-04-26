import IPost from "../../../domain/interfaces/IPost";
import Post from "../../../domain/post/Post";

    export default interface PostServiceInterface{
        createPost(post: IPost): Promise<Post>;
        deletePost(id: number, currentUser: number): Promise<boolean>;
        updatePost(id: number, post: IPost, currentUser: number): Promise<Post>;
        getAllPosts(): Promise<Post[]>;
        getPostsFromMyCommunities(userId: number): Promise<Post[]>;
        getPostsFromCommunity(communityId: number): Promise<Post[]>;
        getPostById(id: number): Promise<Post>;
    }