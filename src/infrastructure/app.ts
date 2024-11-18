import express, { Express } from 'express';
import { authRouter } from './routes/auth.route';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { styleText } from 'util';
import cookieParser from 'cookie-parser';

class App {
  port: number;
  app: Express;

  constructor() {
    this.port = Number(process.env.PORT) ;
    this.app = express();
  }

  useRoutes() {
    this.app.use(authRouter);
  }

  useMiddlewares() {
    this.app.use(ErrorMiddleware);
  }

  config() {
    this.app.use(express.json());
    this.app.use(cookieParser());
  }
  init() {
   this.config(); 
   this.useRoutes();
   this.useMiddlewares();

   this.app.listen(process.env.PORT || 3000, () => {
      console.log(styleText('green', `Auth microservice started on port ${process.env.PORT || 3000}`));
    });     
  }
}

export { App }
