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
      <div v-show="serachHistory.length > 0">
        <van-icon
          name="delete-o"
          class="del-icon"
          @click="edit = false"
          v-if="edit"
        />
        <div v-else class="edit-box">
          <span @click="onDelAll">全部删除</span> &nbsp;|&nbsp;
          <span class="fulfill" @click="edit = true">完成</span>
        </div>
      </div>
    </div>
    <div class="list">
      <div
        class="list-item"
        v-for="(item, index) in serachHistory"
        :key="index"
        @click="submitForm(item)"
      >
        <div class="text-box">
          <div>{{ item }}</div>
          <div class="delete-btn" :class="{active: edit}" @click="submitForm(item)"><van-icon name="cross"></van-icon></div>
        </div>
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
      serachHistory: getHistoryList(), // 搜索历史记录
      edit: true
    }
  },
  methods: {
    submitForm (item) {
      // 获取重复的索引号，没有重复为-1
      if (!item) return
      const index = this.serachHistory.indexOf(item)
      // 删除逻辑
      if (!this.edit) {
        if (index !== -1) {
          this.serachHistory.splice(index, 1)
        }
        setHistoryList(this.serachHistory)
        if (this.serachHistory.length <= 0) this.edit = true
        return
      }
      // 历史记录
      if (index !== -1) {
        this.serachHistory.splice(index, 1)
      }
      // 将搜索的内容添加到搜索历史数组中
      this.serachContent = item
      this.serachHistory.unshift(item)
      setHistoryList(this.serachHistory)
      // 跳转到搜索列表
      this.$router.push(`/searchList?keyword=${this.serachContent}`)
    },
    onDelAll () {
      this.$modal
        .confirm({
          message: '你确定删除全部历史记录？',
          confirmButtonColor: '#ee0a24',
          cancelBtnText: '取消',
          confirmBtnText: '确定',
          closerOnClickModal: false
        })
        .then(() => {
          setHistoryList([])
          this.serachHistory = []
          this.edit = true
          this.$emit('input', false) // 关闭底层弹框
        })
        .catch(() => {})
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
    align-items: center;
    margin: 18px 12px;
    .edit-box {
      color: #777;
      font-size: 12px;
      .fulfill {
        color: #333;
      }
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 2%;
    justify-content: flex-start;
    padding: 0 10px;
    .list-item {
      // width: 30%;
      max-width: 36%;
      min-width: 20px;
      width: fit-content;
      text-align: center;
      line-height: 15px;
      border-radius: 50px;
      background: #fff;
      font-size: 13px;
      border: 1px solid #efefef;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis; //使用省略号表示溢出
      margin-bottom: 10px;
      border: 1px solid #a1a1a1;
      position: relative;
      .text-box {
        padding: 4px 8px;
        .delete-btn {
          background-color: rgb(165, 165, 165);
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 20px;
          top: 0;
          right: 0;
          bottom: 0;
          text-align: center;
          &.active{
          display: none;
          }
        }
      }
    }
  }
}
</style>
