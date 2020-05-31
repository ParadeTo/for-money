/**
 * 动态规划解法
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const len1 = word1.length
  const len2 = word2.length

  const matrix = []

  for (let i = 0; i <= len1; i++) {
    matrix[i] = new Array()
    for (let j = 0; j <= len2; j++) {
      if (i === 0) {
        matrix[i][j] = j
      } else if (j === 0) {
        matrix[i][j] = i
      } else {
        if (word1[i - 1] !== word2[j - 1]) {
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j - 1] + 1
          )
        } else {
          // 不等于时只需要考虑这种情况，但是还没有经过证明
          matrix[i][j] = matrix[i - 1][j - 1]
        }
      }
    }
  }

  function printArr() {
    for (let i = 0; i < matrix.length; i++) {
      let str = ''
      for (let j = 0; j < matrix[i].length; j++) {
        str += matrix[i][j] + '\t'
      }
      console.log(str)
    }
  }

  function editPath() {
    let i = len1
    let j = len2
    const steps = []
    while (i > 0 || j > 0) {
      if (matrix[i][j] === matrix[i - 1][j] + 1) {
        steps.unshift({
          type: j === len2 ? 'add' : 'insert',
          target: 'word2',
          char: word1[i - 1],
        })
        i--
      } else if (matrix[i][j] === matrix[i][j - 1] + 1) {
        steps.unshift({
          type: i === len1 ? 'add' : 'insert',
          target: 'word1',
          char: word2[j - 1],
        })
        j--
      } else if (matrix[i][j] === matrix[i - 1][j - 1] + 1) {
        steps.unshift({
          type: 'replace',
          target: 'word1',
          oldChar: word1[i - 1],
          char: word2[j - 1],
        })
        i--
        j--
      } else {
        steps.unshift({
          type: 'none',
        })
        i--
        j--
      }
    }

    for (let i = 0; i < steps.length; i++) {
      const {type, target, char, oldChar} = steps[i]
      if (type === 'add' || type === 'insert') {
        console.log(`${target}: ${type} ${char}`)
      } else if (type === 'replace') {
        console.log(`${target}: ${type} ${oldChar} with ${char}`)
      }
    }
  }

  printArr()
  editPath()
  return matrix[len1][len2]
}

minDistance('agdhksdg', 'acetib')
