import CommunityServiceGet from "../../application/service/CommunityServiceGet";
import CommunityServiceGetPort from "../../domain/port/driver/services/CommunityServiceGetPort";
import SQLRepositryFactory from "./SQLRepositoryFactory";
import SQLRepositryTagFactory from "./SQLRepositoryTagFactory";

export default class CommunityGetServiceFactory {

    public static readonly create = () : CommunityServiceGetPort => {
        const sqlRepository = SQLRepositryFactory.create();
        const sqlRepositoryTag = SQLRepositryTagFactory.create();
        return new CommunityServiceGet(sqlRepository, sqlRepositoryTag)
    }
}