import { RequestHandler } from 'express';
import { MetadataKeys } from './MetadataKeys';

export const use =
  (middleware: RequestHandler) =>
  (target: any, propertyKey: string, desc: PropertyDescriptor) => {
    const middlewareList =
      Reflect.getMetadata(MetadataKeys.Middleware, target, propertyKey) || [];

    middlewareList.push(middleware);

    Reflect.defineMetadata(
      MetadataKeys.Middleware,
      middlewareList,
      target,
      propertyKey
    );
  };
