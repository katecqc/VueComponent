<template>
  <div class='form-item'>
    <label v-if='label' class='label' :class='{required: isRequired}'>{{ label }}</label>
    <div class='input-con'>
      <slot></slot>
      <div v-if='validateState === "error"' class='error-message'>{{ validateMessage }}</div>
    </div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator';
import Emitter from '../../mixins/emitter.js'
import FindComponents from '../../mixins/findComponents.js'
export default {
  name: 'iFormItem',
  inject: ['form'],
  mixins: [ Emitter, FindComponents ],
  props: {
    label : {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isRequired: false,
      validateState: '',
      validateMessage: '',
      initialValue: '',
    }
  },
  computed: {
    fieldValue () {
      return this.form.model[this.prop]
    }
  },
  methods: {
    getRules () {
      let formRules = this.form.rules
      formRules = formRules ? formRules[this.prop] : []
      return [].concat(formRules || [])
    },
    getFilteredRule (trigger) {
      const rules = this.getRules()
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
    },
    validate (trigger, callback = function () {}) {
      let rules = this.getFilteredRule(trigger)
      if (!rules || rules.length === 0) {
        return true
      }
      this.validateState = 'vaildating'
      let descriptor = {}
      descriptor[this.prop] = rules
      const validator = new AsyncValidator(descriptor)
      let model = {}
      model[this.prop] = this.fieldValue
      validator.validate(model, { firstFields: true }, errors => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''
        callback(this.validateMessage)
      })
    },
    onFieldFocus () {

    },
    onFieldBlur () {
      this.validate('blur')
    },
    onFieldChange () {
      this.validate('change')
    },
    setRules () {
      let rules = this.getRules()
      if (rules.length) {
        rules.every((rule) => {
          this.isRequired = rule.required
        })
      }
      this.$on('onFormFocus', this.onFieldFocus)
      this.$on('onFormChange', this.onFieldChange)
      this.$on('onFormBlur', this.onFieldBlur)
    },
    resetField () {
      this.validateState = ''
      this.validateMessage = ''
      this.form.model[this.prop] = this.initialValue
    }
  },
  mounted () {
    if (this.prop) {
      this.dispatch('iFrom', 'onFormItemAdd', this)
      this.initialValue = this.fieldValue
      this.setRules()
    }
    //console.log(this.findDownComponents(this, 'iInput'))
  },
  beforeDestroy () {
    this.dispatch('iFrom', 'onFormItemRemove', this)
  }
}
</script>

<style lang='less' scoped>
.required {
  &:before {
    content: '*';
    color: red;
  }
}
.error-message {
  color: red;
}
.form-item {
  padding: 10px;
  text-align: left;
}
.input-con {
  margin-top: 10px;
}
.label {
  color: rgba(60, 60, 60, 1);
}
.error-message {
  font-size: 15px;
  margin-top: 8px;
}
</style>
