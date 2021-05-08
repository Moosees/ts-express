import express from 'express';
import { router } from './routes/loginRoutes';
import cookieSession from 'cookie-session';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['dgsweiusdlbxaspo'] }));
app.use(router);

app.listen(port, (): void => {
  console.log(`Running server on port ${port}`);
});
