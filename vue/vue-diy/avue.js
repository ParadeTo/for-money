class AVue {
  constructor(options) {
    // 保存选项
    this.$options = options
    this.$data = options.data
    this.$methods = options.methods

    // 编译器
    new Compiler(options.el, this)
  }

  getVal(exp) {
    // 将匹配的值用 . 分割开，如 vm.data.a.b
    exp = exp.split('.')

    // 归并取值
    return exp.reduce((prev, next) => {
      return prev[next]
    }, this.$data)
  }

  setVal(exp, newVal) {
    exp = exp.split('.')
    return exp.reduce((prev, next, currentIndex) => {
      // 如果当前归并的为数组的最后一项，则将新值设置到该属性
      if (currentIndex === exp.length - 1) {
        return (prev[next] = newVal)
      }

      // 继续归并
      return prev[next]
    }, this.$data)
  }
}

class Compiler {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)

    // 执行编译
    this.compile(this.$el)
  }

  compile(el) {
    // 遍历这个el
    el.childNodes.forEach((node) => {
      // 是否是元素
      if (node.nodeType === 1) {
        this.compileElement(node)
      } else if (this.isText(node)) {
        this.compileText(node)
      }

      // 递归
      if (node.childNodes) {
        this.compile(node)
      }
    })
  }

  // 解析绑定表达式{{}}
  compileText(node) {
    // 获取正则匹配表达式，从vm里面拿出它的值
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')
  }

  // 编译元素
  compileElement(node) {
    // 处理元素上面的属性，典型的是a-，@开头的
    const attrs = node.attributes
    Array.from(attrs).forEach((attr) => {
      const attrName = attr.name
      const exp = attr.value
      if (attrName.indexOf('a-') === 0) {
        // 截取指令名称
        const dir = attrName.substring(2)
        // 看看是否存在对应方法，有则执行
        this[dir] && this[dir](node, exp)
      }
    })
  }

  // k-text
  text(node, exp) {
    this.update(node, exp, 'text')
  }

  // k-html
  html(node, exp) {
    this.update(node, exp, 'html')
  }

  update(node, exp, dir) {
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm.getVal(exp))
  }

  textUpdater(node, val) {
    node.textContent = val
  }

  htmlUpdater(node, val) {
    node.innerHTML = val
  }

  // 文本节点且形如{{xx}}
  isText(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}
