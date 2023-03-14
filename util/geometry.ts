
// 2維以上的計算方式

export function intersectRect(rect1: DOMRect, rect2: DOMRect) {
  // 邊界重疊不算
  return !(rect2.left >= rect1.right ||
           rect2.right <= rect1.left ||
           rect2.top >= rect1.bottom ||
           rect2.bottom <= rect1.top)
}

interface Point {
  x: number,
  y: number,
}

export function rectCenter(rect: DOMRect): Point {
  let result = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  }
  return result
}

