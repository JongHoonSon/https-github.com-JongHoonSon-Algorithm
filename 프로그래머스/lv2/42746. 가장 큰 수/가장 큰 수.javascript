function solution(numbers) {
    var answer = '';
    
    let onlyZeroFlag = true;
    
    numbers.forEach(el => {
        if(el !== 0) {
            onlyZeroFlag = false;
        }
    })
    
    if(onlyZeroFlag) {
        return "0";
    }
    
    numbers.sort();
    numbers = numbers.reverse();
    
    console.log("numbers :", numbers);

    numbers.sort((a,b) => {
        if(a.toString().length !== b.toString().length) {
            return Number(b.toString() + a.toString()) - Number(a.toString() + b.toString()) ;
        }         
    })
    
    console.log("numbers :", numbers);

    
    answer = (numbers.join(""))
    
    return answer;
}