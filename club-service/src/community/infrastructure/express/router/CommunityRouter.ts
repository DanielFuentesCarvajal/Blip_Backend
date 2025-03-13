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
        this.save();
        this.getCommunityById();
        this.getAllCategory();
        this.getAllTags();

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
            this.communityController.save.bind(this.communityController)
          )
    }

    public getCommunityById(): void {
        this.router.get(
            '/v1.0/community/:id',
            this.communityController.getCommunityById.bind(this.communityController)
        )
    }

    public getAllCategory(): void {
        this.router.get(
            '/v1.0/com/category',
            this.communityController.getAllCategory.bind(this.communityController)
        )
    }

    public getAllTags(): void {
        this.router.get(
            '/v1.0/com/tags',
            this.communityController.getAllTags.bind(this.communityController)
        )
    }
    
}
 
