function solution(land) {
    var answer = 0;

    let row = land.length;
    let col = 4;
    
    let d = new Array(row);
    for(let i=0; i<row; i++) {
        d[i] = new Array(col);
    }
    
    let max = 0;
    
    
    for(let i=0; i<col; i++) {
        d[0][i] = land[0][i];
    }
    
    for(let i=1; i<row; i++) {
        for(let j=0; j<col; j++) {
            let max = 0;
            for(let k=0; k<col; k++) {
                if(j===k) {
                    continue;
                }
                if(max < d[i-1][k]) {
                    max = d[i-1][k];
                }
            }
            d[i][j] = land[i][j] + max;
        }
    }
    
    console.log(d);
    
    answer = Math.max(d[row-1][0], d[row-1][1], d[row-1][2], d[row-1][3]);
    
    return answer;
}