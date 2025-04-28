import axios, { AxiosInstance } from "axios";
import UserRole from "../../util/UserRoleEnum";

export default class CommunityHTTPService {
    private readonly httpClient: AxiosInstance;

    constructor(baseURL: string = process.env["COMMUNITY_SERVICE_URL"] || "http://localhost:3000") {
      this.httpClient = axios.create({
        baseURL,
        timeout: 5000,
      });
    }
;    
async userBelongsToCommunity(userId: number, communityId: number): Promise<boolean> {
    try {
      const response = await this.httpClient.get('/memberships/check', { //TODO: cambiar link
        params: { userId, communityId },
      });
      return response.data.isMember;
    } catch (error) {
      console.error('Error checking membership:', error);
      throw new Error("Community service is unavailable");
    }
  }

  async getUserRole(userId: number, idCommunity: number): Promise<UserRole> {
    try {
      const response = await this.httpClient.get(`/users/${userId}/role`, {
        params: { idCommunity }
      });
      return this.mapToDomainRole(response.data.role);
    } catch (error) {
      console.error('Error fetching user role:', error);
      throw new Error("User service is unavailable");
    }
  }
    
  private mapToDomainRole(role: string): UserRole {
    switch (role?.toLowerCase()) {
      case 'admin':
        return UserRole.ADMIN;
      case 'moderator':
        return UserRole.MODERATOR;
      default:
        return UserRole.USER;
    }
  }
}