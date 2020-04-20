import './controller';
import express from 'express';
import router from './router';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// 解决了对express增加了属性，没有提示的问题
// app.use((req: Request, res: Response, next: NextFunction) => {
//   req.teacherName = 'Dell Lee';
//   next();
// });

app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
  })
);
app.use(router);
app.listen(7001, () => {
  console.log('serve is running...');
});
