function solution(a, b) {
    var answer = 1234567890;
    
    let sum = 0;
    
    for(let i=0; i<a.length; i++) {
        sum = sum+a[i]*b[i];
    }
    
    answer = sum;
    
    return answer;
}