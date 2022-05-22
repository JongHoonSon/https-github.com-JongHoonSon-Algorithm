function solution(n, m) {
    var answer = [];
    
    if(n<m) {
        let temp = n;
        n = m;
        m = temp;
    }
    
    let low;
    
    let high;
    
    for(let i=1; i<=m; i++) {
        if(n%i === 0 && m%i === 0) {
            low = i;
        }
    }
    
    for(let i=n; i<=n*m; i++) {
        if(i%n === 0 && i%m === 0) {
            high = i;
            break;
        }
    }
    
    answer = [low, high];
    
    return answer;
}