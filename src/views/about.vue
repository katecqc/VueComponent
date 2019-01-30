<template>
  <div class='con'>
    <div>About</div>
  </div>
</template>
<script>
import FindUpComponent from '../mixins/findComponents.js'
export default {
  mixins: [ FindUpComponent ],
  methods: {
    findComponent () {
      if (this.findUpComponent(this, 'App')) {
        console.log('This is App.vue')
        return
      }
      console.log('It isn\'t App.vue')
    }
  },
  beforeMount () {
    this.findComponent()
  }
}
</script>
<style lang='less' scoped></style>
