import { Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';
import { controller, get, useMiddleware } from './decorators';

@controller('')
export class AppController {
  @get('/')
  getRoot(req: Request, res: Response): void {
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
  }

  @get('/protected')
  @useMiddleware(requireAuth)
  getProtected(req: Request, res: Response): void {
    res.send('This is the cool place');
  }
}
