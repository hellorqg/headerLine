/**
 * 关于用户的接口
 **/

import request from '@/Utils/request'
// 登录
export const login = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 发送验证码
export const sendSmsCode = mobile => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取登录用户信息
export const userInfo = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user'
  })
}

// 获取登录用户频道信息
export const userChannels = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}

// 获取登录文章列表
export const getArticles = params => {
  return request({
    method: 'get',
    url: '/app/v1_1/articles',
    params
  })
}
