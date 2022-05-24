function solution(n) {
    var answer = 0;
    
    let d = new Array(10001).fill(0);
    
    for(let i=1; i<=10000; i++) {
        let sum = 0;
        for(let j=i; sum<=10000; j++) {
            sum = sum + j;
            d[sum]++;
        }
    }

    answer = d[n];
    
    return answer;
}