/**
 * 假设我们有几种不同币值的硬币 v1，v2，……，vn（单位是元）。如果我们要支付 w 元，求最少需要多少个硬币。
 */

const coins = [1, 3, 5, 3, 3, 4]
const price = 9

/**
 * 回溯方法
 */
function recall() {
  let result = []
  let minNum = Infinity
  // mem[i][j] 记录决策完第 i 个硬币时金额为 j 时的最小硬币数量
  const mem = []
  /**
   * @param {*} i 第几个硬币
   * @param {*} p 当前的金额
   * @param {*} num 硬币数量
   * @param {*} arr 当前选择的硬币
   */
  function searchMinNum(i, p, num, arr) {
    if (i === coins.length) {
      if (num < minNum && p === price) {
        minNum = num
        result = [...arr]
      }
      return
    }

    if (p === price) {
      if (num < minNum) {
        minNum = num
        result = [...arr]
      }
      return
    }

    if (mem[i] && mem[i][p] && num >= mem[i][p]) return
    if (!mem[i]) mem[i] = []
    mem[i][p] = num

    // 不选择第 i 个硬币
    searchMinNum(i + 1, p, num, arr)
    // 选择第 i 个硬币
    if (p + coins[i] <= price) {
      arr.push(i)
      searchMinNum(i + 1, p + coins[i], num + 1, arr)
      arr.pop()
    }
  }
  searchMinNum(0, 0, 0, [])
  return result
}

console.log(recall())
