import { Request, Response, Router } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

router.get('/login', (req: Request, res: Response): void => {
  if (req.session && req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>
  `);
});

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

export { router };
