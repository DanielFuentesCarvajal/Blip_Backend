import { Request, Response } from 'express'
import ControllerExpress from "./ControllerExpressInterface";

export default interface ErrorControllerInterface extends ControllerExpress {
    error(req: Request, res: Response): void
}