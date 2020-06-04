const candy = [2, 5, 3, 7, 9, 10]
const requests = [5, 6, 9, 80, 90]

function divide(candy, requests) {
  candy.sort((a, b) => a - b)
  requests.sort((a, b) => a - b)
  const result = []
  let i = 0
  let j = 0
  const requestsLen = requests.length
  const candyLen = candy.length
  while (i < requestsLen) {
    const request = requests[i]
    while (candy[j] < request && j < candyLen) {
      j++
    }
    if (j >= candyLen) break
    result.push({
      candy: candy[j++],
      request,
    })
    i++
  }
  return result
}

console.log(JSON.stringify(divide(candy, requests)))
