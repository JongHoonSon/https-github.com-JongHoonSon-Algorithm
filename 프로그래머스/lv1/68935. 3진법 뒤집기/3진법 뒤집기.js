function solution(n) {
  var answer = 0;

  let threeN = n.toString(3);

  console.log(threeN);

  let reversedThreeN = threeN.split("").reverse().join("");

  console.log(reversedThreeN);

  answer = Number.parseInt(reversedThreeN, 3);

  return answer;
}
