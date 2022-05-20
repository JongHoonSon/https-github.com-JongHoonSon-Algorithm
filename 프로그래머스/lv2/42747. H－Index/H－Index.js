function solution(citations) {
  var answer = 0;

  // 주어진 배열을 정렬
  citations.sort((a, b) => a - b);

  // H-Index 값을 저장할 max 변수
  let max;

  // i : 논문의 수
  // i번 이상된 논문이 i편 이상인지 찾기 위해
  // 0부터 n까지 반복함
  // (논문이 최대 n편 존재하기 때문)
  for (let i = 0; i <= citations.length; i++) {
    // i번 이상 인용된 논문의 갯수가 몇개인지 저장할 cnt 변수
    let cnt = 0;

    // j : 모든 논문의 index
    for (let j = 0; j < citations.length; j++) {
      // citations[j] : j번째 논문의 인용 횟수
      if (citations[j] >= i) {
        cnt++;
      }
    }

    // 만약 i번 인용된 논문의 수가 i개보다 많다면
    // ex) 3번 인용된 논문의 수가 3개보다 많다면
    if (cnt >= i) {
      // max값 갱신
      // (i가 0부터 논문의 갯수까지이므로 조건을 통과한 값은 최댓값이 됨)
      max = i;
    }
  }

  answer = max;

  return answer;
}
