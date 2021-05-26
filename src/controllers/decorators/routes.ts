import { RequestHandler } from 'express';
import { MetadataKeys } from './MetadataKeys';
import { Methods } from './Methods';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

const routeBinder =
  (method: string) =>
  (path: string) =>
  (target: any, propertyKey: string, desc: RouteHandlerDescriptor) => {
    Reflect.defineMetadata(MetadataKeys.Path, path, target, propertyKey);
    Reflect.defineMetadata(MetadataKeys.Method, method, target, propertyKey);
  };

export const get = routeBinder(Methods.Get);
export const post = routeBinder(Methods.Post);
export const put = routeBinder(Methods.Put);
export const del = routeBinder(Methods.Del);
