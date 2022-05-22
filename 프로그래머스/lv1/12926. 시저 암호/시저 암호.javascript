function solution(s, n) {
    var answer = '';
    
    let newString = '';
    
    for(let i=0; i<s.length; i++) {
        let big;
        
        if(s[i] === " ") {
            newString = newString + " ";
            continue;
        } else if(s[i] >= 'A' && s[i] <= 'Z') {
            big = true;
        } else if (s[i] >= 'a' && s[i] <= 'z') {
            big = false;
        }
        
        let newIndex = s[i].charCodeAt() + n;
        if(big === true) {
            if(newIndex > "Z".charCodeAt()) {
                newIndex = newIndex - 26;
            }
        } else if (big === false) {
            if(newIndex > "z".charCodeAt()) {
                newIndex = newIndex - 26;
            }
        }
        newString = newString + String.fromCharCode(newIndex);
    }
    
    answer = newString;
    
    return answer;
}