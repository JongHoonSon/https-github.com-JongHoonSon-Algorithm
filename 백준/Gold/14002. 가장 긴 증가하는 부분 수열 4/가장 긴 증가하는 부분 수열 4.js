const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input.shift();

// console.log(N);

// A는 입력으로 주어진 수열을 담은 배열
const A = input[0].split(" ").map((v) => +v);

// console.log(numArray);

// 배열 A의 index가 0부터 N-1까지이므로
// 각 index에 있는 값(A[index])으로 끝나는 부분 수열 중에서
// 가장 긴 증가하는 부분 수열의 길이를 저장할 배열 D 생성
const D = new Array(N).fill(1);

// 가장 긴 증가하는 부분 수열의 구성 요소를 저장할 배열 arr 생성
const arr = [];

// i는 배열 A의 index
for (let i = 0; i < A.length; i++) {
  // i>j인 A[j]로 끝나는 가장 긴 증가하는 부분 수열의
  // 길이를 저장하기 위한 변수 max 생성
  let max = 0;

  // i>j인 A[j]로 끝나는 가장 긴 증가하는 부분 수열의
  // 마지막 index를 저장하기 위한 변수 maxIndex 생성
  let maxIndex = -1;

  // i>j
  for (let j = 0; j < i; j++) {
    // 만약 A[i]보다 A[j]가 작다면
    // A[j]로 끝나는 가장 긴 증가하는 부분 수열에서
    // A[i]를 추가하여,
    // A[i]로 끝나는 증가하는 부분 수열을 만들 수 있음
    // (아직 가장 긴지는 모름, 아래서 체크함)

    // A[j]로 끝나는 가장 긴 증가하는 부분 수열의 길이인 D[j]가
    // 현재까지 찾은 A[j]로 끝나는 가장 긴 증가하는 부분 수열의 길이보다 길면
    if (A[i] > A[j] && D[j] > max) {
      // 방금 찾은 A[j]로 끝나는 가장 긴 증가하는 부분 수열의 길이인
      // D[j]의 값으로 max값을 갱신
      max = D[j];

      // 마찬가지로 마지막 index의 정보도 maxIndex에 저장
      maxIndex = j;
    }
  }

  // D[i]는
  // 방금 찾은 A[j]로 끝나는 가장 긴 증가하는 부분 수열 중에서
  // 가장 길이가 긴 부분 수열의 값에 + 1한 값이 됨
  // (A[i]를 해당 부분 수열의 끝에 추가하므로)
  D[i] = max + 1;

  // 아래는 방금 A[i]를 추가하여 만든 새로운 가장 긴 증가하는 부분 수열을
  // arr에 저장하기 위한 과정

  // 만약 maxIndex가 -1이 아니라면
  // (= A[i]를 추가하여 새로운 가장 긴 증가하는 부분 수열을 만들 수 있다면)
  if (maxIndex !== -1) {
    // A[i]로 끝나는 가장 긴 증가하는 부분 수열을 저장하고 있는 arr[i]에
    // A[j]를 마지막 원소로하여 만들 수 있던
    // 가장 긴 증가하는 부분 수열 경로에
    // A[i]를 추가함
    arr[i] = arr[maxIndex].concat(A[i]);

    // maxIndex가 -1이 이라면
    // (= A[i]를 추가하여 새로운 가장 긴 증가하는 부분 수열을 만들기 위해
    // A[j]로 끝나는 가장 긴 증가하는 부분 수열을 찾을 수 없었다면)
  } else {
    // A[i]로 끝나는 가장 긴 증가하는 부분 수열을 저장하고 있는 arr[i]에
    // 현재 방문한 A[i]를 넣음
    // (arr[i]에는 A[i] 하나만 들어있게 됨)
    arr[i] = [A[i]];
  }
}

let maxLength = Math.max(...D);

// 가장 긴 증가하는 부분 수열의 길이 출력
console.log(maxLength);

// 해당 수열의 구성 출력
console.log(arr[D.indexOf(maxLength)].join(" "));

// 문제 풀이 접근 방식

// 11053번 : 가장 긴 증가하는 부분 수열 문제와 다른 점은
// 가장 긴 증가하는 부분 수열의 길이 뿐만 아니라
// 해당 수열의 구성까지 출력해야한다는 점이다.

// 따라서, arr이라는 배열을 새로 만들어서
// arr[i]에 각 A[i]로 끝나는 가장 긴 증가하는 부분 수열의 경로를 저장함
