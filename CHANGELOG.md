<!-- 为更新日志 -->
## 1.先初始化脚手架
```
建一个utils/vant-ui.js :这个文件用来存放所有vant-ui 的导入配置 
```

## 2.配置vant(操作方式可以查看vant2文档) 然后使用组件库中的vm浏览器适配
```
配置vant组件（按需导入） 步骤如图
https://imgur.la/images/2025/02/28/-2025-02-28-013319.png
```
```
1.安装插件
npm i postcss-px-to-viewport@1.1.1 -D 

2.根目录新建postcss.config.js文件，并填入配置
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // vw适配的标准屏的宽度 iPhoneX
      // 设计图 750，调成1倍 => 适配375标准屏幕
    //   设计图 640， 调成1倍 => 适配320标准屏幕
      viewportWidth: 375
    }
  }
}
c:\Users\28904\Pictures\Screenshots\屏幕截图 2025-02-28 014743.png
```
## 3.配一级路由 
```
把一开始能联想到的一些一级路由先架起来，将来又有一些要单独展示的页面在架 就可以了。
c:\Users\28904\Pictures\Screenshots\屏幕截图 2025-02-28 015607.png
```
## 4.搭配二级路由
```
首页 分类项 购物车 我的
```
## 5.首页（home）静态布局
```
使用了flex布局

2.由于商品卡片后面也需要用到，所以将商品卡片封装成组件。
```
## 6.搜索静态布局
```
使用flex 完成搜索页面布局
问题：未能使用适配问题，当手机宽度变小 页面布局全乱
解决：暂时
```
## 7.完成详情页静态页面
```
将基本购物流程功能按钮都添加了，后续其他功能慢慢添加
```
## 8.完成注册与登录页的静态页面
```
后续添加校验规则等动态效果
```

## 9.购物车静态页面
```
问题：搜索框使用多次，代码量需要简洁
解决：封装成组件 + 插槽
```

## 10.订单结算台静态页面
```
完成了基本的静态结构，后续在迭代其他功能
```
## 11.利用模拟的数据来动态渲染首页

## 12.完成详情页的弹层

## 2025-03-07
    - 1.新增支付结算页面
       1.1 页面渲染得分为两种情况
            立即购买跳转过来的
            购物车统一结算跳转过来的
       1.2 由于有一些样式统一，直接写一个公共的样式，小细节在单独处理

    - 2.新增 json-server 工具 
        快速构建增删改查接口

    - 3. 新增request模块 
        将axios 请求方法封装到request 模块中
        对axios进行基本的二次封装，单独封装到一个request模块中，便于基本的维护
    - 4.请求http://localhost:3000/goods接口拿到数据渲染页面

## 2025-03-8 
    -1.完成页面基本动态渲染与轮播图实现

## 2025-03-10
    -1.完成详情页动态渲染
    -2.封装了弹层组件与弹层中的静态内容
        当点击添加购物车或者立即购买，则或弹出相应的弹层框
    -3.封装了商品数量计数组件（后续购物车等其它地方都会用到此组件）
    -4.封装了商品规格组件
    -5.封装了商品卡片组件（后续继续优化组件，将此商品卡片实现复用）
    -5.总结(弹层逻辑与遇到的小问题)
        5.1(弹层显示时会禁止背景滚动): 通过监听 value 属性，当弹层显示时，设置 document.body.style.overflow = 'hidden'，禁止页面滚动。
           当弹层隐藏时，恢复 document.body.style.overflow = 'auto'，允许页面滚动。
           这样可以避免弹层显示时，背景页面仍然可以滚动的问题。
        
        5.2(点击遮罩层或关闭按钮会自动关闭): 遮罩层（.overlay）和关闭按钮（.close）都绑定了 close 方法。
           close 方法通过 this.$emit('update:visible', false) 触发父组件更新 visible 的值，从而关闭弹层。

        5.3(通过 max-height 限制内容区域最大高度): 设置 .popup-content 的最大高度为 80vh/80%（视口高度的 80%），避免内容过多时弹层过高。   
           如果内容超出最大高度，则通过 overflow-y: auto 显示滚动条，确保用户可以滚动查看所有内容。

  ## 2025-03-11
  -1.完成弹层动态渲染
  
  ## 2025-03-17
  -1.修改登录与注册页面样式

  ## 更换接口（将json-server临时接口更换）
  -1 实现注册功能
      对用户信息进行校验，如果校验通过则发起注册请求
  -2 实现登录功能
      对用户信息进行校验，在发起登录请求
      (可以在ustls/request中添加统一的响应拦截器)
      如果响应回来的数据为成功，则将token权证保存到本地存储与vuex状态管理工具
      数据为：{token:   userId:}
      登录成功后：
      再将token存储到本地（封装一个storage模块，里面封装存储，获取，移除等操作本地存储方法， 专门处理本地处理数据） 后续需要权限的地方需要携带token权证发送请求
  - 
  -3 封装首页API接口，发起请求获取首页数据
    点击商品卡片，利用动态路由传参 传对应的商品ID
  -4 封装详情页API接口，获取商品数据与评论数据实现渲染
    难点：底层弹框里面的商品规格逻辑处理需要牢固，
        新接触的知识点：&set  回顾到的知识点：对象[“数据”]，对象的第二种查询方法
  -5 点击添加商品时，携带对应的商品信息参数 发起请求
    需要获取规格型号对应的id号
    
    由于发起请求需要的数据在子组件里面，而发起添加请求按钮在父组件，
      这里的解决方法：使用 ref 访问子组件的数据或方法 
        在子组件的标签上添加 ref="名字" ,父组件可以通过this.$refs.名字访问子组件的实例


