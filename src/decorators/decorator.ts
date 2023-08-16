import { registerDecorator } from 'class-validator';

export function IsBiggerThan(num: number) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isBiggerThan',
      target: object.constructor,
      propertyName: propertyName,
      options: { message: `${propertyName} is bigger than ${num}` },
      validator: {
        validate(value: any) {
          if (<number>value > num) {
            return true;
          }
          return false;
        },
      },
    });
  };
}
