import { Request, Response, Router } from 'express';
import { requireAuth } from '../middleware/auth';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

router.post('/login', (req: RequestWithBody, res: Response): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.send('Invalid request');
    return;
  }

  if (email === 'test@test.com' && password === 'abcd') {
    req.session = { loggedIn: true, secure: false };
    res.redirect('/');
    return;
  }

  res.send('User not found');
});

router.get('/logout', (req: Request, res: Response): void => {
  req.session = undefined;

  res.redirect('/login');
});

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
