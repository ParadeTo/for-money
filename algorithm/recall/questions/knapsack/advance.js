/**
 * 最简单的 0-1 背包问题
 * 物品重量：
 * w = [1, 2, 4, 1, 3, 6, 2]
 * 背包容量
 * maxW = 10
 * 求把哪些东西放到背包中可以使得最后拿到的物品总重量最大
 */

const packW = 9
const w = [2, 2, 4, 6, 3]
const v = [3, 4, 8, 9, 6]
let result = null
let maxV = -1
const mem = [] // 备忘录 mem[i][j] 记录决策第 i 个物品时背包总重量为 j 时的总价值
/**
 *
 * @param {*} arr 已经放入的物品
 * @param {*} currentW 已经放入物品的总重量
 * @param {*} currentV 已经放入物品的总价值
 * @param {*} k 当前第几个
 */
function search(arr, currentW, currentV, k) {
  // 背包已满或者已经遍历完物品
  if (currentW === packW || k === w.length) {
    // 记下当前最大的
    if (currentV > maxV) {
      result = [...arr]
      maxV = currentV
    }
    return
  }
  // 当前总价值小于备忘录里相同状态的总价值，剪枝
  if (mem[k] && mem[k][currentW] && currentV < mem[k][currentW]) return
  if (!mem[k]) mem[k] = []
  mem[k][currentW] = currentV
  // 第 k 个不放进背包
  search(arr, currentW, currentV, k + 1)

  // 第 k 个放进背包
  if (w[k] + currentW <= packW) {
    arr.push(k)
    search(arr, currentW + w[k], currentV + v[k], k + 1)
    arr.pop()
  }
}

function printResult() {
  for (let i = 0; i < result.length; i++) {
    console.log(
      `选择第 ${result[i]} 件物品，重量为 ${w[result[i]]}, 价值为 ${
        v[result[i]]
      }`
    )
  }
}

search([], 0, 0, 0)

printResult()
