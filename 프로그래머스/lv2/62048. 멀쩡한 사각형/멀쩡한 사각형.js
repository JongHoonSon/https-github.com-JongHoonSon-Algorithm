function solution(w, h) {
  var answer = 1;

  answer = w * h - (w + h - getGCD(w, h));

  return answer;
}

function getGCD(a, b) {
  while (b > 0) {
    let r = a % b;
    a = b;
    b = r;
  }
  return a;
}
