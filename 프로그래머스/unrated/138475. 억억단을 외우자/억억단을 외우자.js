function solution(e, starts) {
    const numsArr = new Array(e+1).fill(0);

    for(let i = 1;i<=e;i++) {
        for(let j = i;j<=e;j += i) {
            numsArr[j] += 1;
        }
    }
    
    const maxArr = new Array(e+1).fill(e);
   
    for(let i=e-1; i>0; i--) {
    
        if(numsArr[i] >= numsArr[maxArr[i+1]]) {
        
            maxArr[i] = i;

        } else {
            maxArr[i] = maxArr[i+1];
        }
    }
    
    return starts.map(s => maxArr[s]);
}