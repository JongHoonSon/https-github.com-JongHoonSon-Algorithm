function solution(n) {
  var answer = 0;

  // 10진수 n을 3진법으로 변환
  let threeN = n.toString(3);

  console.log(threeN);

  let reversedThreeN = threeN.split("").reverse().join("");

  console.log(reversedThreeN);

  // 3진수 reversedThreeN를 10진법으로 변환
  answer = Number.parseInt(reversedThreeN, 3);

  return answer;
}

// 문제 풀이 접근 방식

// 10진수 값을 3진수로 바꾸고
// 앞뒤를 뒤집고
// 다시 10진수로 바꾸면 된다.

// 진법 변환은 직접 구현하지 않고

// 10진수 A를 n진법으로 변환할 때 : A.toString(n)
// n진수 A를 10진법으로 변환할 때 : Number.parseInt(A, n)
