const fs = require('fs');
let input = fs.readFileSync("./dev/stdin").toString().trim().split(' ');

const numA = Number(input.shift());
const numB = Number(input.shift());

const numAB = numA - numB;

const two = calc(numA)[0] - (calc(numB)[0] + calc(numAB)[0]);
const five = calc(numA)[1] - (calc(numB)[1] + calc(numAB)[1]);

const answer = Math.min(two, five);

console.log(answer);


function calc(v) {
  let count_two = 0;
  let count_five = 0;

  for (let i=2; i<=v; i=i*2) {
    count_two = count_two + parseInt(v / i);
  }

  for (let i=5; i<=v; i=i*5) {
    count_five = count_five + parseInt(v / i)
  }

  return [count_two, count_five];
}