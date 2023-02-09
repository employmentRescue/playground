export function getImgUrl(url: string, name: string) {
  return new URL(`${url}/${name}.png`, import.meta.url).href;
}