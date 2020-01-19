import request from '@/Utils/request'

// 联想搜索
export const suggestionSearch = q => {
  return request({
    url: '/app/v1_0/suggestion',
    meethod: 'get',
    params: {
      q
    }
  })
}

// 搜索结果
export const getSearch = params => {
  return request({
    url: '/app/v1_0/search',
    meethod: 'get',
    params
  })
}

// 搜索历史
export const searchHistory = params => {
  return request({
    url: '/app/v1_0/search/histories',
    meethod: 'get',
    params
  })
}
