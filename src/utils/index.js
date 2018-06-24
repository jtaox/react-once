export const classnames = (arg) => {
  const type = typeof arg
  const classes = []
  if (type === 'object') {
    Object.keys(arg).forEach(key => {
      arg[key] && classes.push(key)
    })
  }
  return classes.join(' ')
}

// TODO: 只判断了参数为一个的情况
const defaultCacheSerializer = (...args) => JSON.stringify(args[0])

const defaultCacheDeserializer = (...args) => JSON.parse(args[0])

const cacheFunCreater = (key) => {
  return (val, serializer = defaultCacheSerializer, deserializer = defaultCacheDeserializer) => {
    if (val) ls(key, serializer(val))
    else {
      const val = ls(key)
      let json = null
      try {
        json = deserializer(val)
      } catch (e) {
        console.log(e)
      }
      return json
    }
  }
}

export const gankCategoryCache = cacheFunCreater('gank_category_list')

export const gankSlideIndexCache = cacheFunCreater('gank_slide_index')

export const ls = (key, val) => {
  if (val) localStorage.setItem(key, val)
  else return localStorage.getItem(key)
}

export const getClient = () => {
  return {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
}