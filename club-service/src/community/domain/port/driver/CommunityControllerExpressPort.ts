import { Request, Response } from 'express'

export default interface CommunityControllerExpressPort {
    getAllCommunity(req: Request, res: Response): void
    save(req: Request, res: Response): void
    getCommunityById(req: Request, res: Response): void
    getAllCategory(req: Request, res: Response) : void
    getAllTags(req: Request, res: Response) : void
    joinCommunity(req: Request, res: Response): void
    exitCommunity(req: Request, res: Response): void
    getAllCommunitiesByUserId(req: Request, res: Response): void
    userInCommunity(req: Request, res: Response): void
}