function solution(word) {
    let answer = 0;
        // 종 문자열 길이 
        let length = word.length;
        // 종류의 수
        let numberOfWords = 5;
        // 경우의 수 총합 
        let max = 0;
        for(let i = 1; i <= numberOfWords; i++) {
            max += Math.pow(numberOfWords, i);
        }
        //  ['A', 'E', 'I', 'O', 'U'] 순서 [0, 1, 2, 3, 4]
        for (let i = 1; i <= length; i++) {
            if (word.charAt(i-1) == 'A') {
                answer += 1;
            } else if (word.charAt(i-1) == 'E') {
                answer += (Math.floor(max / Math.pow(numberOfWords, i)) * 1) + 1;
            } else if (word.charAt(i-1) == 'I') {
                answer += (Math.floor(max / Math.pow(numberOfWords, i)) * 2) + 1;
            } else if (word.charAt(i-1) == 'O') {
                answer += (Math.floor(max / Math.pow(numberOfWords, i)) * 3) + 1;
            } else {
                answer += (Math.floor(max / Math.pow(numberOfWords, i)) * 4) + 1;
            }
        }

        return answer;
}