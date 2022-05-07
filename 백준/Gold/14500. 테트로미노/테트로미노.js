var fs = require("fs");
var inputs = fs.readFileSync("./dev/stdin").toString().split("\n");

const NM = inputs.shift();

const N = +NM.split(" ")[0];
const M = +NM.split(" ")[1];

// console.log(N);
// console.log(M);

// 2차원 배열 A는 실제 N*M 배열보다 상하좌우로 +3씩 크게 설정한다.

let A = new Array(N + 6);

for (let i = 0; i < N + 6; i++) {
  A[i] = new Array(M + 6).fill(0);
  // console.log(A[i]);
}

// 2차원 배열 A의 가운데에 N*M 배열의 값을 넣는다.

for (let i = 3; i < N + 3; i++) {
  const line = inputs[i - 3];
  const lineArray = line.split(" ").map((v) => +v);
  // console.log(lineArray);
  for (let j = 3; j < M + 3; j++) {
    A[i][j] = lineArray[j - 3];
  }
}

// for(let i=0; i<N+6; i++) {
//     console.log(A[i]);
// }

let result = [];

// 각 테트로미노의 가로, 세로 길이와 상대적인 인덱스 값을 가지고
// 해당 테트로미노의 배열 상의 max 값을 찾아내는 getMax 함수를 호출한다.

// 길쭉이
result.push(getMax(1, 4, [0, 0], [1, 0], [2, 0], [3, 0]));
result.push(getMax(4, 1, [0, 0], [0, 1], [0, 2], [0, 3]));

// 뚱뚱이
result.push(getMax(2, 2, [0, 0], [0, 1], [1, 0], [1, 1]));

// 기억자
result.push(getMax(2, 3, [0, 0], [1, 0], [2, 0], [2, 1]));
result.push(getMax(3, 2, [0, 0], [1, 0], [0, 1], [0, 2]));
result.push(getMax(2, 3, [0, 0], [0, 1], [1, 1], [2, 1]));
result.push(getMax(3, 2, [1, 0], [1, 1], [1, 2], [0, 2]));

// 기억자2
result.push(getMax(2, 3, [0, 1], [1, 1], [2, 0], [2, 1]));
result.push(getMax(3, 2, [0, 0], [0, 1], [0, 2], [1, 2]));
result.push(getMax(2, 3, [0, 0], [1, 0], [2, 0], [0, 1]));
result.push(getMax(3, 2, [0, 0], [1, 0], [1, 1], [1, 2]));

// Z 자
result.push(getMax(2, 3, [0, 0], [1, 0], [1, 1], [2, 1]));
result.push(getMax(3, 2, [1, 0], [1, 1], [0, 1], [0, 2]));
result.push(getMax(2, 3, [0, 1], [1, 0], [1, 1], [2, 0]));
result.push(getMax(3, 2, [0, 0], [0, 1], [1, 1], [1, 2]));

// 법규 자
result.push(getMax(3, 2, [1, 0], [0, 1], [1, 1], [1, 2]));
result.push(getMax(3, 2, [0, 0], [0, 1], [1, 1], [0, 2]));
result.push(getMax(2, 3, [0, 0], [1, 0], [2, 0], [1, 1]));
result.push(getMax(2, 3, [1, 0], [0, 1], [1, 1], [2, 1]));

// 모든 형태의 테트로미노의 max값이 들어 있는 배열에서 max 값을 찾아내면 끝
console.log(Math.max(...result));

function getMax(width, height, one, two, three, four) {
  // for(let i=0; i<N+6; i++) {
  //     console.log(A[i]);
  // }
  let max = 0;
  let sum = 0;
  let block1;
  let block2;
  let block3;
  let block4;
  for (let i = 0; i < N + 6 - height + 1; i++) {
    for (let j = 0; j < M + 6 - width + 1; j++) {
      // console.log("i, j", i, j);

      // 각 블록의 위치에 들어있는 값을 저장한다.
      block1 = A[i + one[0]][j + one[1]];
      block2 = A[i + two[0]][j + two[1]];
      block3 = A[i + three[0]][j + three[1]];
      block4 = A[i + four[0]][j + four[1]];

      // 블록 중에서 하나라도 0을 갖고 있으면 (즉, N x M 배열의 밖에 벗어나 있으면)
      // 아무 것도 실행하지 않는다.
      if (block1 === 0 || block2 === 0 || block3 === 0 || block4 === 0) {
        // 모두 M*N 블록에 잘 들어와 있으면
        // 각 블록의 합인 sum을 구하고 max를 갱신한다.
      } else {
        // console.log("block1, block2, block3, block4 : ", block1, block2, block3, block4);
        sum = block1 + block2 + block3 + block4;
        max = Math.max(max, sum);
      }
    }
  }

  // 최종 max값을 반환한다.
  return max;
}

// 테트로미노 문제 풀이 접근 방식

// 1. N x M 배열을 담기 전에 상하 좌우로 3개 씩 공간을 만든다.

// 2. 해당 공간을 0으로 초기화해놓고, 해당 공간을 밟은 테트로미노 조각은 무효처리 한다.

// 3. 테트로미노의 모양이 다양하지만, 같은 4개의 1x1 블록으로 이루어졌다는 것을 생각해서
//    테트로미노를 이루고 있는 4개의 블록의 index 값을 x,y 좌표 상의 상대 위치로 표현한다.
//    ex) 세로로 선 길쭉이는 (0,0) (0,1) (0,2) (0,3) 을 지난다.

// 4. 해당 테트로미노를 2차원 배열의 왼쪽 끝부터 오른쪽 아래까지 순회하면서
//    테트로미노의 요소 중에 0을 갖지 않는 테트로미노(원래의 N x M 배열에 포함되어 있는 테트로미노)는
//    해당 테트로미노 블록의 위치에 2차원 배열이 갖는 값을 모두 더하고 max를 갱신한다.

// 5. 이때 테트로미노의 가로 세로 길이를 함수에 같이 전달하여 테트로미노가
//    배열을 벗어나지 않고 모든 범위를 순회할 수 있도록 설정한다.

// 후기

// 처음에 순회하는 방식을 고민하다가 N x M 배열 밖에 값이 0인 자리를 추가해서
// 해당 자리를 순회할 경우 무효라고 처리하려고 했는데
// 생각해보니 해당 부분은 테트로미노의 가로 세로를 함수에 전달해줌으로써
// 함수가 알아서 끝에서 끝을 파악하기 때문에 필요가 없어졌다.

// 좀 더 꼼꼼히 설계하자!
