import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { instance } from "../config/http.config";
import { UserHttpService } from "../services/user.http.service";
import { TokenService } from "../services/token.service";
import { TokenRepository } from "../../db/repositories/token.repository";
import { Unauthorized } from "../errors/error";

const userService = new UserHttpService(instance);
const tokenRepository = new TokenRepository();
const tokenService = new TokenService(tokenRepository);
const authService = new AuthService(userService, tokenService);

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const tokens = await authService.registration({ name, email, password });
      res.cookie("refreshToken", tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json(tokens);
    } catch(error) {
     next(error);
  }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const tokens = await authService.login({ email, password });
      res.cookie("refreshToken", tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json(tokens);
    } catch(error){
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw Unauthorized("Unauthorized");
      }
      await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.sendStatus(204);
    } catch(error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try { 
      const { refreshToken } = req.cookies; 
      const userData = await authService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json(userData);
    } catch(error) {
      next(error);
    }
  }
  async isAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.headers.authorization?.split(" ")[1];
      if (!refreshToken) {
        throw Unauthorized("Unauthorized");
      }
      const userData = await authService.isAuthenticated(refreshToken);
      res.json(userData);
    } catch(error) {
      next(error);
    }
  }
}
 
export { AuthController };
