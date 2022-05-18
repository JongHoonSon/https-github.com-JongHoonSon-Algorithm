function solution(strings, n) {
    var answer = [];
    
    // console.log("strings[0].length", strings[0].length);
    
    strings.sort((a, b) => {
        if(a[n] > b[n]) return 1;
        if(a[n] < b[n]) return -1;
        if(a[n] === b[n]) {
            if(a>b) return 1;
            if(a<b) return -1;
            return 0;
        }
    })
    
    answer = strings;
    
    return answer;
}