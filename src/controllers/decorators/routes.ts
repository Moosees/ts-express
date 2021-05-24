import { MetadataKeys } from './MetadataKeys';
import { Methods } from './Methods';

const routeBinder =
  (method: string) =>
  (path: string) =>
  (target: any, key: string, desc: PropertyDescriptor) => {
    Reflect.defineMetadata(MetadataKeys.Path, path, target, key);
    Reflect.defineMetadata(MetadataKeys.Method, method, target, key);
  };

export const get = routeBinder(Methods.Get);
export const post = routeBinder(Methods.Post);
export const put = routeBinder(Methods.Put);
export const del = routeBinder(Methods.Del);
