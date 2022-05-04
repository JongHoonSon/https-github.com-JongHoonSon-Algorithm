const fs = require('fs');
let input = fs.readFileSync("./dev/stdin").toString().trim();

const infix = input.split('');
let postfix = '';
let stack = [];

for (let i=0; i<infix.length; i++ ) {
  let ch = infix[i];
  
  if (ch >= "A" && ch <= "Z") {
    postfix += ch;
  } else if (ch === "(") {
    stack.push(ch);
  } else if (ch === ")") {
    while (stack.length && stack[stack.length-1] !== "(") {
      postfix += stack.pop();
    }
    stack.pop();
  } else if (ch === "+" || ch === "-") {
    while (stack.length && stack[stack.length-1] !== "(") {
      postfix += stack.pop();
    }
    stack.push(ch);
  } else if (ch === "*" || ch === "/") {
    while (stack.length && (stack[stack.length-1] === "*" || stack[stack.length-1] === "/")) {
      postfix += stack.pop();
    }
    stack.push(ch);
  }
  // console.log(i+1);
  // console.log(ch);
  // console.log(`postfix : ${postfix}`);
  // console.log(`stack : ${stack}`);
  // console.log(`----------------------`);
}

while (stack.length) {
  postfix += stack.pop();
}

console.log(postfix);