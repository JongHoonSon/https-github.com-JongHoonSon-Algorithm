function solution(s) {
  var answer = [];

  let sArr = s.split("");

  let arr = [];
  let smallArr = [];

  for (let i = 0; i < sArr.length; i++) {
    if (sArr[i] === "{") {
      smallArr = [];
    } else if (sArr[i] === "}") {
      if (smallArr.length > 0) {
        arr.push(
          smallArr
            .join("")
            .split(",")
            .map((v) => +v)
        );
      }
      smallArr = [];
    } else {
      smallArr.push(sArr[i]);
    }
  }

  arr.sort((a, b) => a.length - b.length);

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (!answer.includes(arr[i][j])) {
        answer.push(arr[i][j]);
      }
    }
  }

  return answer;
}
