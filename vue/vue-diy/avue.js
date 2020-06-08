function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  })
}
class Watcher {
  constructor(vm, exp, updateFn) {
    this.vm = vm
    this.exp = exp
    this.updateFn = updateFn

    // 标记当前的 watcher
    Dep.target = this
    // 读一下当前key，触发依赖收集
    vm.getVal(exp)
    // 依赖完成后重置一下
    Dep.target = null
  }

  // 未来会被dep调用
  update() {
    this.updateFn.call(this.vm, this.vm.getVal(this.exp))
  }
}
class Dep {
  constructor() {
    this.deps = []
  }

  addDep(watcher) {
    this.deps.push(watcher)
  }

  notify() {
    this.deps.forEach((dep) => dep.update())
  }
}

function defineReactive(obj, key, val) {
  const dep = new Dep()
  observe(val)
  // 这里形成了一个闭包
  // val这个内部变量会被外部访问到
  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.addDep(Dep.target)
      }
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        val = newVal
        observe(newVal)
        dep.notify()
      }
    },
  })
}

function observe(value) {
  if (typeof value !== 'object' || value == null) {
    return
  }

  // 创建Observer实例:以后出现一个对象，就会有一个Observer实例
  return new Observer(value)
}

class Observer {
  constructor(value) {
    this.value = value
    // 使用 defineProperty，避免 __ob__ 被遍历到
    def(value, '__ob__', this)
    this.walk(value)
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key])
    })
  }
}

function proxy(vm) {
  Object.keys(vm.$data).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(val) {
        vm.$data[key] = val
      },
    })
  })

  Object.keys(vm.$methods).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$methods[key]
      },
    })
  })
}

class AVue {
  constructor(options) {
    // 保存选项
    this.$options = options
    this.$data = options.data
    this.$methods = options.methods

    observe(this.$data)

    // 代理，使得访问 vm.a 时可以访问到 vm.$data.a
    proxy(this)

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
      } else if (attrName.indexOf('@') === 0) {
        const dir = attrName.substring(1)
        this[dir] && this[dir](node, exp)
      }
    })
  }

  click(node, exp) {
    node.addEventListener('click', this.$vm[exp].bind(this.$vm))
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

    new Watcher(this.$vm, exp, () => {
      fn && fn(node, this.$vm.getVal(exp))
    })
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
