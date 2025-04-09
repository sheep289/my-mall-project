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