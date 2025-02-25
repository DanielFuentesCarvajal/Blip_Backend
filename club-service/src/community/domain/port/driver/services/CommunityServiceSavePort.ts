import CommunityDataInterface from "../../../types/CommunityDataInterface";



export default interface CommunityServiceSavePort {
    save(communitySave: CommunityDataInterface): void;
}