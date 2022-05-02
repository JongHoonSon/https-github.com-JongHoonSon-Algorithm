const fs = require('fs');
let input = fs.readFileSync("./dev/stdin").toString().trim().split('\n').map(v=>+v);
input.pop();
const answer = [];

const isPrimeArray = new Array(1000001).fill(true);
isPrimeArray[0] = isPrimeArray[1] = false;

let m;
let sqrt = Math.ceil(Math.sqrt(1000001));
for (let i = 2; i < sqrt; i++) {
  if(!isPrimeArray[i]) {
    continue;
  }
  let flag = true;
  for (let j=2; j<i; j++) {
    if(i%j === 0) {
      flag = false;
      break;
    }
  }
  if(flag) {
    for(let k = i+i; k<=1000000; k=k+i) {
      isPrimeArray[k]=false;
    }
  }
}

isPrimeArray[2]=false;

const prime_list = [];
isPrimeArray.forEach((v,i)=>{
  if(v){
    prime_list.push(i)
  }
})

input.forEach(v=>{
  for(let i = 0; i<prime_list.length; i++){
    if(prime_list[i]>v){
      answer.push(`Goldbach's conjecture is wrong.`);
    }
    let possible = false;
    for(let j = 0; j<prime_list.length; j++){
      if(prime_list[i]+prime_list[j]>v){
        break;
      }
      if(prime_list[i]+prime_list[j]==v){
        answer.push(`${v} = ${prime_list[i]} + ${prime_list[j]}`);
        possible = true;
      }
    }
    if(possible){
      break;
    }
  }
})

console.log(answer.join('\n'));