import { AxiosInstance } from "axios";
import { RegisterUserDto } from "./dto/user.service.dto";

class UserHttpService {
  constructor(private axios: AxiosInstance) {}

  async createUser(dto: RegisterUserDto) {
    const { data } = await this.axios.post("/create", dto);
    return data; 
  }
  
  async getUserByEmail(email: string) {
    const { data } = await this.axios.get(`/get_by_email/${email}`);
    return data; 
  }
}

export { UserHttpService };
