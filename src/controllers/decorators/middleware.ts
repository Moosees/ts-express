import { RequestHandler } from 'express';
import { MetadataKeys } from './MetadataKeys';

export const use =
  (middleware: RequestHandler) =>
  (target: any, key: string, desc: PropertyDescriptor) => {
    const middlewareList =
      Reflect.getMetadata(MetadataKeys.Middleware, target, key) || [];

    middlewareList.push(middleware);

    Reflect.defineMetadata(
      MetadataKeys.Middleware,
      middlewareList,
      target,
      key
    );
  };
