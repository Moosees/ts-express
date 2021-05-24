import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AppRouter } from '../../AppRouter';
import { MetadataKeys } from './MetadataKeys';
import { Methods } from './Methods';

const createBodyValidator =
  (keys: string[]): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      res.status(422).send('Invalid request');
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`);
        return;
      }
    }

    next();
  };

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

    const requiredBodyProps =
      Reflect.getMetadata(
        MetadataKeys.BodyValidator,
        target.prototype,
        propertyKey
      ) || [];

    const validatorMiddleware = createBodyValidator(requiredBodyProps);

    if (path) {
      router[method](
        `${pathPrefix}${path}`,
        ...middlewareList,
        validatorMiddleware,
        routeHandler
      );
    }
  }
};
