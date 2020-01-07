/**
 * 关于用户的接口
 **/

import request from '@/Utils/request'

export const login = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data
  })
}
