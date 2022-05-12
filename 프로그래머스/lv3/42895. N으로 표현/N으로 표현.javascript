function solution(N, number) {
    var answer = 0;
    
    let memo = Array.from(new Array(9), () => new Set());
    
    if(N===number) {
        return 1;
    }
    else {
        for(let i=1; i<memo.length; i++) {
            memo[i].add(Number(String(N).repeat(i)))
        }
        for(let i=1; i<=8; ++i) {
            for(let j=1; j<i; ++j) {
                for(let first of memo[j]) {
                    for(let second of memo[i-j]) {
                        memo[i].add(first+second);
                        memo[i].add(first-second);
                        memo[i].add(first*second);
                        memo[i].add(first/second);
                    }
                }
            }
            if(memo[i].has(number)) return i;
        }
        return -1;
    }
    
    return answer;
}