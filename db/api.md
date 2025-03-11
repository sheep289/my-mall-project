<!-- 此处为接口文档 -->
## 首页接口 get / http://localhost:3000/pageData
    ** 响应示例**:
    ```
## 获取商品用户评论数据  get / http://localhost:3000/commentsList
    - 演示
        需传参数goodsId
        return request.get('http://localhost:3000/commentsList', {
            params: {
            goodsId
        }
  })

## 获取商品详情数据  get / http://localhost:3000/goodsList
  - 演示
        return request.get(`http://localhost:3000/goodsList/${id}`)

## 获取弹层数据  get  / http://localhost:3000/specSelector
    -演示
        return request.get('http://localhost:3000/specSelector', {
        params: {
        id
        }
    })