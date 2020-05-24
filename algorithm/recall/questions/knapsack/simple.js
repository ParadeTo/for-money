/**
 * 最简单的 0-1 背包问题
 * 物品重量：
 * w = [1, 2, 4, 1, 3, 6, 2]
 * 背包容量
 * maxW = 10
 * 求把哪些东西放到背包中可以使得最后拿到的物品总重量最大
 */

const packW = 10
const w = [3, 5, 9, 4, 4]
let result = null
let maxW = -1
const mem = [] // 备忘录 mem[i][j] 记录决策第 i 个物品时背包总重量为 j 的状态是否存在过
/**
 *
 * @param {*} arr 已经放入的物品
 * @param {*} 已经放入物品的总重量
 * @param {*} k 当前第几个
 */
function search(arr, currentW, k) {
  // 背包已满或者已经遍历完物品
  if (currentW === packW || k === w.length) {
    // 记下当前最大的
    if (currentW > maxW) {
      result = [...arr]
      maxW = currentW
    }
    return
  }
  if (mem[k] && mem[k][currentW]) return
  if (!mem[k]) mem[k] = []
  mem[k][currentW] = true
  // 第 k 个不放进背包
  search(arr, currentW, k + 1)

  // 第 k 个放进背包
  if (w[k] + currentW <= packW) {
    arr.push(k)
    search(arr, currentW + w[k], k + 1)
    arr.pop()
  }
}

function printResult() {
  for (let i = 0; i < result.length; i++) {
    console.log(`选择第 ${result[i]} 件物品，重量为 ${w[result[i]]}`)
  }
}

search([], 0, 0)

printResult()
