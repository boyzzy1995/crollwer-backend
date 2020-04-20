import router from '../router';
import { Methods } from '../enum/methods';

export function controller(root: string) {
  return function (target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
      const path: string = Reflect.getMetadata('path', target.prototype, key);
      const middlewares = Reflect.getMetadata(
        'middlewares',
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        'method',
        target.prototype,
        key
      );
      const fullPath = root === '/' ? path : `${root}${path}`;
      if (middlewares && middlewares.length) {
        router[method](fullPath, ...middlewares, target.prototype[key]);
      } else {
        router[method](fullPath, target.prototype[key]);
      }
    }
  };
}
