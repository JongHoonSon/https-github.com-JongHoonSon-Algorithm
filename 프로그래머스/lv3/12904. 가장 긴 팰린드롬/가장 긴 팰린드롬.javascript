function solution(s)
{
    var answer = 0;
    
    let maxLength = 0;
    
    let stack = [];

    // 부분 문자열의 길이
    out:
    for(let i=s.length; i>=1; i--) {
        
        // 부분문자열의 시작 위치
        for(let j=0; j<=s.length-i; j++) {
            let front = j;
            let back = i+j-1;
            
            while(true) {
                if(front === back || front-1 === back) {
                    maxLength = i
                    break out;
                } else if(s[front] === s[back]) {
                    front++;
                    back--;
                } else if(s[front] !== s[back]) {
                    break;
                }
            }
        }
    }
    
    answer = maxLength;

    return answer;
}