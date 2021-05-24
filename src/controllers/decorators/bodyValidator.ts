import { MetadataKeys } from './MetadataKeys';

export const bodyValidator =
  (...keys: string[]) =>
  (target: any, propertyKey: string, desc: PropertyDescriptor) => {
    Reflect.defineMetadata(
      MetadataKeys.BodyValidator,
      keys,
      target,
      propertyKey
    );
  };
