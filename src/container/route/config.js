import GankSetting from './../GankSetting'
import GankIndex from './../GankIndex'
import GankWelfare from './../GankWelfare'
import GankEasy from './../GankEasy'

import V2exIndex from './../V2exIndex'
import V2exNode from './../V2exNode'

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