## 完成购物车的动态渲染以及业务逻辑功能
- 1 封装api请求 （api/cart 需要在请求头中携带token权证
- 2 在vuex（store/modules）中新建cart模块中发起请求，然后存储到vuex中，实现数据共享
- 3 .拿到数据否对数据进行渲染
    判断请求回来的购物车数据是否为空 并且 是否登录（token），如果其中一项不满足则显示空空如也
-4渲染后 完成复选框功能，结算时的数量以及总价格都跟复选框有关联
  方案一：后端传过来的数据中有复选框是否选中状态
  方案二：如果没有，则自己添加复选框是否选中状态属性
          4.1 ：后台返回的数据中，不包含复选框的选中状态，为了实现将来的功能
            需要手动维护数据，给每一项添加一个 isChecked 状态 （标记当前商品是否选中 ）
 
          4.2 复选框添加v-model指令 值为item.isChecked(手动添加的选中状态)
          4.3 计算属性中定义方法   
              过滤商品是否选中(利用filter 筛选出选中的商品项 返回一个数组 ，后续的价格              计算以及商品计算都是根据此计算属性来进行遍历)
              获取选中商品的总数量
              获取选中的总价格
          4. 全选功能 
            利用计算属性的完整写法：
            isAllSelect: {
                get () {
                return this.cartList.every(item => item.isChecked)
              },
              set (newVal) {
                this.$store.commit('cart/toggleCheck', newVal)
              }
            }
            get:
              利用数组的every方法 查询所有isChecked元素是否都为true,都通过则返回true，有一个假则返回true
            set: newVal可以拿到布尔值，也就是是否全选，在调用vuex中的toggleCheck方法修改cartList里面的全部状态

            5.导入数量计件组件：
                注意：由于这里的需要修改的数量是vuex中的数据所以不能直接修改（不能直接使用v-model），应该拆分使用（也就是v-model底层原理，:value 与@input组合）
                     复选框与数字框都不能用v-model来绑定 只能用：value单向绑定  因为不能直接去修改vuex里面的数据
                  既希望保留原本的形参（@input 可以拿到当前输入框的值 )，有需要通过调佣函数传参 => 箭头函数包装一层
              5.2当页面的数量发生变化时，数据也要随着发生变化：一是vuex里面的quantity。二是后端的数据（需要发起更新请求）调用请求接口，传入cartId与修改数量
            
            6.删除购物车商品共能
            封装请求删除接口api 传入对应的cartIds值 为对象
            拿到vuex/cart模块中 filterSelCart 计算后的数组（选中的商品），调用map方法拿到cartId 返回一个数组，数组中每一项是选中的cartId
            vuex/cart 中发起删除请求，调用删除请求api，传入值
             最后:
                   // 再次调用请求商品数据的接口 重新更新渲染商品列表
                   context.dispatch('getCartListAction')


---


## 封装了命令式弹窗组件(支持promise),链式调用
1. 创建基础弹窗组件(Modal)
2. 创建实例化封装函数(utils/modal.js)
3. 全局注册（main.js）
4. 使用
```JavaScript

// 1确认对话框
this.$dialog.confirm({
  title: '删除确认',
  message: '确定要删除这个项目吗？',
  confirmButtonColor: '#ee0a24'
})
.then(() => {
  console.log('执行删除操作')
})
.catch(() => {
  console.log('取消删除')
})

// 2提示对话框
this.$dialog.alert({
  title: '操作提示',
  message: '请先完成身份验证',
  confirmButtonText: '去验证'
})
.then(() => {
  console.log('跳转验证页面')
})

```

5. 点击去登陆条跳转到/login 页面  
    注意：
    如果是其它页面跳转到登录页面，则登录成功后，进行回跳
          这里不能用push进行跳转，因为返回上一步时，又会跳到登录页面，
          所以用replace替代push ,  replace在这的作用是进行页面替换，相当于从详情页跳转到  登录页面，登录页面在灰跳直接会到详情页，不会保留回跳前的页面
```JavaScript
// 底层弹框组件进行条跳转
 .then(() => {
            this.$router.replace({
              path: '/login',
              query: {
                url: this.$route.fullPath // 当前的路径地址
              }
            })
          })
          .catch(() => {
            console.log('再逛逛')
          })
// login页面进行 回跳
          const url = this.$route.query.url || '/'
          this.$router.replace(url)

```

---

