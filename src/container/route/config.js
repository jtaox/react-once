import GankSetting from './../../container/GankSetting'
import GankIndex from './../../container/GankIndex'
import GankWelfare from './../../container/GankWelfare'
import GankEasy from './../../container/GankEasy'

import V2exIndex from './../../component/V2exIndex'
import V2exNodes from './../../component/V2exNodes'

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
    path: '/v2ex/nodes',
    component: V2exNodes
  }
]