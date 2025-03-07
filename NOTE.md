<!-- 此处用来记录 遇到的坑 -->
### 2025-3-1
**问题：** 未能使用适配问题，当手机宽度变小 页面布局全乱
**解决：** 功能陆续完成后解决

## 2025-3-3
**问题：** 实现每个页面拉取顶部刷新
**解决：** 暂无

## 2025-3-3 css
**问题：**
**解决：**

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

