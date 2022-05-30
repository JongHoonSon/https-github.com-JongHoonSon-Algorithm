function solution(k, dungeons) {
  var answer = -1;

  let results = [];

  let check = new Array(dungeons.length).fill(false);
  let path = [];

  BT(0, k);

  function BT(step, k) {
    let canGo = false;
    for (let i = 0; i < dungeons.length; i++) {
      if (k >= dungeons[i][0]) {
        canGo = true;
        break;
      }
    }

    if (canGo === false || step === dungeons.length) {
      results.push(path.join(""));
      return false;
    } else {
      for (let i = 0; i < dungeons.length; i++) {
        if (check[i] === true) {
          continue;
        }

        if (k >= dungeons[i][0]) {
          check[i] = true;
          path.push(i);
          BT(step + 1, k - dungeons[i][1]);
          path.pop();
          check[i] = false;
        }
      }
    }
  }

  let maxLength = 0;

  for (let i = 0; i < results.length; i++) {
    if (maxLength < results[i].length) {
      maxLength = results[i].length;
    }
  }

  console.log(results);

  answer = maxLength;

  return answer;
}
