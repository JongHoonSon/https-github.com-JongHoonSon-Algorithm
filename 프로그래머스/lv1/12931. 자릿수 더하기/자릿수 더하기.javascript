function solution(n)
{
    var answer = 0;
    
    let sum=0;
    
    let stringN = n.toString();
    
    for(let i=0; i<stringN.length; i++) {
        sum = sum + Number(stringN[i]);
    }
    
    answer = sum;

    return answer;
}