function solution(A, B) {
    var answer = -1;
    
    A.sort((a,b) => a-b);
    B.sort((a,b) => a-b);
    
    let wins=0;
    let indexA=0;
    let indexB=0;
    
    while(true) {
        if(B[indexB] > A[indexA]) {
            indexA++;
            indexB++;
            wins++;
        } else {
            indexB++;
        }
        
        if(indexB === B.length) {
            break;
        }
    }
    
    answer = wins;
    
    return answer;
}