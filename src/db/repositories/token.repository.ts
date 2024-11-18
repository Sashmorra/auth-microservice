import { ApiError } from "../../infrastructure/errors/error";
import { TokenModel } from "../models/db.model";
import { Token } from "../models/token.model";
import { CreateTokenDto, UpdateTokenDto } from "./dto/token.dto";
import { ITokenRepository } from "./interfaces/token.repository";

class TokenRepository implements ITokenRepository {
  async createToken(dto: CreateTokenDto): Promise<Token> {
    try {
    const token = await TokenModel.create(dto);
    return token;
    } catch(error) {
      throw new ApiError("Database error", 500);
    }
  }

  async updateToken(dto: UpdateTokenDto): Promise<Token | null> {
    try {
    const token = await TokenModel.findByIdAndUpdate(dto._id, {refreshToken: dto.refreshToken});
    return token;
    } catch (error) {
      throw new ApiError("Database error", 500);
    }
  }

  async deleteToken(refreshToken: string): Promise<void> {
    try {
    await TokenModel.findOneAndUpdate({refreshToken}, {refreshToken: null});
  } catch (error) {
    throw new ApiError("Database error", 500);
   } 
  }

  async findToken(refreshToken: string): Promise<Token | null> {
    try {
    const token = await TokenModel.findOne({refreshToken}); 
    return token;
    } catch(error) {
      throw new ApiError("Database error", 500);
    }
  }
}

export { TokenRepository };
