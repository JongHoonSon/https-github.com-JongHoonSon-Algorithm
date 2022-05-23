function solution(routes) {
  var answer = 0;

  routes.sort((a, b) => a[1] - b[1]);

  let checkPictured = new Array(routes.length).fill(false);

  let outCarsCnt = 0;
  let cameraCnt = 0;

  for (let i = 0; i < routes.length; i++) {
    if (checkPictured[i] === true) {
      continue;
    }
    let [entryTimeI, outTimeI] = routes[i];
    checkPictured[i] = true;
    outCarsCnt++;
    cameraCnt++;
    for (let j = 0; j < routes.length; j++) {
      if (i === j) {
        continue;
      }
      let [entryTimeJ, outTimeJ] = routes[j];
      if (entryTimeJ <= outTimeI && checkPictured[j] === false) {
        checkPictured[j] = true;
        outCarsCnt++;
      }
    }
  }

  answer = cameraCnt;

  return answer;
}
