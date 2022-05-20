function solution(tickets) {
    let answer;
    
    const arr = [...tickets].sort();
    let visit = new Array(tickets.length).fill(0);
    
    dfs(arr, 'ICN', [], 0);
    
    function dfs(tickets, start, res, cnt) {
    res.push(start);
    
    if (cnt === tickets.length) {
        answer = res;
        return true;
    }
    
    for (let i=0; i<tickets.length; i++) {
        if (visit[i] === 0 && tickets[i][0] === start) {
            visit[i] = 1;
            
            const result = dfs(tickets, tickets[i][1], res, cnt + 1);
            
            if (result) return true;
            
            visit[i] = 0;
            res.pop();
        }
    }
    return false;
}
    
    return answer;
}