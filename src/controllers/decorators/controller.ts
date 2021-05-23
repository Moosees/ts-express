import { AppRouter } from '../../AppRouter';

export const controller = (pathPrefix: string) => (target: Function) => {
  const router = AppRouter.getInstance();

  for (let key in target.prototype) {
    const routeHandler = target.prototype[key];
    const path = Reflect.getMetadata('path', target.prototype, key);

    if (path) {
      router.get(`${pathPrefix}${path}`, routeHandler);
    }
  }
};
