
import PostUseCaseInterface from "../../application/service/interface/PostUseCaseInterface";
import PostControllerInterface from "../interface/PostControllerInterface";

export default class PostController implements PostControllerInterface{
    constructor(private readonly postUseCase: PostUseCaseInterface) {}
}