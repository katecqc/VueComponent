export default {
  functional: true,
  props: {
    column: Object,
    row: Object,
    index: Number,
    render: Function,
  },
  render: (h, context) => {
    const parmas = {
      column: context.props.column,
      row: context.props.row,
      index: context.props.index,
    }
    return context.props.render(h, parmas)
  }
}
