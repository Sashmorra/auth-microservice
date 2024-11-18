import { BadRequest, Unauthorized } from "../errors/error";
import { RegisterUserDto, LoginUserDto } from "./dto/user.service.dto";
import { TokenService } from "./token.service";
import { UserHttpService } from "./user.http.service";
import bcrypt from 'bcrypt';


class AuthService {
  constructor(
    private userService: UserHttpService,
    private tokenService: TokenService
  ) {}

  async registration(dto: RegisterUserDto) {
    const candidate = await this.userService.getUserByEmail(dto.email); 
    if (candidate) {
      throw BadRequest("User with this email already exists");
    }
    const hashPassword = await bcrypt.hash(dto.password, process.env.SALT || 10);
    const user = await this.userService.createUser({ name: dto.name, email: dto.email, password: hashPassword });
    return this.tokenService.generateAndSaveTokens({name: user.name, email: user.email}, user._id);
  }

  async login(dto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) {
      throw BadRequest("User with this email not found");
    }
    const isPassEquals = bcrypt.compareSync(dto.password, user.password);
    if (!isPassEquals) {
      throw BadRequest("Wrong password");
    }
    return this.tokenService.generateAndSaveTokens({name: user.name, email: user.email}, user._id);
  }

  async logout(refreshToken: string) {
    await this.tokenService.removeToken(refreshToken);   
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw Unauthorized("Unauthorized");
    }
    const userData = await this.tokenService.validateRefreshToken(refreshToken);
    const tokenDataFromDb = await this.tokenService.findToken(refreshToken);
    if (!tokenDataFromDb) {
      throw Unauthorized("Unauthorized"); 
    }

    if (!userData || !tokenDataFromDb) {
      throw Unauthorized("Unauthorized");
    }
    const user = await this.userService.getUserByEmail(userData.email);
    return this.tokenService.generateAndSaveTokens({name: user.name, email: user.email}, user._id);
  }
  async isAuthenticated(refreshToken: string) {
    const userData = await this.tokenService.validateRefreshToken(refreshToken);
    if (!userData) {
      throw Unauthorized("Unauthorized");
    }
    return userData;
  }
}

export { AuthService };
