function solution(msg) {
    const answer = [];
    const index = Array.from({length: 26}, (v, i) => String.fromCharCode(i + 65))
                        .reduce((acc, cur, i) => acc.set(cur, i + 1), new Map());
    let cnt = 0;
    
    while (msg[cnt]) {
        let wc = msg[cnt];
        
        if (cnt == msg.length - 1) {
            answer.push(index.get(wc));
            
            break;
        }
        
        for (let i = cnt + 1; i < msg.length; ++i) {
            wc += msg[i];
            ++cnt;

            if (!index.has(wc)) {
                index.set(wc, [...index.values()][index.size - 1] + 1);
                answer.push(index.get(wc.slice(0, -1)));
                
                break;
            }
            
            if (i == msg.length - 1) {
                answer.push(index.get(wc));
                ++cnt;
            }
        }
    }
    
    return answer;
}