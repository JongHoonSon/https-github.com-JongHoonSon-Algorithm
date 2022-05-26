function solution(n) {
  var answer = [];

  let count = 0;

  function Hanoi(num, from, other, to) {
    if (num === 0) {
      return;
    } else {
      Hanoi(num - 1, from, to, other);

      answer.push([from, to].map((v) => +v));

      count++;

      Hanoi(num - 1, other, from, to);
    }
  }

  Hanoi(n, "1", "2", "3");

  return answer;
}

// 문제 풀이 접근 방식

// 백준 silver 11729번 하노이 탑 문제 확인
