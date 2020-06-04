/**
 * BM 算法
 * 坏字符
 * 好后缀
 */

/**
 * 记录模式串中的字符最后出现的位置
 * 数组下标是字符的 ASCII 吗
 * 值是 最后出现的位置
 * 比如 a b d a
 * bc[97] = 3
 * bc[98] = 1
 * bc[100] = 2
 *
 * b: 模式串
 */
function generateBC(b) {
  const len = b.length
  const bc = []
  for (let i = 0; i < 256; i++) {
    bc[i] = -1
  }
  for (let i = 0; i < len; i++) {
    bc[b.charCodeAt(i)] = i
  }
  return bc
}

/**
 * 例如：
 * c a b c a b
 *
 * 后缀子串  长度  suffix         prefix
 * b         1   suffix[1]=2    false
 * ab        2   suffix[2]=1    false
 * cab       3   suffix[3]=0    true
 * bcab      4   suffix[4]=-1   false
 * abcab     5   suffix[5]=-1   false
 */
function generateGS(b) {
  const len = b.length
  const suffix = []
  const prefix = []
  for (let i = 0; i < len; i++) {
    suffix[i] = -1
    prefix[i] = false
  }
  /**
   * c a b 与 c a b c a b
   * 的公共后缀有 b, a b, c a b
   */
  for (let i = 0; i < len - 1; i++) {
    let j = i
    let k = 0 // 公共后缀子串长度
    while (j >= 0 && b[j] === b[len - i - k]) {
      --j
      ++k
      suffix[k] = j + 1
    }
    if (j == -1) prefix[k] = true // 如果公共后缀子串也是模式串的前缀子串
  }
  return {suffix, prefix}
}

/**
 * @param {*} a 主串
 * @param {*} b 模式字符串
 */
function bm(a, b) {
  const aLen = a.length
  const bLen = b.length
  const bc = generateBC(b)
  const {suffix, prefix} = generateGS(b)
  let i = 0
  while (i <= aLen - bLen) {
    let j
    for (j = bLen - 1; j >= 0; j--) {
      if (a[i + j] !== b[j]) break
    }
    if (j < 0) return i
    // 坏字符要移动的位置
    const x = j - bc[a.charCodeAt(i + j)]
    let y = 0
    if (j < bLen - 1) {
      // 有好后缀
      y = moveByGS(j, bLen, suffix, prefix)
    }
    i = i + Math.max(x, y)
  }
  return -1
}

/**
 *
 * @param {*} j 坏字符对应的模式串中的字符下标
 * @param {*} m 模式串长度
 * @param {*} suffix
 * @param {*} prefix
 */
function moveByGS(j, m, suffix, prefix) {
  const k = m - 1 - j // 好后缀长度
  if (suffix[k] != -1) return j - suffix[k] + 1
  // 好后缀的后缀子串
  for (let r = j + 2; r <= m - 1; r++) {
    if (prefix[m - r]) return r
  }
  return m
}

console.log(bm('bbac', 'ac'))
