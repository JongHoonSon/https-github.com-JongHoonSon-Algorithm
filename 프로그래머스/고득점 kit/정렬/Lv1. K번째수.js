function solution(array, commands) {
  var answer = [];

  for (let i = 0; i < commands.length; i++) {
    let copy = JSON.parse(JSON.stringify(array));

    let [start, end, n] = commands[i];

    let spliceArr = copy.splice(start - 1, end - start + 1);

    spliceArr.sort((a, b) => a - b);

    console.log(spliceArr);

    answer.push(spliceArr[n - 1]);
  }

  return answer;
}
