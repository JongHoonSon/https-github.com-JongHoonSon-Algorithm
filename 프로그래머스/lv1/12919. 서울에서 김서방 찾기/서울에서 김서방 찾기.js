function solution(seoul) {
  var answer = "";

  let position;

  for (let i = 0; i < seoul.length; i++) {
    if (seoul[i] === "Kim") {
      position = i;
    }
  }

  answer = "김서방은 " + position + "에 있다";

  return answer;
}
