<template>
  <div class='checkbox-group'>
    <slot></slot>
  </div>
</template>

<script>
import Emitter from '../../mixins/emitter.js'
import FindComponent from '../../mixins/findComponents.js'
export default {
  name: 'iCheckboxGroup',
  mixins: [ Emitter, FindComponent ],
  props: {
    value: {
      type: Array,
      default () {
        return [];
      }
    },
  },
  data () {
    return {
      currentValue: this.value,
      children: []
    }
  },
  methods: {
    updateModel (update) {
      this.children = this.findDownComponents(this, 'iCheckbox')
      if (this.children) {
        const { value } = this
        this.children.forEach((child, index) => {
          child.model = value
          if (update) {
            child.currentValue = value.indexOf(child.label) > 0
            child.group = true
          }
        })
      }
    },
    change (model) {
      this.currentValue = model
      this.$emit('input', model)
      this.$emit('on-change', model)
      this.dispatch('iFormItem', 'onFormChange', model)
    },
  },
  watch: {
    value () {
      this.updateModel(true)
    }
  },
  mounted () {
    this.updateModel(true)
  },
}
</script>

<style scoped>

</style>
