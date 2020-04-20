import { Request, Response } from 'express';
import { controller, get, post } from '../decorator';
import util from '../utils/util';

@controller('/api')
export class LoginController {
  @post('/login')
  login(req: Request, res: Response): void {
    const { password } = req.body;
    const isLogin = Boolean(req.session ? req.session.login : false);
    if (isLogin) {
      res.json(util<responseResult.login>(true));
    } else {
      if (password === '123' && req.session) {
        req.session.login = true;
        res.json(util<responseResult.login>(true));
      } else {
        res.json(util<responseResult.login>(false, '密码错误'));
      }
    }
  }
  @get('/isLogin')
  isLogin(req: Request, res: Response): void {
    const isLogin = Boolean(req.session ? req.session.login : false);
    const result = util<responseResult.isLogin>(isLogin);
    res.json(result);
  }
  @post('/logout')
  logout(req: Request, res: Response): void {
    req.session && (req.session.login = undefined);
    res.json(util<responseResult.logout>(false));
  }
}
