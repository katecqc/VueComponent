<template>
  <table>
    <thead>
    <th v-for='item in columns'>{{item.title}}</th>
    </thead>
    <tbody>
    <tr v-for='(row, index) in data'>
      <td v-for='col in columns'>
        <template v-if=' "render" in col '>
          <Render :row='row' :col='col' :index='index' :render='col.render'></Render>
        </template>
        <template v-else-if=' "slot" in col '>
          <slot :row='row' :column='col' :index='index' :name='col.slot'></slot>
        </template>
        <template v-else>{{row[col.key]}}</template>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import Render from '../table-render/render.js'

export default {
  components: { Render },
  props: {
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    data: {
      type: Array,
      default () {
        return []
      },
    }
  }
}
</script>

<style lang='less' scoped>
table{
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
  border: 1px solid #e9e9e9;
}
table th{
  background: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
  white-space: nowrap;
}
table td, table th{
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  text-align: left;
}
</style>
