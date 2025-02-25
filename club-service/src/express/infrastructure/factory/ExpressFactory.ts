
import CommunityUseCaseGet from "../../../community/application/usercase/CommunityUseCaseGet";
import CommunityUseCaseSave from "../../../community/application/usercase/CommunityUseCaseSave";
import CommunityController from "../../../community/infrastructure/express/controller/CommunityController";
import CommunityRouterExpress from "../../../community/infrastructure/express/router/CommunityRouter";
import CommunityGetServiceFactory from "../../../community/infrastructure/factory/CommunityGetServiceFactory";
import CommunitySaveServiceFactory from "../../../community/infrastructure/factory/CommunitySaveServiceFactory";
import Server from "../server/Server";

export default class ExpressFactory {
  public static readonly create = () : Server => {
    const communityGetService = CommunityGetServiceFactory.create();
    const communityUseCaseGet = new CommunityUseCaseGet(communityGetService);

    const communitySaveService = CommunitySaveServiceFactory.create();
    const communityUseCaseSave = new CommunityUseCaseSave(communitySaveService)

    const communityController = new CommunityController(communityUseCaseGet, communityUseCaseSave);
    const communityRouter = new CommunityRouterExpress(communityController);

    const server = new Server([communityRouter]);
    return server
   }

}