
import CommunityServiceSave from "../../application/service/CommunityServiceSave";
import CommunityServiceSavePort from "../../domain/port/driver/services/CommunityServiceSavePort";
import SQLRepositryFactory from "./SQLRepositoryFactory";

export default class CommunitySaveServiceFactory {

    public static readonly create = () : CommunityServiceSavePort => {
        const sqlRepository = SQLRepositryFactory.create();
        return new CommunityServiceSave(sqlRepository)

    }

}