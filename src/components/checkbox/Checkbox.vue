<template>
  <label>
    <span>
      <input v-if='isGroup' type='checkbox' :value='label' v-model='model' :disabled='isDisabled' @change='onChange'/>
      <input v-else type='checkbox' :disabled='isDisabled' :checked='currentValue' @change='onChange'/>
    </span>
    <slot></slot>
  </label>
</template>

<script>
import Emitter from '../../mixins/emitter'
import FindComponents from '../../mixins/findComponents.js'
export default {
  name: 'iCheckbox',
  mixins: [ Emitter, FindComponents ],
  props: {
    isDisabled: false,
    value: {
      type: [String, Boolean, Number],
      default: false,
    },
    trueValue: {
      type: [String, Boolean, Number],
      default: true,
    },
    falseValue: {
      type: [String, Boolean, Number],
      default: false,
    },
    label: {
      type: [String, Number, Boolean]
    }
  },
  data () {
    return {
      currentValue: this.value,
      isGroup: false,
      model: [],
      parent: null,
    }
  },
  computed: {
  },
  watch: {
    value (val) {
      if ( val === this.trueValue || val === this.falseValue ) {
        this.updateModel()
      } else {
        throw 'Value should be trueValue or falseValue.'
      }
    }
  },
  methods: {
    updateModel () {
      this.currentValue = this.value === this.trueValue
    },
    onChange (e) {
      if (this.isDisabled) {
        return false
      }
      this.currentValue = e.target.checked
      const value = this.currentValue ? this.trueValue : this.falseValue
      this.$emit('input', value)
      if (this.isGroup) {
        this.parent.change(this.model)
      } else {
        this.$emit('on-change', value)
        this.dispatch('iFormItem', 'on-form-change', value)
      }
    }
  },
  mounted () {
    this.parent = this.findUpComponent(this, 'iCheckboxGroup')
    if (this.parent) {
      this.isGroup = true
    }
    if (this.isGroup) {
      this.parent.updateModel(true)
    } else {
      this.updateModel()
    }
  }
}
</script>

<style scoped>

</style>
