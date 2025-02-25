import RouterExpress from "../../../../express/domain/RouterExpress";
import CommunityControllerExpressPort from "../../../domain/port/driver/CommunityControllerExpressPort";
import CommunityRouterExpressPort from "../../../domain/port/driver/CommunityRouterExpressPort";

export default class CommunityRouterExpress extends RouterExpress implements CommunityRouterExpressPort {

    constructor(private readonly communityController: CommunityControllerExpressPort) {
        super();
        this.routes();
    }

    public routes = (): void => {
        this.getAllCommunity()
        
    }

    public getAllCommunity(): void {
        this.router.get(
            '/v1.0/community/communitys',
            this.communityController.getAllCommunity.bind(this.communityController)
          )
    }

    public save(): void {
        this.router.post(
            '/v1.0/community/save',
            this.communityController.getAllCommunity.bind(this.communityController)
          )
    }

    
}
 
