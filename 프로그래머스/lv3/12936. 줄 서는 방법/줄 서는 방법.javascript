function solution(n, k) {
    var answer = [];
    
    // 인덱스와 일치를 위해 k - 1로 초기화한다.
    let nth = k - 1;
    
    // 주어진 n을 이용하여 [1, 2, 3, 4, ..., n] 형태의
    // 배열을 만들어준다.
    const arr = new Array(n).fill(0); 
    for(let i = 0; i < n; i++) {
      arr[i] = i + 1;
    }
    
    while(arr.length) {
        if(nth === 0) {
          answer.push(...arr);
          break;
        }

        const fact = factorial(arr.length - 1);
        const index = Math.floor(nth / fact);
        nth = nth % fact;

        answer.push(arr[index]);
        arr.splice(index, 1);
      }
    
    return answer;
}

// n팩토리얼의 값을 돌려주는 함수
const factorial = (n) => {
    let res = 1;
    for(let i = 2; i <= n; i++) res *= i;
    return res;
}