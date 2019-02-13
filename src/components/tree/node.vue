<template>
  <ul class='tree-ul'>
    <li class='tree-li'>
      <span class='tree-expand' @click='handleExpand'>
        <span v-if='data.children && data.children.length && !data.expand'>+</span>
        <span v-if='data.children && data.children.length && data.expand'>-</span>
      </span>
      <i-checkbox
        v-if='showCheckbox'
        :value='data.checked'
        @input='handleCheck'
      ></i-checkbox>
      <span>{{ data.title }}</span>
      <tree-node v-for='(item, index) in data.children'
                 v-if='data.expand'
                 :key='index'
                 :data='item'
                 :show-checkbox='showCheckbox'
      ></tree-node>
    </li>
  </ul>
</template>

<script>
import iCheckbox from '../checkbox/Checkbox.vue'
import FindComponent from '../../mixins/findComponents.js'

export default {
  name: 'treeNode',
  components: {iCheckbox},
  mixins: [FindComponent],
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    showCheckbox: {
      type: Boolean,
      default() {
        return false
      }
    },
  },
  data() {
    return {
      tree: this.findUpComponent(this, 'Tree')
    }
  },
  watch: {
    'data.children': {
      handler(data) {
        if (data) {
          //console.log(data === this.data.children);
          const checkAll = !data.some(item => {
            return !item.checked
          })
          this.$set(this.data, 'checked', checkAll)
        }
      },
      deep: true,
    }
  },
  methods: {
    handleCheck(checked) {
      this.updateTreeDown(this.data, checked)
      if (this.tree) {
        this.tree.emitEvent('on-check-change', this.data)
      }
    },
    handleExpand() {
      this.$set(this.data, 'expand', !this.data.expand)
      if (this.tree) {
        this.tree.emitEvent('on-toggle-expand', this.data)
      }
    },
    updateTreeDown(data, checked) {
      this.$set(data, 'checked', checked)

      if (data.children && data.children.length) {
        data.children.forEach((item) => {
          this.updateTreeDown(item, checked)
        })
      }
    }
  }
}
</script>

<style lang='less' scoped>
* {
  margin: 0;
  padding: 0;
}
.tree-ul, .tree-li {
  text-align: left;
  list-style: none;
  padding-left: 10px;
}
.tree-ul {
  margin-top: 10px;
}
label {
  position: relative;
  display: inline-block;
  width: 17px;
  height: 17px;
  vertical-align: middle;
}
.tree-li {
  position: relative;
  margin: 5px 0;
  padding-left: 13px;
  :global(input) {
    position: absolute;
    top: -1px;
    left: 0;
  }
}
.tree-expand {
  position: absolute;
  top: 1px;
  left: 0;
  display: inline-block;
  width: 13px;
  height: 17px;
  line-height: 17px;
  cursor: pointer;
}
</style>
