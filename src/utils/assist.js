function typeOf(obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]' : 'boolean',
    '[object Number]' : 'number',
    '[object String]' : 'string',
    '[object Function]' : 'function',
    '[object Array]' : 'array',
    '[object Date]' : 'date',
    '[object RegExp]' : 'regExp',
    '[object Undefind]' : 'undefind',
    '[object Null]' : 'null',
    '[object Object]' : 'object',
  }
  return map[toString.call(obj)]
}

function deepCopy(data) {
  let t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
    return o
  } else if (t === 'object') {
    o = {}
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
    return o
  } else {
    return data
  }
}

export { deepCopy }
