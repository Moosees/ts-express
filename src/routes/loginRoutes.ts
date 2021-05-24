import { Request, Response, Router } from 'express';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', (req: Request, res: Response): void => {
  if (!req.session || !req.session.loggedIn) {
    res.redirect('/login');
    return;
  }

  res.send(`
    <div>
      <p>You are logged in!</p>
      <a href="/logout">Logout</a>
    </div>
  `);
});

router.get('/protected', requireAuth, (req: Request, res: Response): void => {
  res.send('This is the cool place');
});

export { router };
