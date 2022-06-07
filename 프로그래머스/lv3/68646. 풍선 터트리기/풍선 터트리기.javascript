function solution(a) {
    var answer = 0;
    
    let lastIndex = a.length-1;
    
    
    let minLeft = new Array(a);
    
    minLeft[0] = a[0];
    
    for(let i=1; i<a.length; i++) {
        minLeft[i] = Math.min(minLeft[i-1], a[i]);
    }
    
    console.log(minLeft);
    
    
    let minRight = new Array(a);
    
    minRight[lastIndex] = a[lastIndex];
    
    for(let i=lastIndex-1; i>=0; i--) {
        minRight[i] = Math.min(minRight[i+1], a[i]);
    }
    
    console.log(minRight);
    
    
    let cnt=0;
    
    for(let i=0; i<a.length; i++) {
        if(minLeft[i] < a[i] && minRight[i] < a[i]) {
            continue;
        }
        
        cnt++;
    }
    
    answer = cnt;
    
    return answer;
}