function solution(n) {
    var answer = 0;
    
    let d = new Array(n+1);
    
    d[1] = 1;
    d[2] = 2;
    d[3] = 3;
    d[4] = 5;
    
    for(let i=5; i<=n; i++) {
            d[i] = (d[i-1] + d[i-2]) % 1234567;
    }
    
    answer = d[n] % 1234567;
    
    return answer;
}