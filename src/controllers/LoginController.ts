import { Request, Response } from 'express';
import { bodyValidator, controller, get, post } from './decorators';

@controller('')
export class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    if (req.session && req.session.loggedIn) {
      res.redirect('/');
      return;
    }

    res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" autocomplete="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" autocomplete="current-password" />
      </div>
      <button>Submit</button>
    </form>
  `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;

    if (email === 'test@test.com' && password === 'abcd') {
      req.session = { loggedIn: true, secure: false };
      res.redirect('/');
      return;
    }

    res.send('User not found');
  }

  @get('/logout')
  getLogout(req: Request, res: Response): void {
    req.session = undefined;

    res.redirect('/login');
  }
}
