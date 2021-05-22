import { Request, Response } from 'express';
import { controller } from './decorators/controller';
import { get } from './decorators/routes';

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
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>
  `);
  }
}
