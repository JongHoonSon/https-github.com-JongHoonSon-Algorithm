function solution(s) {
  var answer = -1;

  // 올바른 괄호문자열의 갯수를 저장할 변수
  let correctCnt = 0;

  // 괄호 문자열의 길이가 1일 경우, 절대 괄호가 완성될 수 없으므로 0 리턴
  if (s.length === 1) {
    return 0;
  }

  // 괄호 문자열의 길이만큼 반복
  for (let i = 0; i < s.length; i++) {
    let sArr = s.split("");

    // 괄호 문자열을 1부터 괄호 문자열의 길이-1만큼 왼쪽으로 회전시킴
    // 1번 회전
    // 2번 회전
    // ...
    // (길이-1)번 회전
    // ((길이)번 회전한 것은 회전을 안한 것과 같음)
    for (let j = 0; j < i; j++) {
      // 문자열의 맨왼쪽을 빼서(shift) 맨오른쪽에 넣으면(push)
      // 왼쪽으로 1번 회전한 것
      let a = sArr.shift();
      sArr.push(a);
    }

    // newS는 회전한 문자열
    let newS = sArr.join("");

    // newS가 올바른 괄호문자열인지 체크
    let result = checkRight(newS);

    // 올바른 괄호문자열이라면
    if (result === true) {
      // 올바른 괄호문자열의 갯수 +1
      correctCnt++;
    }
  }

  // 괄호문자열이 올바른지 체크할 함수

  // 구현 방법

  // 1. 열기 기호 ('[', '(' 등)이 나오면, stack에 넣는다.

  // 2. 닫기 기호 (']', ')' 등)이 나오면, stack의 최상단을 pop한다.
  // 단, pop한 것(열기 부호)이 닫기 부호와 짝이 맞아야 한다.

  function checkRight(s) {
    let stack = new Array();

    let arr = s.split("");

    let flag = true;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "[") {
        stack.push("[");
      } else if (arr[i] === "]") {
        if (stack.length === 0) {
          flag = false;
          break;
        } else {
          let a = stack.pop();
          if (a !== "[") {
            flag = false;
            break;
          }
        }
      } else if (arr[i] === "(") {
        stack.push("(");
      } else if (arr[i] === ")") {
        if (stack.length === 0) {
          flag = false;
          break;
        } else {
          let a = stack.pop();
          if (a !== "(") {
            flag = false;
            break;
          }
        }
      } else if (arr[i] === "{") {
        stack.push("{");
      } else if (arr[i] === "}") {
        if (stack.length === 0) {
          flag = false;
          break;
        } else {
          let a = stack.pop();
          if (a !== "{") {
            flag = false;
            break;
          }
        }
      }
    }

    if (stack.length !== 0) {
      flag = false;
    }

    return flag;
  }

  answer = correctCnt;

  return answer;
}

// 문제 풀이 접근 방식

// 스택을 이용해 올바른 괄호 문자열인지 판단하는 전형적인 문제이다.
