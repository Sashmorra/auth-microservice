import { ITokenRepository } from "../../db/repositories/interfaces/token.repository";
import { sign, verify } from "jsonwebtoken"
import { PayloadDto, Tokens } from "./dto/token.service.dto";

class TokenService {
  constructor(private tokenRepository: ITokenRepository) {}

  private async generateTokens(payload: PayloadDto): Promise<Tokens> {
    const accessToken = sign(payload, process.env.JWT_ACCESS_SECRET || 'secret', { expiresIn: '15m' });
    const refreshToken = sign(payload, process.env.JWT_REFRESH_SECRET || 'secret', { expiresIn: '30d' });
    return { accessToken, refreshToken };
  }
  async findToken(refreshToken: string) {
    const token = await this.tokenRepository.findToken(refreshToken);
    return token;
    
  }
  async validateAccessToken(token: string): Promise<PayloadDto | null> {
    try {
      const payload = verify(token, process.env.JWT_ACCESS_SECRET || 'secret');
      return payload as PayloadDto;
    } catch {
      return null;
    }
  }

  async validateRefreshToken(token: string): Promise<PayloadDto | null> {
    try {
      const payload = verify(token, process.env.JWT_REFRESH_SECRET || 'secret');
      return payload as PayloadDto;
    }
    catch {
      return null;
    }
  }

  private async saveToken(userId: string, refreshToken: string): Promise<void> {
    const tokenData = await this.tokenRepository.findToken(refreshToken);
    if (tokenData) {
     this.tokenRepository.updateToken({ _id: tokenData._id, refreshToken });
     return;
    }
    await this.tokenRepository.createToken({ userId, refreshToken });
    return;
  }

  async removeToken(refreshToken: string): Promise<void> {
    await this.tokenRepository.deleteToken(refreshToken);
  }
  public async generateAndSaveTokens(payloadL: PayloadDto, userId: string) {
    const { accessToken, refreshToken } = await this.generateTokens(payloadL);
    await this.saveToken(userId, refreshToken);
    return { accessToken, refreshToken };
  }
}

export { TokenService };
