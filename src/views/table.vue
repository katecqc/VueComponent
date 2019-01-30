<template>
  <i-table :columns='columns' :data='data'></i-table>
</template>

<script>
import iTable from '../components/table-render/table.vue';
export default {
  components: { iTable },
  data () {
    return {
      editName: '',
      editAge: '',
      editBirthday: '',
      editAddress: '',
      editIndex: -1,
      columns: [
        {
          title: '姓名',
          render: (h, { row, index }) => {
            if (this.editIndex === index) {
              return h('input', {
                domProps: {
                  value: row.name
                },
                on: {
                  input: (e) => {
                    this.editName = e.target.value
                  }
                }
              })
            } else {
              return h('span', this.data[index].name)
            }
          }
        },
        {
          title: '年龄',
          render: (h, { row, index}) => {
            let edit
            if (this.editIndex === index) {
              edit = [
                h('input', {
                domProps: {
                  value: row.age
                },
                on: {
                  input: (e) => {
                    this.editAge = e.target.value
                  }
                }
              })
              ]
            } else {
              edit = row.age
            }
            return h('div', [edit])
          }
        },
        {
          title: '出生日期',
          render: (h, { row, column, index }) => {
            let edit
            if (this.editIndex === index) {
              edit = [
                h('input', {
                  domProps: {
                    value: row.birthday,
                  },
                  on: {
                    input: (e) => {
                      this.editBirthday = e.target.value
                    }
                  }
                })
              ]
            } else {
              let dateArr = []
              const date = new Date(parseInt(row.birthday))
              const year = date.getFullYear()
              const month = date.getMonth() + 1
              const day = date.getDate()
              dateArr.push(year, month, day)
              const dateFormat = dateArr.join('-')
              edit = h('span', dateFormat)
            }
            return h('div', [edit])
          },
        },
        {
          title: '地址',
          render: (h, { row, column, index }) => {
            let edit
            if (this.editIndex === index) {
              edit = [
                h('input', {
                  domProps: {
                    value: row.address,
                  },
                  on: {
                    input: (e) => {
                      this.editAddress = e.target.value
                    }
                  }
                })
              ]
            } else {
              edit = row.address
            }
            return h('div', [edit])
          },
        },
        {
          title: '操作',
          render: (h, { row, index }) => {
            if (this.editIndex === index) {
              return [
                h('button', {
                  on: {
                    click: () => {
                      this.data[index].name = this.editName
                      this.data[index].age = this.editAge
                      this.data[index].birthday = this.editBirthday
                      this.data[index].address = this.editAddress
                      this.editIndex = -1
                    }
                  },
                }, '保存'),
                h('button', {
                  on: {
                    click: () => {
                      this.editIndex = -1
                    }
                  },
                  style: {
                    marginLeft: '8px'
                  }
                }, '取消')
              ]
            } else {
              return h('button', {
                on: {
                  click: () => {
                    this.editName = row.name
                    this.editAge = row.age
                    this.editBirthday = row.birthday
                    this.editAddress = row.address
                    this.editIndex = index
                  }
                }
              }, '修改')
            }
          }
        }
      ],
      data: [
        {
          name: '王小明',
          age: 18,
          birthday: '919526400000',
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          birthday: '696096000000',
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          age: 30,
          birthday: '563472000000',
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          birthday: '687024000000',
          address: '深圳市南山区深南大道'
        }
      ],
    }
  },
}
</script>

<style lang='less' scoped>

</style>
