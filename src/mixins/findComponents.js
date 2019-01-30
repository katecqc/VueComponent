export default {
  methods: {
    findUpComponent(context, componentName) {
      let parent = context.$parent
      let name = parent.$options.name
      while (parent && (!name || [componentName].indexOf(name) < 0)) { //用while，则条件的变量必须改变，否则永远不会退出
        parent = parent.$parent
        if (parent) name = parent.$options.name
      }
      return parent
    },
    findUpComponents(context, componentName) {
      let parents = []
      let parent = context.$parent
      if (!parent) {
        return []
      }
      if (parent.$options.name === componentName) {
        parents.push(parent)
      }
      return parents.concat(this.findUpComponents(parent, componentName))
    },
    findDownComponent(context, componentName) {
      let childrens = context.$children
      let children
      let name = ''
      if (!childrens.length) {
        return false
      }
      for (const item of childrens) {
        name = item.$options.name
        if (name === componentName) {
          children = item
          return children
        }
      }
    },
    findDownComponents(context, componentName) {
      // let childrens = context.$children
      // let children = []
      // let childrenAll = []
      // if (!childrens.length) {
      //   return []
      // }
      // for (const item of childrens) {
      //   if (item.$options.name === componentName) {
      //     children.push(item)
      //   }
      //   childrenAll = children.concat(this.findDownComponents(item, componentName))
      // }
      // return childrenAll
      return context.$children.reduce((children, item) => {
        if (item.$options.name === componentName) {
          children.push(item)
        }
        return children.concat(this.findDownComponents(item, componentName))
      }, [])
    },
    findBrotherComponent(context, componentName, exceptMe = true) {
      // let childrens = context.$parent.$children
      // let childrenAll = []
      // for (const item of childrens) {
      //   if (item.$options.name != componentName) {
      //     return
      //   }
      //   else if (exceptMe && context._uid === item._uid) {
      //     return
      //   }
      //   else {
      //     childrenAll.push(item)
      //   }
      // }
      // return childrenAll
      let childrenAll = context.$parent.$children.filter((item) => {
        return item.$options.name === componentName
      })
      let currentIndex = childrenAll.findIndex(item => context._uid === item._uid)
      if (exceptMe) childrenAll.splice(currentIndex, 1)
      return childrenAll
    },

  },
}
