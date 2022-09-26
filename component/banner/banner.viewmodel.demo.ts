import { BannerViewModel } from "./banner.viewmodel";

// https://www.shutterstock.com/zh-Hant/image-photo/beautiful-cosmos-flowers-blooming-garden-797194879

let imageURLList = [
  'https://image.shutterstock.com/image-photo/beautiful-cosmos-flowers-blooming-garden-600w-797194879.jpg',
  'https://image.shutterstock.com/image-photo/vintage-color-filter-cosmos-flower-600w-718663456.jpg',
  'https://image.shutterstock.com/image-photo/beautiful-pink-cosmos-flowers-vintage-600w-1508821385.jpg',
]

export function demoBannerViewModel(): BannerViewModel {

  const result = new BannerViewModel()
  result.list.push(...imageURLList)
  result.current = result.list[0];
  result.timeLength = 1000;

  return result;
}
