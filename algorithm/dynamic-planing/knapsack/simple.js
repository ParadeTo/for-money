/**
 * 最简单的 0-1 背包问题
 * 物品重量：
 * w = [1, 2, 4, 1, 3, 6, 2]
 * 背包容量
 * maxW = 10
 * 求把哪些东西放到背包中可以使得最后拿到的物品总重量最大
 */

const packW = 9
const w = [3, 5, 9, 3, 4]
let result = null
let maxW = -1
const state = [] // 备忘录 state[i][j] 记录决策完第 i 个物品后背包总重量为 j 的状态

function search() {
  state[0] = []
  state[0][w[0]] = true
  state[0][0] = true
  for (let i = 1; i < w.length; i++) {
    if (!state[i]) state[i] = []
    for (let j = 0; j < packW; j++) {
      if (state[i - 1][j]) {
        // 放
        if (w[i] + j <= packW) state[i][w[i] + j] = true
        // 不放
        state[i][j] = true
      }
    }
  }
}

function printResult() {
  let max = 0
  for (let i = packW; i >= 0; i--) {
    if (state[w.length - 1][i]) {
      max = i
      break
    }
  }
  let _w = max

  for (let i = w.length - 1; i >= 0; i--) {
    if (i === 0) {
      if (state[i][_w]) console.log(`选择第 ${i} 件物品，重量为 ${w[i]}`)
      return
    }
    if (!state[i - 1][_w]) {
      console.log(`选择第 ${i} 件物品，重量为 ${w[i]}`)
      _w = _w - w[i]
      if (_w === 0) break
    }
  }
}

search()
printResult()
