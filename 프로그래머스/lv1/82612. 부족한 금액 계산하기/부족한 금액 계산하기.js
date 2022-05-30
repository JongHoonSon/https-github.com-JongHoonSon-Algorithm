function solution(price, money, count) {
  var answer = -1;

  let haveToPay = 0;

  // 놀이기구를 count번 이용하는데 드는 비용을 haveToPay에 계산함
  for (let i = 1; i <= count; i++) {
    haveToPay = haveToPay + price * i;
  }

  // 현재 갖고 있는 돈(money)이 haveToPay와 비교했을 때,

  // 같거나 더 많으면
  if (money >= haveToPay) {
    // answer에 0을 넣음 (문제 조건)
    answer = 0;

    // 적으면
  } else {
    // answer에 모자라는 금액을 넣음
    answer = haveToPay - money;
  }

  return answer;
}
