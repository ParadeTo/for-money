class Store {
  constructor(options) {
    const {state, mutations, actions, getters} = options

    Vue.util.defineReactive(this, '_state', state)

    this._mutations = mutations
    this._actions = actions
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)

    this.getters = {}
    Object.keys(getters).forEach((key) => {
      const fn = () => getters[key](this._state)
      Object.defineProperty(this.getters, key, {
        get() {
          return fn()
        },
      })
    })
  }

  commit(type, payload) {
    const entry = this._mutations[type]

    if (!entry) {
      console.error('没有这个mutation')
      return
    }

    entry(this.state, payload)
  }

  dispatch(type, payload) {
    const entry = this._actions[type]

    if (!entry) {
      console.error('没有这个action')
      return
    }

    entry(this, payload)
  }

  get state() {
    return this._state
  }

  set state(val) {
    console.warn('这样做不太好吧')
  }
}

const install = function (Vue) {
  Vue.mixin({
    beforeCreate() {
      // 只有根组件上面会有这个
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    },
  })
}

const Vuex = {
  Store,
  install,
}
