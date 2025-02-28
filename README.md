# my-mall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

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

