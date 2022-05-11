function solution(array, commands) {
  var answer = [];

  commands.forEach((el) => {
    const i = el[0];
    const j = el[1];
    const k = el[2];

    let sliceArray = array.slice(i - 1, j);

    // console.log("sliceArray", sliceArray);

    sliceArray.sort((a, b) => a - b);

    answer.push(sliceArray[k - 1]);
  });

  return answer;
}
