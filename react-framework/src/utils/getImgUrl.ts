//https://i8b309.p.ssafy.io/test/src/assets
//https://localhost:3000/src/assets/
export function getImgUrl(url: string, name: string | number) {
  return new URL(url + '/' + name + '.png', 'https://localhost:3000/src/assets/').href
}