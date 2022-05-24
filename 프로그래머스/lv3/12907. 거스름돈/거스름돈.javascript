function solution(n, money) {
    var answer = 0;
    
    let d = new Array(n+1).fill(0);
    
    d[0] = 1;
    
    for(let i=0; i<money.length; i++) {
        for(let j=0; j<=n; j++) {
            if(j >= money[i]) {
                d[j] = d[j] + d[j - money[i]];
            }
        }
    }
    
    answer = d[n];
    
    return answer;
}