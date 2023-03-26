
// https://levelup.gitconnected.com/start-writing-your-own-typescript-method-decorators-c921cdc3d1c1

export function DecoratorName(value: any) {

  let result = function (
    target: Object,
    key: string | symbol, // 名稱
    descriptor: PropertyDescriptor
  ) {
    console.log('DecoratorName get', target, key)
    return descriptor
  }
  return result
}
