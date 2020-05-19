const result = []

function search(arr = [], row = 0) {
  if (row === 0) {
    for (let i = 0; i < 8; i++) {
      arr = [i]
      search(arr, 1)
    }
    return
  }
  for (let i = 0; i < 8; i++) {
    let isValid = true
    for (let j = 0; j < row; j++) {
      if (
        arr[j] !== undefined &&
        (arr[j] === i || arr[j] - i === j - row || arr[j] - i === row - j)
      ) {
        isValid = false
        break
      }
    }
    if (isValid) {
      arr[row] = i
      if (row !== 7) {
        search(arr, row + 1)
      } else result.push([...arr])
    }
  }
}

search()

function print(arr) {
  let str = ''
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (arr[i] === j) str += 'Q '
      else str += '* '
      if (j === 7) str += '\n'
    }
  }
  console.log(str)
}

print(result[0])
