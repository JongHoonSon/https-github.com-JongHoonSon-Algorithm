function solution(name) {
  let sum = 0;

  // A가 아닌 알파벳의 이동값 계산
  for (let i = 0; i < name.length; i++) {
    let diff = name[i].charCodeAt() - "A".charCodeAt();
    sum += diff > 13 ? 26 - diff : diff;
  }

  let minMove = name.length - 1;

  for (let i = 1; i < name.length; i++) {
    // 연속된 A에 대해서만 돌도록
    if (name[i] === "A") {
      for (var j = i + 1; j < name.length; j++) {
        if (name[j] !== "A") {
          break;
        }
      }
      // i~j: 연속된 A
      const left = i - 1; // i의 왼쪽
      const right = name.length - j; // j의 오른쪽
      
      // 그냥 왼 -> 오, A가 나올 때 이동방향을 바꾸는 것 중 최소값을 찾음
      minMove = Math.min(
        minMove,
       // left, right 중 하나가 0이라면 한 방향으로 가는 경우
       // 0이 아니라면 중간에 방향을 바꾸는 경우 => 즉 한 번 돌아가야함 => *2
        left > right ? left + right * 2 : left * 2 + right
      );
      i = j;
    }
  }

  return sum + minMove;
}