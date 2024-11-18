import { Schema, model } from "mongoose";
import { Token } from "./token.model";



const TokenSchema = new Schema<Token>({
  userId: { type: String, required: true},
  refreshToken: { type: String, required: true }
})

const TokenModel = model<Token>("Token", TokenSchema);

export { TokenModel };
