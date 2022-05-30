function solution(price, money, count) {
  var answer = -1;

  let haveToPay = 0;

  for (let i = 1; i <= count; i++) {
    haveToPay = haveToPay + price * i;
  }

  if (money >= haveToPay) {
    answer = 0;
  } else {
    answer = haveToPay - money;
  }

  return answer;
}
