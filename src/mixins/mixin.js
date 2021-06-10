import { ref } from "vue"

export const modal = () => {
  const visible = ref(false)
  const show = () => {
    visible.value = true
  }
  const onClose = () => {
    visible.value = false
  }
  return { visible, show, onClose }
}

export const NumberFormat = (value) => {
  if (!value) {
    return '0'
  }
  const temp = value.toString().split('.')
  const intPartFormat = temp[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + (temp[1] ? `.${temp[1]}` : '') // 将整数部分逢三一断
  return intPartFormat
}

export const padZero = (value = '0', num = 2) => {
  const index = value.toString().indexOf('.')
  let zero = ''
  for (let i = 0; i < num; i++) {
    zero += '0'
  }
  if (index > 0) {
    return `${value}${zero}`.substr(0, index + num + 1)
  } else {
    return `${value}.${zero}`
  }
}