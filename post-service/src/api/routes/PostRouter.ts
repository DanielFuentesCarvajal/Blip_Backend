import { Router } from "express";
import PostRouterInterface from "../interface/PostRouterInterface";
import PostControllerInterface from "../interface/PostControllerInterface";

export default class PostRouter implements PostRouterInterface{
    router: Router;
    path: string;

    constructor(private readonly postController: PostControllerInterface,
){
this.router = Router()
this.path = '/api/'
this.routes()
}

    routes(): void {
        throw new Error("Method not implemented.");
    }

}