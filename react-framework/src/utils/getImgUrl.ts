//https://i8b309.p.ssafy.io/src/assets/
//https://localhost:3000/src/assets/
export function getImgUrl(url: string, name: string | number) {
  return new URL(url + '/' + name + '.png', "https://wwww.b309-playground.com/assets/").href
}