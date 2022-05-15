function solution(arr)
{
    var answer = [];
    
    let prev = arr[0];
    answer.push(arr[0]);
    
    arr.forEach(el => {
        if(el!==prev) {
            prev = el;
            answer.push(el);
        }
    })
    
    return answer;
}