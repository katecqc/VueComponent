<template>
  <div class='con'>
    <i-form ref='form' :model='formModel' :rules='formRules'>
      <i-form-item label='用户名' prop='name'>
        <i-input v-model='formModel.name'></i-input>
      </i-form-item>
      <i-form-item label='密码' prop='password'>
        <i-input v-model='formModel.password'></i-input>
      </i-form-item>
      <i-checkbox-group v-model='options'>
        <i-checkbox v-for='(item, index) in formModel.job' :key='index' :label='item.label'>
          {{item.name}}
        </i-checkbox>
      </i-checkbox-group>
      <i-checkbox v-model='formModel.isAgreed'>同意会员协议</i-checkbox>
    </i-form>
    <div class='btns'>
      <div class='btn ok' @click='handleSubmit'>提交</div>
      <div class='btn' @click='handleReset'>重置</div>
    </div>
  </div>
</template>
<script>
import iForm from '../components/form/Form.vue'
import iFormItem from '../components/form/FormItem.vue'
import iInput from '../components/input/Input.vue'
import iCheckboxGroup from '../components/checkbox/CheckboxGroup.vue'
import iCheckbox from '../components/checkbox/Checkbox.vue'

export default {
  components: {iForm, iFormItem, iInput, iCheckboxGroup, iCheckbox},
  data() {
    return {
      formModel: {
        name: '',
        password: '',
        isAgreed: false,
        sex: ['female', 'male'],
        job: [
          {
            label: 'it',
            name: '互联网'
          },
          {
            label: 'teacher',
            name: '老师'
          },
          {
            label: 'student',
            name: '学生'
          },
          {
            label: 'doctor',
            name: '医生'
          },
          {
            label: 'nurse',
            name: '护士'
          }
        ],
      },
      options: [],
      formRules: {
        name: [{
          required: true,
          message: '用户名不允许为空',
          trigger: ''
        }],
        password: [{
          required: true,
          message: '密码不允许为空',
          trigger: ''
        }],
      },
    }
  },
  computed: {
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$Alert.info({
            content: '提交成功！',
            duration: 2,
          })
        }
      })

    },
    handleReset() {
      this.$refs.form.resetFields()
    },
  }
}
</script>
<style lang='less' scoped>
.con {
  font-size: 16px;
}

input {
  width: 100%;
  height: 42px;
  line-height: 42px;
}

.btns {
  display: flex;
  margin-top: 30px;
}

.btn {
  margin: 0 10px;
  width: 100%;
  height: 42px;
  line-height: 42px;
  border: 1px solid rgba(200, 200, 200, 1);
  border-radius: 8px;
  text-align: center;
  &.ok {
    background-color: #42b983;
    color: rgba(255, 255, 255, 1);
    border: none;
  }
}
</style>
