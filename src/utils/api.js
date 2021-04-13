import axios from 'axios'
import qs from 'qs'

// 订单api
const orderApi = {
  // 列表
  getOrderList: (arg) => {
    return axios.post('/order/orders', arg)
  },
  // 详情
  getOrderDetail: id => {
    return axios.get('/order', {
      params: {
        id
      }
    })
  },
  // 订单取消
  cancelOrder: id => {
    return axios.put('/order/cancel', qs.stringify({
      id
    }))
  },
}

export {
  orderApi,
}
