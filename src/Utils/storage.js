export const getItem = user => {
  const data = window.localStorage.getItem(user)
  try {
    return JSON.parse(data) // 尝试转换,如果能转换成功则返回
  } catch (error) {
    return data // 如果不成功则直接返回该数据
  }
}

export const setItem = (user, value) => {
  const data = typeof value === 'object' ? JSON.stringify(value) : value
  window.localStorage.setItem(user, data)
}

export const removeItem = user => {
  window.localStorage.removeItem(user)
}
