<!-- 此处用来记录 遇到的坑 -->
### 2025-3-1
**问题：** 未能使用适配问题，当手机宽度变小 页面布局全乱
**解决：** 功能陆续完成后解决

## 2025-3-3
**问题：** 实现每个页面拉取顶部刷新
**解决：** 暂无


## 2025-3-3 css
**知识点：** 1. gap(给父亲添加此属性，能让子属性保持相应的间距) 2. overlflow: hidden(防止图片溢出) 3. object-fit:contain(保持比例，适应容器，如果值是cover：填满容器且不被裁剪) 4.white-space(值为nowrap时)：禁止换行
5.flex:0 0 auto(此样式是防止图片缩放)



## 2025-3-3 css （views/cart.vue ）
**问题：** 字体间距
**解决：** letter-spacing: .2rem;

## 2025-3-3 css（views/cart.vue ）
**问题：**实现一个大盒子和其中的内容一起缩小(盒子缩小后，其视觉尺寸变小了，但其与原始的宽度仍然占据着原有大小的空间)
**解决：** transform:  scale(0.70);  transform-origin: top left;//可选 指定缩放的基点（解决原有大小空间，使用了flex:1）

## 2025-3-3 css
**问题：** 图片溢出
**解决：** display: -webkit-box; //设置元素为弹性盒子
      -webkit-box-orient: vertical; //设置盒子的排列方式
      -webkit-line-clamp: 2; //指定要显示的行数
      overflow: hidden;

## 2025-3-4 css
**问题：**商品没有选择规格这个功能
**解决：** 后续搭配后端开发时添加此功能


## 2025-3-7 模拟后台返回数据
**问题：** 首页根据模块来返回相应的数据
**解决：**


## 2025-3-8 首页轮播图触摸事件
**问题** 实现用户通过触摸来滑动轮播图
**解决**

## 2025-3-10 详情页图片懒加载
**问题** 将图片实现懒加载
**解决**

##  2025-3-10 transition的动画效果
**问题**  了解此标签/css 用法
**解决**  通过文档解决了弹层的实现

## 2025-3-11 盒子根据内容自动伸缩
**问题** 当图片消失，文字盒子大小没发生变化，且不居中
**解决** 1.图片盒子：image-box 使用 flex: 0 0 auto 来保持固定大小，不随内容伸缩。
         2.文字盒子：text-box 使用 flex: 1 1 auto 来允许它根据内容伸缩
         3.动态调整宽度：当图片不存在时，使用 :not(:has(.image-box)) 选择器来调整容器的宽度为 fit-content，使其适应文字内容。
         4.文字居中：通过 text-align: center 使文字在盒子内居中。

## 底层弹框 规格选择
问题：当选择颜色或者内存等规格，上方的商品卡片内容也要随着变化


---

解决：
```javaScript
 selectedPriceAndStock () {
      let maxPrice = 0
      let maxStock = Infinity

      this.specs.forEach(spec => {
        const selectedIndex = this.activeIndex[spec.specs_id]
        const selectedValue = spec.values[selectedIndex]

        if (selectedValue) {
          maxPrice = Math.max(maxPrice, selectedValue.price || 0)
          // 库存取最小值（按木桶原理，以最低库存为准）
          if (selectedValue.stock !== undefined) {
            maxStock = Math.min(maxStock, selectedValue.stock)
          }
        }
      })

      // 保留原始数据的兜底值
      return {
        price: maxPrice || this.detail.price_max,
        stock: Number.isFinite(maxStock) ? maxStock : this.detail.stock
      }
    }

```


## 登录页面的定时器销毁  只要定时器存在，就要记得销毁
  destroyed () {
    // 销毁定时器
    clearInterval(this.timerId)
  }

## 路由传递 参数 时只能是 字符串
问题：如果跳转时需要传递参数为数组 
      需携带参数：cartIds:[1,2,3]
      跳转时​​：浏览器自动将数组转为逗号分隔字符串（如 cartIds=1,2,3）
​​      刷新时​​：从URL获取的 cartIds 是字符串，而接口可能需要数组格式，导致后端解析失败
解决：可以利用join方法转换为字符串 ，然后回转：  const cartIdsArray = this.cartIds.split(',').map(Number)

问题2：如果跳转时为对象
解决：可以将对象转换为JSON字符串 ，然后跳转后拿到参数进行回转


## upata组件中的问题（异步处理）
问题： ​​异步数据加载和同步代码执行的时机冲突
      当在 created 中调用 this.$store.dispatch('address/getAddressListAcion') 时，虽然发起了异步请求，但代码会继续同步执行 this.change()，此时 addressList 可能尚未从接口返回数据，导致 selecteAddress 为空数组，从而 this.selecteAddress[0] 为 undefined。
解决： ​​使用 async/await 等待异步操作完成​，确保数据加载完成后再操作数据

```javascript
  async created() {
  // 等待 Action 完成，确保 addressList 已更新
  await this.$store.dispatch('address/getAddressListAcion');
  this.change(); // 数据加载完成后执行
},

```

## 收货地址交互效果
问题：1. 更强烈的交互效果，例如，1.用户将数组二个对象设为默认地址，那就将第二个对象移到数组一个位置（unshift）
      2. 自己定义的选择框（选择与不选来回切换）
解决：（完成一半）
```Javascript
      //1. 将默认地址移除到第一个（有bug，视图不会自动更新，需要手动刷新)
      const defaultIndex = data.findIndex(item => item.is_default)
      if (defaultIndex > 0) {
        const movedItem = data.splice(defaultIndex, 1)[0]
        data.unshift(movedItem)
      }

          // 2. 选择与不选来回切换
    toggleCheck (state, addressId) {
      const address = state.addressList.find(item => item.user_address_id === addressId)
      address.is_default = !address.is_default
    }

```


## 路由跳转参数丢失（路由跳转，原路由参数丢失/覆盖）
问题：立即购买携带参数跳转→到订单页面 订单页面跳转到选择地址页面，当从地址选择也买你返回订单页面时，立即购买的路由参数丢失，导致无法重新请求商品信息数据，
  这是因为：路由跳转时没有保留原始参数
解决1.：通过使用携带参数url: this.router.currentRoute.fullPath 进行跳转到收货地址页面，
      地址栏页面回跳时路径为：this.$router.this.$route.query.url 并携带需要传递的新参数

原理：fullpath的特性：this.$router.currentRoute.fullPath 会返回当前路由的完整路径（包含路径查询参数和hash）


解决2 ：将原有的参数一同携带过去：例如query{ mode: this.mode} ,回跳时在携带回来:query:{ ...this.$route.query,新的参数：新的参数值}

```javascript
// 1.订单也跳转到收货地址页面
this.$router.push({
        path: '/address',
        query: {
          url: this.$router.currentRoute.fullPath,
          addressId: this.address.user_address_id
        }
      })
//  收货地址页面回跳到订单页面
this.$router.replace({
            path: this.$route.query.url,
            query: {
              // ...this.$route.query,
              addressId: item.user_address_id
            }
          })

```


## 每个页面回退问题
问题：返回上一步（跳转）之间是用replace还是push
解决：？