

type CreateTokenDto = {
  userId: string;
  refreshToken: string; 
}

type UpdateTokenDto = {
  _id: string;
  refreshToken: string;
}

export { CreateTokenDto, UpdateTokenDto };
