const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim();

// 중위 표기식으로 표현된 수식
const infix = input.split("");

// 후기 표기식으로 변환하여 저장할 변수
let postfix = "";

// 괄호 안의 연산자를 저장할 스택
let stack = [];

for (let i = 0; i < infix.length; i++) {
  // 중위 표기식 수식에서 문자 하나를 꺼냄
  let ch = infix[i];

  // 해당 문자가 피연산자라면 => 후기 표기식의 끝에 바로 추가함
  if (ch >= "A" && ch <= "Z") {
    postfix += ch;

    // 괄호 열기 라면
  } else if (ch === "(") {
    // 스택에 넣음
    stack.push(ch);

    // 괄호 닫기 라면
  } else if (ch === ")") {
    // 스택에서 다 비거나 괄호 열기를 만날 때 까지 pop하면서
    // pop한 값을 후기 표기식의 마지막에 추가함
    while (stack.length && stack[stack.length - 1] !== "(") {
      postfix += stack.pop();
    }

    // 괄호 열기를 pop함
    stack.pop();

    // 덧셈 뺄셈 연산자라면
  } else if (ch === "+" || ch === "-") {
    // 스택에서 다 비거나 괄호 열기를 만날 때 까지 pop하면서
    // pop한 값을 후기 표기식의 마지막에 추가함
    while (stack.length && stack[stack.length - 1] !== "(") {
      postfix += stack.pop();
    }

    // 스택에 덧셈 또는 뺄셈을 push함
    stack.push(ch);

    // 곱셈 나눗셈 연산자라면
  } else if (ch === "*" || ch === "/") {
    // 스택에서 또 다른 곱셈 나눗셈 연산자를 만날 때까지 pop하면서
    // pop한 값을 후기 표기식의 마지막에 추가함
    while (
      stack.length &&
      (stack[stack.length - 1] === "*" || stack[stack.length - 1] === "/")
    ) {
      postfix += stack.pop();
    }

    // 스택에 곱셈 또는 나눗셈을 push함
    stack.push(ch);
  }
  // console.log(i + 1);
  // console.log(ch);
  // console.log(`postfix : ${postfix}`);
  // console.log(`stack : ${stack}`);
  // console.log(`----------------------`);
}

// 스택에 들어있는 나머지 연산자(괄호 안에 들어있지 않던 연산자)를 후기 표기식 뒤에 붙힘
while (stack.length) {
  // console.log("stack : ", stack.join(" "));
  postfix += stack.pop();
}

console.log(postfix);
