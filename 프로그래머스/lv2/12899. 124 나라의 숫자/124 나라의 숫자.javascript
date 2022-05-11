function solution(n) {
    var answer = [];
    
    const numArr = [4, 1, 2];
    
    while(n) {
        const rest = n%3;
        
        answer.push(numArr[rest]);
        
        if(n%3 === 0) {
            n = n/3 -1;
        } else {
            n = Math.floor(n/3);
        }
    }
    
    return answer.reverse().join("");
}