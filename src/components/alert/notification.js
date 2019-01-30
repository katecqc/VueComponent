import Vue from 'vue'
import Alert from './Alert.vue'

Alert.newInstance = properties => {
  const props = properties || {}
  const instance = new Vue({
    data: props,
    render (h) {
      return h(Alert, {
        props
      })
    }
  })
  const component = instance.$mount()
  document.body.appendChild(component.$el)
  const alert = instance.$children[0]
  return {
    add (notice) {
      alert.add(notice)
    },
    remove (name) {
      alert.remove(name)
    }
  }
}
export default Alert
