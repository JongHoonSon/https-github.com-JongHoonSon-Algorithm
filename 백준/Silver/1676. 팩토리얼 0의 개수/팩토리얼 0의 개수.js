const fs = require('fs');
let input = fs.readFileSync("./dev/stdin").toString();

input = +input;
answer = 0;

while (input >= 5) {
  answer += parseInt(input / 5);
  input /= 5;
}
console.log(answer);