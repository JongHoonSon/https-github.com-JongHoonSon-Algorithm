function solution(n,a,b)
{
    var answer = 0;
    
    let cnt = 1;

    while(true) {
        if(a%2===0 && a-b === 1) {
            answer = cnt;
            break;
        } else if (b%2 === 0 && b-a === 1) {
            answer = cnt;
            break;
        }
        
        a = Math.floor((a+1) / 2)
        b = Math.floor((b+1) / 2)
        
        cnt++;
    }

    return answer;
}