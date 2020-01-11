import request from '@/Utils/request'

// 获取用户收藏列表
export const getAllchannels = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/channels'
  })
}
