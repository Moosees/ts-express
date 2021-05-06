import express from 'express';
import { router } from './routes/loginRoutes';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, (): void => {
  console.log(`Running server on port ${port}`);
});
