function solution(A,B){
    var answer = 0;
    
    A.sort((a,b) => a-b);
    B.sort((a,b) => a-b);
    
    let sum=0;
    
    for(let i=0; i<A.length; i++) {
        let a = A[i];
        let b = B[B.length-i-1];
        
        sum = sum + (a*b);
    }

    answer = sum;    
    
    return answer;
}