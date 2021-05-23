import cookieSession from 'cookie-session';
import express from 'express';
import 'reflect-metadata';
import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import { router } from './routes/loginRoutes';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['dgsweiusdlbxaspo'] }));
app.use(router);
app.use(AppRouter.getInstance());

app.listen(port, (): void => {
  console.log(`Running server on port ${port}`);
});