## 定义loading加载指令
 v-loading=“布尔值” 可以执行loading加载效果

 1. 创建loading组件，写好要实现的要是
 2. main.js中注册全局组件
    import loadingDirective from './utils/loading'
    Vue.directive('loading', loadingDirective)
 3. 在utlis中新建一个loading,js，返回是一个对象，并导出对象


 ## 加载提示 
 1. 统一处理请求后台时添加loading效果 （utlis/request） 请求拦截器中添加 ：用vant2组件库中Toast组件
    在发送请求之前做些什么
    开启loading,禁止点击点击（相当于节流处理，防止多次无效触发）

    数据响应回来后关闭loading加载

2. 在页面中间弹出黑色半透明提示，用于消息通知，反馈到页面，login与rregister等页面的添加了vant2组件中的Toast轻提示

3. 解决了Toast获取不到message内容

## 添加路由前置守卫
可以查看vue router官网文档
对支付页面（pay）订单页面（myorder）等页面进行拦截,后续还需要拦截直接往数组里面添加拦截路径就行


## 处理订单结算页面逻辑
1. 需求分析：
    1.1  购物车结算：当点击结算按钮时， 进行跳转并携带参数，拿到已选中的 1.购物车id号（用数组存储），2.mode(为cart,表示由购物车跳转结算)
    1.2  立即购物： 当点击立即购买时，进行跳转并携带参数，将1.当前用户选中的商品规格（对象） 2.商品数量 3.商品id 4.mode(为buyNow，表示由立即购买跳转结算)
                 需要携带参数，商品id 商品数量，商品规格
2. 根据mode（cart,buyNow）参数进行判断，mode类型分别有着对应的请求参数 
3. 拿到数据进行页面动态渲染
4. 调用api 接口获取收货地址列表 将收获地址存储到vuex中
    5.1. 获取地址列表：将地区与详细地址拼接
    5.2. 添加收获地址 (逻辑需fx)  1.绑定  blur事件，当失去焦点时触发validateField方法（校验），2. 通过后提交
    5.3 删除收获地址
    5.4 修改收获地址：问题：当跳转到修改路由页面时，vuex中address模块下的addressList状态是有数据的，当刷新页面时，addressLIst为空，所以得再次调用模块中的actions里的 请求方法， ​​使用 async/await 等待异步操作完成​，确保数据加载完成后在渲染
    5.5 设置默认地址 点击默认地址       this.addressList.forEach((item, i) => {
        // 通过Vue.set确保响应式更新
        this.$set(item, 'is_default', i === index)
      })
    5.6 收获地址其它交互效果: 高亮，当选择该地址时高亮加跳转到pay,选择地址时重pay跳转到address，高亮是跟随pay跳转时携带的addressId来显示的
    5.7 address点击地址会跳转到pay页面（相当于选择了该地址）
        问题：如果是直接访问address页面，而不是其它路由跳转过来的，那应该禁用点击地址跳转到pay页面
        解决：判断this.$route.query.addressId 是否有值
              有：说明是其它页面跳转过来的，则无需禁用点击事件
              没有：说明是直接访问address页面的，需要禁用点击时间，直接return

6. 计算属性：计算总价格，商品总数量，以及优惠券等业务
    异步处理

7. 点击支付 与获取支付类型与余额
    7.1先拿到支付类型数据进行动态渲染 （方法为：getPayModeList()）
    7.2 手动给每个支付类型添加一个isChenked为fasle(选中状态)，在通过点击事件（handleChenked）调用Vue.set方法响应式更新选中状态
    7.3 利用some方法判断至少有一个支付方式被选择，如果都没选择则退出
    7.4 只支持余额支付
    7.5 点击立即支付 发起请求，携带对应的mode参数（判断mode参数的不同，需携带的参数也就不同）
    最后：发起请求成功， 再次调用 await this.getPayModeList()，更新余额 → 提示支付成功  →  跳转到我的订单页面

8. 处理立即购买时token 权证时候存在
       - mixins复用，处理登录确认框的弹出
       - 利用混入（mixins）方法  可以实现 （判断 + 弹层） 复用 混入
9. 使用axios 拦截器 （统一处理token）
       - 避免每次手动添加token 可以在全局拦截器中自动注入

```javascript
// 每次请求前自动添加token
  const token = store.getters.getToken
  if (token) {
    config.headers.Authorization = token
  }
  return config

```
5. 添加收货地址地区级联选择
```JavaScript

    async onChange ({ value, selectedOptions }) {
      // console.log(value) // 可以拿到region_id
      if (value === selectedOptions[0].value) {
        // 市数据
        const { data } = await getRegionCity(value)
        // 修改省级数据加载逻辑，预先声明children字段：
        const handleData = data.map(item => ({ ...item, text: item.region_name, value: item.region_id, children: [] }))
        this.options.filter(item => item.value === value)[0].children = handleData

        // 县数据
      } else if (value === selectedOptions[1].value) {
        const { data } = await getRegionCounty(value)
        // 修改市级数据加载逻辑，预先声明children字段：
        const handleData = data.map(item => ({ ...item, text: item.region_name, value: item.region_id }))
        // 这次筛选的是省children（也就是市的数据） 双选出点击的市，在将对应的县复制给children
        selectedOptions[0].children.filter(item => item.value === value)[0].children = handleData
      }
    },

```