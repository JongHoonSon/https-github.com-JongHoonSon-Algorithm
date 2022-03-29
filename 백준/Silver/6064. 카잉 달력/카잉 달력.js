var fs = require('fs');
var input = fs.readFileSync('./dev/stdin').toString().split('\n');

const testCaseNum = +input.shift();
const answer = [];

for(let j=0; j<testCaseNum; j++) {
    const line = input[j];
    const lineArray = line.split(' ').map(v=>+v);
    // console.log(lineArray);
    
    let M = lineArray[0];
    let N = lineArray[1];
    let x = lineArray[2];
    let y = lineArray[3];
    
    let last = lcm(N,M)


    while(true){
        if(x>last || y>last){  // 멸망
            answer.push(-1)
            break;
        } else if(x>y){ //  // x가 더 크면 y를 더해줌. 
            y+=N 
        } else if(x<y){ //  y가 더 크면 x를 더해줌
            x+=M
        } else{         // x랑 y 가 같다면 그게 정답. 
            answer.push(x)  
            break;
        }
    }
}
  
  //출력
  console.log(answer.join('\n'))
  
  
  //최대 공약수 구하기.
  function gcd(a,b){
    if(b==0) return a;
    return a>b ? gcd(b,a%b) : gcd(a,b%a);
  }
  
  //최대 공배수 구하기
  function lcm(a,b){
    return (a*b)/gcd(a,b);
  }




// 카잉 달력 후기

// 처음에는 주어지는 두 수 M과 N의 최대공약수와 최소공배수를 구하고
// i = i + 최소공배수 (i = i + 1보다 시간이 절약됨) 해가면서 전체를 뒤지면서
// i%M과 i%N 이 각각 x와 y로 떨어지는 i를 찾으려고 했지만,
// 이 방법 또한 시간초과가 떴고 결국 인터넷에서 답을 찾았다.

// 카잉 달력 문제 풀이 접근 방식

// 1. x와 y중에서 작은 값에 x 값에는 M, y 값에는 N을 계속 더한다.
// 2. 어느 시점에서 x===y가 된다.
// 3. x===y일 때의 x, y 값이 정답이다.
// 4. 여러가지 예제로 실험해봤을 때 답이 나오긴 하지만,
//    어떻게 이런식으로 접근할 수 있는지 완전히 이해가 가지는 않는다.