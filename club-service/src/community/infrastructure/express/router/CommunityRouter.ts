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
        this.joinCommunity();
        this.exitCommunity();
        this.getAllCommunitiesByUserId();
        this.userInCommunity();

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
            '/v1.0/community/categories/category',
            this.communityController.getAllCategory.bind(this.communityController)
        )
    }

    public getAllTags(): void {
        this.router.get(
            '/v1.0/community/tags/tag',
            this.communityController.getAllTags.bind(this.communityController)
        )
    }

    public joinCommunity(): void {
        this.router.post(
            '/v1.0/community/join',
            this.communityController.joinCommunity.bind(this.communityController)
        );
    }
    
    public exitCommunity(): void {
        this.router.delete(
            '/v1.0/community/exit',
            this.communityController.exitCommunity.bind(this.communityController)
        );
    }

    public getAllCommunitiesByUserId(): void {
        this.router.get(
            '/v1.0/community/user/communitys/:id',
            this.communityController.getAllCommunitiesByUserId.bind(this.communityController)
        );
    }

    public userInCommunity(): void {
        this.router.get(
            '/v1.0/community/user/in/community',
            this.communityController.userInCommunity.bind(this.communityController)
        );
    }
    
}
 
