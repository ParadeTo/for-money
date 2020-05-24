/**
 * 最简单的 0-1 背包问题
 * 物品重量：
 * w = [1, 2, 4, 1, 3, 6, 2]
 * 背包容量
 * maxW = 10
 * 求把哪些东西放到背包中可以使得最后拿到的物品总重量最大
 */

const packW = 9
const w = [2, 2, 4, 6, 3, 7]
const v = [3, 4, 8, 9, 6, 14]
let result = null
let maxW = -1
const state = [] // state[i][j] 记录决策完第 i 个物品后背包总重量为 j 的最大总价值
const isPlaced = [] // state[i][j] 记录决策完第 i 个物品后背包总重量为 j 时 i 这个物品是否放进去了

function search() {
  state[0] = []
  isPlaced[0] = []
  state[0][w[0]] = v[0]
  isPlaced[0][w[0]] = 1
  state[0][0] = 0
  for (let i = 1; i < w.length; i++) {
    if (!state[i]) {
      state[i] = []
      isPlaced[i] = []
    }
    for (let j = 0; j <= packW; j++) {
      if (state[i - 1][j] !== undefined) {
        // 不放
        if (state[i][j] === undefined || state[i - 1][j] > state[i][j])
          state[i][j] = state[i - 1][j]

        const _v = state[i - 1][j] + v[i]
        // 放
        if (
          w[i] + j <= packW &&
          (_v >= state[i][w[i] + j] || state[i][w[i] + j] === undefined)
        ) {
          state[i][w[i] + j] = _v
          isPlaced[i][w[i] + j] = 1
        }
      }
    }
  }
}

function printResult() {
  let ww = 0
  let maxV = -1
  for (let i = packW; i >= 0; i--) {
    if (state[w.length - 1][i] > maxV) {
      ww = i
      break
    }
  }
  let _w = ww

  for (let i = w.length - 1; i >= 0; i--) {
    if (i === 0) {
      if (state[i][_w])
        console.log(`选择第 ${i} 件物品，重量为 ${w[i]}, 价值为 ${v[i]}`)
      return
    }
    // 上一个物品的状态跟当前一样，说明当前这个物品没有放入
    if (state[i - 1][_w] <= state[i][_w]) {
      console.log(`选择第 ${i} 件物品，重量为 ${w[i]}, 价值为 ${v[i]}`)
      _w = _w - w[i]
      if (_w < 0) throw '结果不对'
      if (_w === 0) break
    }
  }
}

// 00 01 02 03 04 05 06 07 08 09

// 00 ** 03 ** ** ** ** ** ** **

// 00 ** 04 ** 07 ** ** ** ** **

// 00 ** 04 ** 08 ** 12 ** 15 **

// 00 ** 04 ** 08 ** 12 ** 15 **

// 00 ** 04 06 08 10 12 14 15 18

function printState() {
  console.log('00 01 02 03 04 05 06 07 08 09')
  for (let i = 0; i < state.length; i++) {
    let str = ''
    for (let j = 0; j <= packW; j++) {
      str +=
        (state[i][j] === undefined
          ? '**'
          : state[i][j] < 10
          ? '0' + state[i][j]
          : state[i][j]) + ' '
    }
    console.log(str + '\n')
  }
}

function printIsPlaced() {
  console.log('00 01 02 03 04 05 06 07 08 09')
  for (let i = 0; i < isPlaced.length; i++) {
    let str = ''
    for (let j = 0; j <= packW; j++) {
      str +=
        (isPlaced[i][j] === undefined
          ? '**'
          : isPlaced[i][j] < 10
          ? '0' + isPlaced[i][j]
          : isPlaced[i][j]) + ' '
    }
    console.log(str + '\n')
  }
}

search()
printState()
printIsPlaced()
printResult()
