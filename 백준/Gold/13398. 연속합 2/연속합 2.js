const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const num = +input.shift();

let A = input[0].split(" ").map((v) => +v);
let D = new Array(num).fill(0);
let F = new Array(num).fill(0);

D[0] = A[0];
F[0] = A[0];

// 문자를 삭제하지 않은 상태에서의 연속합 구하기

// i는 수열의 각 요소
for (let i = 1; i < num; i++) {
  // 이전까지의 합이 양수이면
  if (D[i - 1] >= 0) {
    // D[i-1]를 D[i]에 추가
    D[i] = D[i - 1] + A[i];

    // 이전까지의 합이 음수이면
  } else if (D[i - 1] < 0) {
    // D[i]는 A[i]만을 사용 (음수인 D[i-1] 더하면 D[i]의 값이 더 낮아짐)
    D[i] = A[i];
  }
}

// 문자를 하나씩 삭제해보면서 새로운 연속합을 만들어보기

// i는 수열의 각 요소
for (let i = 1; i < num; i++) {
  // i-1로 끝나는 부분 수열의 가장 큰 연속합 D[i-1] 이
  // 현재 탐색 중인 A[i]와 F[i-1]의 값(초기에는 0)의 합보다 더 크면
  if (D[i - 1] > A[i] + F[i - 1]) {
    // F[i]는 더 큰 D[i-1]의 값을 취함
    // (의미 : )
    F[i] = D[i - 1];
  } else {
    F[i] = A[i] + F[i - 1];
  }
  console.log("F : ", F);
}

console.log("------------");

console.log(D.join(`\t`));
console.log(F.join(`\t`));

const d = Math.max(...D);
const f = Math.max(...F);

console.log(Math.max(d, f));

// 문제 풀이 접근 방식

// 1912번 : 연속합 문제와 다른 점은
// 주어진 수열에서 문자를 하나 삭제할 수 있다는 점이다.
