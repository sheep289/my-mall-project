<template>
  <div class="search">
    <!-- 顶部导航标题 -->
    <TopTitle>
      <h3>商品搜索</h3>
    </TopTitle>
    <!-- 搜索框  -->
    <div class="search-box">
      <van-icon name="search" class="icon" />
      <input
        type="text"
        class="inp"
        placeholder="请输入搜索关键词"
        @click="$router.push('/search')"
      />
      <div class="btn">
        <span>搜索</span>
      </div>
    </div>
    <!-- 最近搜索 -->
    <div class="history">
      <span>最近搜索</span>
      <van-icon name="delete-o" />
    </div>
    <div class="list">
      <div class="list-item" v-for="item in 10" :key="item">
        手机ddddddddddddd
      </div>
    </div>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue'
export default {
  name: 'searchsIndex',
  components: {
    TopTitle
  }
}
</script>

<style lang="less" scoped>
.search {
  .search-box {
    display: flex;
    background-color: #f1f1f2;
    height: 40px;
    border-radius: 5px;
    margin: 0px 14px 12px 14px;
    overflow: hidden;
    align-items: center;
    position: relative;
    justify-content: center;
    .icon {
      padding: 10px 0;
      margin-left: 20px;
    }
    .inp {
      width: 100%;
      flex: 1;
      background-color: #f1f1f1;
      border: none;
      margin-left: 10px;
      font-size: 14px;
    }
    .btn {
      width: 60px;
      height: 40px;
      background-color: #c21401;
      position: absolute;
      right: 0;
      text-align: center;
      span {
        color: #fff;
        line-height: 40px;
      }
    }
  }
  .history {
    display: flex;
    justify-content: space-between;
    margin: 18px 12px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 5%;
    justify-content: flex-start;
    padding: 0 10px;
    .list-item {
      width: 30%;
      text-align: center;
      padding: 7px;
      line-height: 15px;
      border-radius: 50px;
      background: #fff;
      font-size: 13px;
      border: 1px solid #efefef;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis; //使用省略号表示溢出
      margin-bottom: 10px;
    }
  }
}
</style>
