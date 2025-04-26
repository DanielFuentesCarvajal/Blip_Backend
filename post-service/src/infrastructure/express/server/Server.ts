import express, { Application } from "express"
import Provider from "../provider/Provider"
import RouterExpressInterface from "../interfaces/RouterExpressInterface"
import { errorHandler } from "../../../shared/ErrorHandler"

export default class Server {
    private readonly app: Application

    constructor(
        private readonly routersExpress: RouterExpressInterface[],
    ) {
        this.app = express()
        this.configure()
        this.routes()
    }

    public routes() {
        this.routersExpress.forEach((router) => {
            this.app.use(router.path, router.router)
        });

        // Middleware para rutas no encontradas
        this.app.use((_req, res, _next) => {
            res.status(404).json({ message: "Ruta no encontrada" });
        });

        // Middleware de errores 
        this.app.use((
            err: Error,
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            errorHandler(err, req, res, next);
        });
    }

    public configure() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    public start() {
        const PORT = Provider.getPort()
        this.app.listen(PORT, () =>
            console.log(`Server is running on ${Provider.getAPIDomain()}`)
        )
    }
}