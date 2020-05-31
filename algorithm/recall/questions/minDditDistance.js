/**
 * 回溯法解法
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const len1 = word1.length
  const len2 = word2.length
  let minDis = Infinity

  function _min(i, j, dis) {
    if (i == len1 || j == len2) {
      /**
       * 比如
       * ab
       * abcdgfg
       * i 为 2
       * j 为 4
       * dis 为 2
       */
      if (i < len1) dis += len1 - i
      if (j < len2) dis += len2 - j
      if (dis < minDis) minDis = dis
      return
    }

    if (word1[i] === word2[j]) {
      _min(i + 1, j + 1, dis)
    } else {
      _min(i, j + 1, dis + 1)
      _min(i + 1, j, dis + 1)
      _min(i + 1, j + 1, dis + 1)
    }
  }

  _min(0, 0, 0)
  return minDis
}

console.log(minDistance('', 'ab'))
