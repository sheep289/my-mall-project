<template>
  <div class="search">
    <!-- 顶部导航标题 -->
    <TopTitle>
      <h3>商品搜索</h3>
    </TopTitle>
    <!-- 搜索框  -->

    <form class="search-box" @submit.prevent="submitForm(serachContent)">
      <van-icon name="search" class="icon" />
      <input
        type="text"
        class="inp"
        placeholder="请输入搜索关键词"
        v-model="serachContent"
      />
      <button class="search-btn" type="submit">
        <span>搜索</span>
      </button>
    </form>

    <!-- 最近搜索 -->
    <div class="history">
      <span>最近搜索</span>
      <van-icon name="delete-o" class="del-icon" />
    </div>
    <div class="list">
      <div
        class="list-item"
        v-for="(item, index) in serachHistory"
        :key="index"
        @click="submitForm(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue'
import { getHistoryList, setHistoryList } from '@/utils/storage'
export default {
  name: 'searchsIndex',
  components: {
    TopTitle
  },
  data () {
    return {
      serachContent: '',
      serachHistory: getHistoryList() // 搜索历史记录
    }
  },
  methods: {
    submitForm (item) {
      // 获取重复的索引号，没有重复为-1
      const index = this.serachHistory.indexOf(item)
      if (index !== -1) {
        this.serachHistory.splice(index, 1)
      }
      // this.serachContent = item

      // 将搜索的内容添加到搜索历史数组中
      this.serachHistory.unshift(item)
      setHistoryList(this.serachHistory)
      // 跳转到搜索列表
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .search-box {
    display: flex;
    background-color: #f1f1f2;
    height: 44px;
    border-radius: 22px;
    margin: 60px 14px 12px 14px;
    overflow: hidden;
    align-items: center;
    position: relative;
    border: 1px solid #eee;
    transition: all 0.2s;

    &:focus-within {
      border-color: #ff5000;
      box-shadow: 0 0 0 2px rgba(255, 80, 0, 0.1);
    }

    .icon {
      font-size: 18px;
      color: #999;
      margin-left: 16px;
    }
    .inp {
      width: 100%;
      flex: 1;
      background-color: transparent;
      border: none;
      margin: 0 10px;
      font-size: 15px;
      color: #333;
      outline: none;

      &::placeholder {
        color: #aaa;
      }
    }
    .search-btn {
      width: 70px;
      height: 100%;
      background-color: #ff5000;
      color: white;
      border: none;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: #e04800;
      }

      &:active {
        background-color: #c04000;
        transform: scale(0.98);
      }

      span {
        display: inline-block;
        transition: transform 0.2s;
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
