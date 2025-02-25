import CommunityServiceGet from "../../application/service/CommunityServiceGet";
import CommunityServiceGetPort from "../../domain/port/driver/services/CommunityServiceGetPort";
import SQLRepositryFactory from "./SQLRepositoryFactory";

export default class CommunityGetServiceFactory {

    public static readonly create = () : CommunityServiceGetPort => {
        const sqlRepository = SQLRepositryFactory.create();
        return new CommunityServiceGet(sqlRepository)

    }

}