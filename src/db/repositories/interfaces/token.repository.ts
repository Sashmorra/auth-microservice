import { Token } from "../../models/token.model";
import { CreateTokenDto, UpdateTokenDto } from "../dto/token.dto";


interface ITokenRepository {
 createToken(dto: CreateTokenDto): Promise<Token>;
 updateToken(dto: UpdateTokenDto): Promise<Token | null>;
 deleteToken(id: string): Promise<void>;
 findToken(refreshToken: string): Promise<Token | null>;
}

export { ITokenRepository };
