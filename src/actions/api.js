import { pageCount } from './config'

// 最热 || 最新
export const v2exTopics = type => `/v2ex/api/topics/${ type }.json`

// 指定节点下的帖子 
export const v2exPosts = nodeName => `/v2ex/api/topics/show.json?node_name=${ nodeName }`

// 全部节点
export const v2exAllNode = `/v2ex/api/nodes/all.json`

// 闲读列表
export const gankEasyList = (path, page) => `/gank/api/xiandu/data/id/${ path }/count/${ pageCount }/page/${ page }`

// 闲读分类
export const gankEasycategories = category => category ? `/gank/api/xiandu/category/${ category }` : `/gank/api/xiandu/categories`

// gank分类数据
export const gankBaseList = (id, page) => `/gank/api/data/${id}/${pageCount}/${page}`