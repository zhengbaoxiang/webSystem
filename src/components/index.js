import HelloWorld from './HelloWorld'

const component = {
  install: function (Vue) {
    Vue.component(HelloWorld.name, HelloWorld) // 自定义的全局公共组件
  }
}
export default component
