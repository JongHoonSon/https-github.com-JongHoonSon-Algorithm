function solution(citations) {
  var answer = 0;

  // 각 논문을 인용 횟수를 내림차순 정렬
  citations.sort((a, b) => b - a);

  let n = 0;

  // n : 논문의 index
  // n+1 : 논문의 갯수
  // citations[n] : n번 index의 논문의 인용횟수

  // 전체 논문 중에서
  // n+1개의 논문이 있을 때,
  // n번 index의 논문의 인용횟수가 n+1개와 같거나 더 많으면 => 반복
  // (반대로 n+1개의 논문이 있을 때,
  // n번 index의 논문의 인용횟수가 n+1개 보다 적으면
  // (= citations[n]번 이상 인용횟수를 가진 논문의 수가 n+1개 이상이됨) => 반복 종료)
  while (n + 1 <= citations[n]) {
    n++;
  }

  answer = n;

  return answer;
}
