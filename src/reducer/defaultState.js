export const gankState = {
}

export const gankIndexState = {
  isFetching: false,
  list: {}
}

export const gankIndexCategoryState = {
  category: []
}

export const gankWelfareState = {
  isFetching: false,
  list: []
}

export const getEasyCategoryState = {
  main: {
    list: [],
    isFetching: false,
    defSelect: ''
  },
  sub: {
    isFetching: false,
    defSelect: ''
  }
}

export const getEasyListState = {
  isFetching: false
}

export const v2exPostState = {
  isFetching: false,
  latest: [],
  hot: []
}

export const v2exNodesState = {
  all: {
    isFetching: false,
    list: []
  },
  common: {
    list: [
      { title: '全部', name: 'all' },
      { title: '最热', name: 'hot' },
      { title: '问与答', name: 'qna' },
      { title: '酷工作', name: 'jobs' },
      { title: '技术', name: 'tech' },
    ]
  }
}