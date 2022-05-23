function solution(board)
{
    var answer = 1234;
    
    if(board.length === 1 && board[0].length === 1) {
        return 1;
    }

    let d = new Array(board.length);
    
    for(let i=0; i<d.length; i++) {
        d[i] = new Array(board[0].length).fill(0);
    }
    
    console.log("d");
    console.log(d);
    
    let max = 0;
    for(let i=1; i<board.length; i++) {
        for(let j=1; j<board[0].length; j++) {
                if(board[i][j] > 0) {
                    let min = Math.min(board[i-1][j-1], board[i-1][j], board[i][j-1])
                board[i][j] = min + 1;
                if(board[i][j] > max) {
                    max = board[i][j];
                }
            }
        }
    }
    
    answer = max*max;

    return answer;
}