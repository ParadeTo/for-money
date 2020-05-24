/**
 * * 匹配 >= 0 个
 */
class Reg {
  constructor(reg) {
    this.matched = false
    this.strLen = 0
    this.reg = reg
    this.regLen = reg.length
  }

  test(str) {
    this.matched = false
    this.strLen = str.length
    this._match(str, 0, 0)
    return this.matched
  }

  _match(str, strIndex, regIndex) {
    if (this.matched) return
    // 正则表达式到结尾了
    if (regIndex === this.regLen) {
      // 字符串也到结尾了
      if (strIndex === this.strLen) this.matched = true
      return
    }
    if (this.reg[regIndex] === '*') {
      for (let i = strIndex; i < this.strLen; i++) {
        this._match(str, i, regIndex + 1)
      }
    } else if (str[strIndex] === this.reg[regIndex]) {
      this._match(str, strIndex + 1, regIndex + 1)
    }
  }
}

// test 1
// const r = new Reg('ab*cd')
// console.log(r.test('abasdgsdgcd')) // true
// console.log(r.test('abcd')) // true
// console.log(r.test('acd')) // false

// test 2
// 不能处理这种情况
const r2 = new Reg('a*')
console.log(r2.test('a')) // true
// console.log(r2.test('abcd')) // true
// console.log(r2.test('acd')) // false
