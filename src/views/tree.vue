<template>
  <Tree :data='data' show-checkbox
        @on-check-change='onCheckChange'
        @on-check-expand='onToggleExpand'
  ></Tree>
</template>
<script>
import Tree from '../components/tree/tree.vue'
export default {
  components: { Tree },
  props: {
    showCheckbox: {
      type: Boolean,
      default () {
       return false
      },
    }
  },
  data () {
    return {
      data: [
        {
          title: 'parent 1',
          expand: true,
          checked: false,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              checked: false,
              children: [
                {
                  title: 'parent 1-1-1',
                },
                {
                  title: 'parent 1-1-2',
                }
              ]
            },
            {
              title: 'parent 1-2',
              expand: false,
              checked: false,
              children: [
                {
                  title: 'parent 1-2-1',
                },
                {
                  title: 'parent 1-2-2',
                }
              ]
            }
          ]
        },
      ]
    }
  },
  methods: {
    onToggleExpand (data) {
      //console.log(data);
    },
    onCheckChange (data) {
      //console.log(data);
    },
  }
}
</script>
<style lang='less' scoped></style>
