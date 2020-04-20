import { CrowllerController, LoginController } from '../controller';

export function use(middleware: Function) {
  return function (target: CrowllerController | LoginController, key: string) {
    const middlewares: any[] =
      Reflect.getMetadata('middlewares', target, key) || [];
    middlewares.push(middleware);
    Reflect.defineMetadata('middlewares', middlewares, target, key);
  };
}
