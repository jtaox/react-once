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

// 防抖
export const debounce = (fun, wait, context) => {
  let timer = null
  let time = Date.now()
  return (...args) => {
    clearTimeout(timer)
    time = Date.now()
    timer = setTimeout(() => {
      fun.apply(context, args)
      console.log('执行' + wait, Date.now() - time)
    }, wait);
  }
}

// 节流
export const throttle = (fun, interval = 300) => {
  let canRun = true;
  return () => {
    if (!canRun) return;
      canRun = false;
      setTimeout(() => {
          fun.apply(this, arguments);
          canRun = true;
      }, interval);
  }
}

export const formatDate = (timestamp) => {
  let time = (Date.now() / 1000 - timestamp).toFixed(0)
  if (time <= 60) return time + '秒'
  time = (time / 60).toFixed(0)
  if (time <= 60) return time + '分钟'
  time = (time / 60).toFixed(0)
  if (time <= 24) return time + '小时'
  time = (time / 24).toFixed(2)
  return time + '天'
}
