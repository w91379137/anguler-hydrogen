
// 原生方法改進

export function delay(ms): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function randomInt(max) {
  return Math.floor(Math.random() * max);
}
