import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import { controller, get, use } from '../decorator';
import util from '../utils/util';
import Crowller from '../utils/Crowller';
import CourseAnaylzer from '../utils/Analyzer';

const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  const isLogin = Boolean(req.session ? req.session.login : false);
  console.log('checkLogin');
  if (isLogin) {
    next();
  } else {
    res.json(util(null, '请先登录'));
  }
};
const second = (req: Request, res: Response, next: NextFunction): void => {
  console.log('secondMiddleWare');
  next();
};

interface CourseItem {
  title: string;
  count: number;
}

interface DataList {
  [key: string]: CourseItem[];
}

@controller('/api')
export class CrowllerController {
  @get('/getData')
  @use(checkLogin)
  @use(second)
  getData(req: Request, res: Response): void {
    const secret = 'x3b174jsx';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const courseAnalyzer = CourseAnaylzer.getInstance();
    new Crowller(url, courseAnalyzer);
    res.json(util<responseResult.getData>(true));
  }
  @get('/showData')
  @use(checkLogin)
  showData(req: Request, res: Response): void {
    try {
      const filePath = path.resolve(__dirname, '../../data/course.json');
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      res.json(util<responseResult.showData>(JSON.parse(fileContent)));
    } catch {
      res.json(util<responseResult.showData>(false, '请先爬取内容'));
    }
  }
}
