import GankSetting from './../../container/GankSetting'
import GankIndex from './../../container/GankIndex'
import GankWelfare from './../../container/GankWelfare'
import GankEasy from './../../container/GankEasy'

export const gankRoutes = [
  {
    path: "/gk/index",
    component: GankIndex
  },
  {
    path: "/gk/discovery",
    component: GankWelfare
  },
  {
    path: "/gk/test2",
    component: GankEasy
  },
  {
    path: "/gk/setting",
    component: GankSetting
  }
]