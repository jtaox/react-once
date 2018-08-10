import GankSetting from './../gank/GankSetting'
import GankIndex from './../gank/GankIndex'
import GankWelfare from './../gank/GankWelfare'
import GankEasy from './../gank/GankEasy'

import V2exIndex from './../v2ex/V2exIndex'
import V2exNode from './../v2ex/V2exNode'

export const gankRoutes = [
  {
    path: '/gk/index',
    component: GankIndex
  },
  {
    path: '/gk/discovery',
    component: GankWelfare
  },
  {
    path: '/gk/test2',
    component: GankEasy
  },
  {
    path: '/gk/setting',
    component: GankSetting
  }
]

export const v2exRoutes = [
  {
    path: '/v2ex/index',
    component: V2exIndex
  },
  {
    path: '/v2ex/node',
    component: V2exNode
  }
]