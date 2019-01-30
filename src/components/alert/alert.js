import notification from './notification.js'

let messageInstance

// 调用方法，创建实例
function getMessageInstance() {
  messageInstance =  messageInstance || notification.newInstance()
  return messageInstance
}
function notice({ duration = 1.5, content = '' }) {
  const instance = getMessageInstance()
  instance.add({
    content,
    duration,
  })
}
export default {
  info (data) {
    return notice(data)
  }
}
