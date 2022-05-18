function solution(a, b) {
    var answer = 0;
    
    let sum = 0;
    
    if(a>b) {
        let temp = a;
        a = b;
        b = temp;
    }
    
    for(let i=a; i<=b; i++) {
        sum = sum+i;
    }
    
    answer = sum;
    
    return answer;
}