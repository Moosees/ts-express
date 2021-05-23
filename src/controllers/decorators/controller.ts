import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';

export const controller = (pathPrefix: string) => (target: Function) => {
  const router = AppRouter.getInstance();

  for (let key in target.prototype) {
    const routeHandler = target.prototype[key];
    const path = Reflect.getMetadata('path', target.prototype, key);
    const method: Methods = Reflect.getMetadata(
      'method',
      target.prototype,
      key
    );

    if (path) {
      router[method](`${pathPrefix}${path}`, routeHandler);
    }
  }
};
