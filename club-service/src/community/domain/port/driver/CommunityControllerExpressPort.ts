import { Request, Response } from 'express'

export default interface CommunityControllerExpressPort {
    getAllCommunity(req: Request, res: Response): void
    save(req: Request, res: Response): void
    
}