import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/registration', authController.registration);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/refresh', authController.refresh);
authRouter.get('/is_auth', authController.isAuthenticated);

export { authRouter };   
