function solution(s) {
    var answer = '';
    
    let newString = '';
    
    let nth = 0;
    
    let newIndex;
    
    for(let i=0; i<s.length; i++) {
        if(s[i] === " ") {
            newString = newString + " ";            
            nth = 0;
        } else {
            if(nth%2 === 0) {
                if(s[i] >= "a" && s[i] <= "z") {
                    newIndex = s[i].charCodeAt()-32;
                    newString = newString + String.fromCharCode(newIndex);    
                } else {
                    newString = newString+s[i];
                }
            } else if(nth%2 === 1) {
                if(s[i] >= "A" && s[i] <= "Z") {
                    newIndex = s[i].charCodeAt()+32;
                    newString = newString + String.fromCharCode(newIndex);    
                } else {
                    newString = newString+s[i];
                }
            }
            nth++;
        }
    }
    
    answer = newString;
    
    return answer;
}