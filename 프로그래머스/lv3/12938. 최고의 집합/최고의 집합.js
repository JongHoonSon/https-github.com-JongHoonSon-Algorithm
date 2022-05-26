function solution(n, s) {
  var answer = [];

  // s를 n개의 자연수의 합으로 나타내야 하므로
  // 먼저 s를 n으로 나눈 값을 avg에 저장
  let avg = Math.floor(s / n);

  // s와 n*avg의 차이를 gap에 저장
  let gap = s - avg * n;

  // 만약 s = 10003 이고, n = 5일 경우
  // avg = 2000이 되고, gap 은 3이 된다.

  // n개의 자연수(avg)를 갖고 있는 배열 arr 생성
  let arr = new Array(n).fill(avg);

  // 만약 입력으로 주어진 s가 1이거나 s가 n보다 작은 경우
  // s를 n개의 자연수의 조합으로 만들 수 없으므로 answer에 -1을 넣음
  if (s === 1 || s < n) {
    answer = [-1];
  } else {
    // gap개 자연수의 값을 + 1 시킴
    // ex) arr이 [2000, 2000, 2000, 2000, 2000] 이었다면
    // [2001, 2001, 2001, 2000, 2000] 로 변경함
    for (let i = 0; i < gap; i++) {
      arr[i]++;
    }

    // 정답이 되는 집합을 구했으므로 answer에 넣음
    for (let i = 0; i < arr.length; i++) {
      answer.push(arr[i]);
    }

    // answer을 오름차순으로 정렬함
    answer.sort((a, b) => a - b);
  }

  return answer;
}

// 문제 풀이 접근 방식

// 입력으로 주어지는 s를 n개의 자연수의 합으로 나타낼 때,
// n개의 자연수의 곱의 값은 각 자연수가 s의 평균 값과 가까울수록 크다.
// ex) s = 10, n = 2일 때,
// 2, 8 의 합으로도 10을 만들 수 있고
// 5, 5 의 합으로도 10을 만들 수 있지만
// 2x8 = 16, 5x5 = 25 로, 10을 2로 나눈 평균인 5에 가까운 자연수의 집합이
// 문제에서 요구하는 최고의 집합이 된다.
