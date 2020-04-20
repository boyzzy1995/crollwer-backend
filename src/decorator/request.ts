import { Methods } from '../enum/methods';
import { CrowllerController, LoginController } from '../controller';

export function generateRequest(method: string) {
  return (path: string) => {
    return (target: CrowllerController | LoginController, key: string) => {
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', method, target, key);
    };
  };
}

export const get = generateRequest(Methods.get);
export const post = generateRequest(Methods.post);
