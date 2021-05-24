import { AppRouter } from '../../AppRouter';
import { MetadataKeys } from './MetadataKeys';
import { Methods } from './Methods';

export const controller = (pathPrefix: string) => (target: Function) => {
  const router = AppRouter.getInstance();

  for (let propertyKey in target.prototype) {
    const routeHandler = target.prototype[propertyKey];
    const path = Reflect.getMetadata(
      MetadataKeys.Path,
      target.prototype,
      propertyKey
    );
    const method: Methods = Reflect.getMetadata(
      MetadataKeys.Method,
      target.prototype,
      propertyKey
    );

    const middlewareList =
      Reflect.getMetadata(
        MetadataKeys.Middleware,
        target.prototype,
        propertyKey
      ) || [];

    if (path) {
      router[method](`${pathPrefix}${path}`, ...middlewareList, routeHandler);
    }
  }
};
