function solution(n, s) {
    var answer = [];
    
    let avg = Math.floor(s/n);
    
    let gap = s - avg*n;
    
    let arr = new Array(n).fill(avg);
    
    if(s === 1 || s < n) {
        answer = [-1];
    } else {
        for(let i=0; i<gap; i++) {
            arr[i]++;
        }
        
        for(let i=0; i<arr.length; i++) {
            answer.push(arr[i]);
        }

        answer.sort((a,b) => a-b)   
    }
    
    return answer;
}