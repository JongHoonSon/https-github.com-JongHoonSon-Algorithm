function solution(n, left, right) {
  let arr = []

  for (let i = left; i <= right; i++) {
    let j = Math.floor(i / n) - i % n
    j = j < 0 ? 0 : j
    arr.push(i % n + 1 + j)
  }

  return arr
}