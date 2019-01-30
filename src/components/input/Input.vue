<template>
  <input :class='{}' type='text'
         :value='currentValue'
         @input='handleInput'
         @blur='handleBlur'
         @focus='handleFocus'
  />
</template>

<script>
import Emitter from '../../mixins/emitter.js'
import FindComponents from '../../mixins/findComponents.js'
export default {
  name: 'iInput',
  mixins: [ Emitter, FindComponents ],
  props: {
    value: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    }
  },
  methods: {
    handleFocus () {
      this.dispatch('iFormItem', 'onFormFocus', this.currentValue)
    },
    handleInput (event) {
      const value = event.target.value
      this.currentValue = value
      this.$emit('input', value)
      this.dispatch('iFormItem', 'onFormChange', value)
    },
    handleBlur () {
      this.dispatch('iFormItem', 'onFormBlur', this.currentValue)
    },
  },
  beforeMount () {
  },
  mounted () {
    this.findUpComponents(this, 'iFormItem')
    let bro = this.findBrotherComponent(this, 'iInput')
  }
}
</script>

<style scoped>
input {
  box-sizing: border-box;
  font-size: 16px;
  border: 1px solid rgba(200, 200, 200, 1);
  outline: 0;
  padding: 0 10px;
}
</style>
