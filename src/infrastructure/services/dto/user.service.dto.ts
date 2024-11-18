
type RegisterUserDto = {
  name: string;
  email: string;
  password: string;
}

type LoginUserDto = {
  email: string;
  password: string;
}

export { RegisterUserDto, LoginUserDto };
