class VueRouter {
  constructor(options) {
    this.routes = options.routes

    this.routeMap = {}
    this.routes.forEach((route) => {
      this.routeMap[route.path] = route
    })

    Vue.util.defineReactive(this, 'current', window.location.hash.slice(1))

    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }

  onHashChange() {
    this.current = window.location.hash.slice(1)
  }
}

VueRouter.install = function (Vue) {
  Vue.mixin({
    beforeCreate() {
      // 只有根组件上面会有这个
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    },
  })
  Vue.component('router-view', {
    render(h) {
      const {routeMap, current} = this.$router
      const component = routeMap[current] ? routeMap[current].component : null
      return h(component)
    },
  })
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        default: '',
      },
    },
    render(h) {
      return h('a', {attrs: {href: '#' + this.to}}, this.$slots.default)
    },
  })
}
