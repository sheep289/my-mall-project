<template>
  <div class="add-goods-container">
    <topTitle>
      <h3>
        添加商品
      </h3>
    </topTitle>
    <div class="form-card">
      <h1 class="form-title">添加新商品</h1>
      <form @submit.prevent="submitForm" class="goods-form">
        <!-- 商品基本信息 -->
        <div class="form-group">
          <label for="title" class="form-label">商品标题</label>
          <input
            type="text"
            id="title"
            v-model="form.title"
            class="form-input"
            placeholder="请输入商品名称"
            required
          />
        </div>

        <div class="form-group">
          <label for="price" class="form-label">商品价格</label>
          <div class="input-with-unit">
            <input
              type="number"
              id="price"
              v-model="form.price"
              class="form-input"
              min="0"
              step="0.01"
              placeholder="0.00"
              required
            />
            <span class="unit">¥</span>
          </div>
        </div>

        <!-- 商品规格 -->
        <div class="form-group">
          <label class="form-label">商品规格</label>
          <div class="specs-container">
            <div
              v-for="(spec, index) in form.specs"
              :key="index"
              class="spec-item"
            >
              <div class="spec-inputs">
                <input
                  type="text"
                  v-model="spec.name"
                  class="form-input spec-name"
                  placeholder="规格名称"
                  required
                />
                <input
                  type="text"
                  v-model="spec.value"
                  class="form-input spec-value"
                  placeholder="规格值"
                  required
                />
                <input
                  type="text"
                  v-model="spec.price"
                  class="form-input spec-value"
                  placeholder="价格"
                  required
                />
                <input
                  type="text"
                  v-model="spec.stock"
                  class="form-input spec-value"
                  placeholder="库存"
                  required
                />
              </div>
              <van-icon
                name="delete"
                class="delete-icon"
                @click="removeSpec(index)"
              />
            </div>
            <button type="button" class="add-spec-btn" @click="addSpec">
              <van-icon name="plus" class="add-icon" />
              <span>添加规格</span>
            </button>
          </div>
        </div>

        <div class="form-group">
          <label for="description" class="form-label">商品描述</label>
          <textarea
            id="description"
            v-model="form.description"
            class="form-textarea"
            placeholder="详细描述商品特性、功能等信息"
            rows="4"
            required
          ></textarea>
        </div>

        <!-- 主图上传 -->
        <div class="form-group">
          <label class="form-label">商品主图</label>
          <div class="image-uploader">
            <label class="upload-area" :class="{ 'has-image': form.mainImage }">
              <input
                type="file"
                @change="handleMainImageUpload"
                accept="image/*"
                class="file-input"
                required
              />
              <div v-if="!form.mainImage" class="upload-placeholder">
                <van-icon name="photograph" class="upload-icon" />
                <p>点击上传主图</p>
              </div>
              <div v-else class="image-preview">
                <img :src="form.mainImagePreview" alt="主图预览" />
                <button
                  type="button"
                  class="remove-btn"
                  @click.stop="removeImage('mainImage')"
                >
                  <van-icon name="clear" class="remove-icon" />
                </button>
              </div>
            </label>
          </div>
        </div>

        <!-- 商品详情图上传 -->
        <div class="form-group">
          <label class="form-label">商品详情图</label>
          <div class="image-uploader">
            <label
              class="upload-area"
              :class="{ 'has-image': form.detailImages.length > 0 }"
            >
              <input
                type="file"
                @change="handleDetailImagesUpload"
                accept="image/*"
                multiple
                class="file-input"
              />
              <div
                v-if="form.detailImages.length === 0"
                class="upload-placeholder"
              >
                <van-icon name="photo" class="upload-icon" />
                <p>点击上传详情图（可多选）</p>
              </div>
              <div v-else class="multi-image-preview">
                <div
                  v-for="(image, index) in form.detailImages"
                  :key="index"
                  class="preview-item"
                >
                  <img :src="image.preview" :alt="'详情图预览-' + index" />
                  <button
                    type="button"
                    class="remove-btn"
                    @click.stop="removeDetailImage(index)"
                  >
                    <van-icon name="clear" class="remove-icon" />
                  </button>
                </div>
              </div>
            </label>
          </div>
        </div>

        <!-- 商品详情页图上传 -->
        <div class="form-group">
          <label class="form-label">商品详情页图</label>
          <div class="image-uploader">
            <label
              class="upload-area"
              :class="{ 'has-image': form.pageImages.length > 0 }"
            >
              <input
                type="file"
                @change="handlePageImagesUpload"
                accept="image/*"
                multiple
                class="file-input"
              />
              <div
                v-if="form.pageImages.length === 0"
                class="upload-placeholder"
              >
                <van-icon name="photo-o" class="upload-icon" />
                <p>点击上传详情页图（可多选）</p>
              </div>
              <div v-else class="multi-image-preview">
                <div
                  v-for="(image, index) in form.pageImages"
                  :key="index"
                  class="preview-item"
                >
                  <img :src="image.preview" :alt="'详情页图预览-' + index" />
                  <button
                    type="button"
                    class="remove-btn"
                    @click.stop="removePageImage(index)"
                  >
                    <van-icon name="clear" class="remove-icon" />
                  </button>
                </div>
              </div>
            </label>
          </div>
        </div>

        <!-- 商品分类 -->
        <div class="form-group">
          <label for="category" class="form-label">商品分类</label>
          <select
            id="category"
            v-model="form.categoryId"
            class="form-select"
            required
          >
            <option value="" disabled selected>请选择分类</option>
            <option v-for="cat in categoryList" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <button type="submit" class="submit-btn">
          <span>提交商品</span>
          <van-icon name="arrow" class="submit-icon" />
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { submitGoodsServer } from '@/api/goods'
import topTitle from '@/components/TopTitle.vue'
export default {
  components: {
    topTitle
  },
  data () {
    return {
      form: {
        title: '', // 商品标题
        price: null, // 商品价格
        description: '', // 商品描述
        // 商品规格
        specs: [{ name: '', value: '', price: '', stock: '' }],
        mainImage: null, // 主图
        mainImagePreview: '', // 主图预览URL
        detailImages: [], // { file: File, preview: URL }  商品详情图
        pageImages: [], // { file: File, preview: URL }  详情页图
        categoryId: '' // 商品分类ID
      }
    }
  },

  async created () {
    await this.$store.dispatch('goods/getCategoryList')
  },
  computed: {
    ...mapState('goods', ['categoryList'])
  },
  methods: {
    // 添加规格
    addSpec () {
      this.form.specs.push({ name: '', value: '', price: '', stock: '' })
    },

    // 移除规格
    removeSpec (index) {
      if (this.form.specs.length > 1) {
        this.form.specs.splice(index, 1)
      }
    },

    // 处理主图上传
    handleMainImageUpload (event) {
      const file = event.target.files[0]
      if (file) {
        this.form.mainImage = file
        this.form.mainImagePreview = URL.createObjectURL(file)
      }
    },

    // 处理详情图上传
    handleDetailImagesUpload (event) {
      const files = event.target.files
      if (files.length > 0) {
        Array.from(files).forEach((file) => {
          this.form.detailImages.push({
            file: file,
            preview: URL.createObjectURL(file)
          })
        })
      }
    },

    // 处理详情页图上传
    handlePageImagesUpload (event) {
      const files = event.target.files
      if (files.length > 0) {
        Array.from(files).forEach((file) => {
          this.form.pageImages.push({
            file: file,
            preview: URL.createObjectURL(file)
          })
        })
      }
    },

    // 移除主图
    removeImage (type) {
      if (type === 'mainImage') {
        URL.revokeObjectURL(this.form.mainImagePreview)
        this.form.mainImage = null
        this.form.mainImagePreview = ''
      }
    },

    // 移除详情图
    removeDetailImage (index) {
      URL.revokeObjectURL(this.form.detailImages[index].preview)
      this.form.detailImages.splice(index, 1)
    },

    // 移除详情页图
    removePageImage (index) {
      URL.revokeObjectURL(this.form.pageImages[index].preview)
      this.form.pageImages.splice(index, 1)
    },

    async submitForm () {
      try {
        const formData = new FormData()

        // 添加文件类字段
        if (this.form.mainImage) {
          formData.append('mainImage', this.form.mainImage)
        }

        this.form.detailImages.forEach((img) => {
          formData.append('detailImages', img.file)
        })

        this.form.pageImages.forEach((img) => {
          formData.append('pageImages', img.file)
        })

        // 添加非文件字段
        Object.entries(this.form).forEach(([key, value]) => {
          if (!['mainImage', 'detailImages', 'pageImages'].includes(key)) {
            formData.append(
              key,
              typeof value === 'object' ? JSON.stringify(value) : value
            )
          }
        })

        // 提交请求
        await submitGoodsServer(formData)
        this.$toast.success('商品添加成功！')

        this.form = {
          title: '',
          price: null,
          description: '',
          specs: [{ name: '', value: '', price: '', stock: '' }],
          mainImage: null,
          mainImagePreview: '',
          detailImages: [],
          pageImages: [],
          categoryId: ''
        }
        // 成功后的清理
        this.cleanupMemory()
      } catch (error) {
        console.error('提交失败', error)
      }
    },
    cleanupMemory () {
      // 清理对象URL防止内存泄漏
      if (this.form.mainImagePreview) {
        URL.revokeObjectURL(this.form.mainImagePreview)
      }
      this.form.detailImages.forEach((img) => URL.revokeObjectURL(img.preview))
      this.form.pageImages.forEach((img) => URL.revokeObjectURL(img.preview))
    }
  }
}
</script>

<style lang="less" scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap");

.add-goods-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  font-family: "Noto Sans SC", sans-serif;
  margin-top: 40px;
}

.form-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 800px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
}

.form-title {
  color: #2c3e50;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 60px;
    height: 3px;
    background: #ff6700;
    margin: 10px auto 0;
  }
}

.goods-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 25px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #555;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s;
  background-color: #f9f9f9;

  &:focus {
    border-color: #ff6700;
    box-shadow: 0 0 0 3px rgba(255, 103, 0, 0.2);
    outline: none;
    background-color: white;
  }
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.input-with-unit {
  position: relative;

  .unit {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #777;
    font-weight: 500;
  }
}

/* 规格样式 */
.specs-container {
  .spec-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .spec-inputs {
      display: flex;
      flex: 1;
      gap: 10px;

      .spec-name {
        flex: 0 0 120px;
      }

      .spec-value {
        flex: 1;
      }
    }

    .delete-icon {
      color: #ff4d4f;
      font-size: 20px;
      margin-left: 10px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        color: #ff7875;
      }
    }
  }

  .add-spec-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    background-color: #f0f9ff;
    color: #1890ff;
    border: 1px dashed #91d5ff;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s;
    width: 100%;

    &:hover {
      background-color: #e6f7ff;
      border-color: #69c0ff;
    }

    .add-icon {
      margin-right: 6px;
      font-size: 16px;
    }
  }
}

/* 图片上传区域样式 */
.image-uploader {
  .upload-area {
    display: block;
    border: 2px dashed #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    background-color: #f9f9f9;
    min-height: 120px;
    position: relative;
    overflow: hidden;

    &:hover {
      border-color: #ccc;
      background-color: #f0f0f0;
    }

    &.has-image {
      padding: 0;
      border-color: transparent;
      background-color: transparent;
    }
  }

  .upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #777;

    .upload-icon {
      font-size: 36px;
      color: #999;
      margin-bottom: 10px;
    }

    p {
      margin-top: 10px;
      font-size: 14px;
    }
  }

  .file-input {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .image-preview {
    position: relative;
    width: 100%;
    height: 300px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 6px;
    }
  }

  .multi-image-preview {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    padding: 10px;

    .preview-item {
      position: relative;
      height: 150px;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .remove-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    background: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: rgba(255, 0, 0, 0.8);
    }

    .remove-icon {
      color: white;
      font-size: 14px;
    }
  }
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 20px;
  background: linear-gradient(135deg, #ff6700 0%, #ff4500 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 20px;

  &:hover {
    background: linear-gradient(135deg, #ff4500 0%, #ff6700 100%);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 103, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  .submit-icon {
    margin-left: 8px;
    font-size: 16px;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .form-card {
    padding: 25px;
  }

  .form-title {
    font-size: 20px;
  }

  .image-uploader {
    .multi-image-preview {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .specs-container {
    .spec-item {
      .spec-inputs {
        flex-direction: column;
        gap: 8px;

        .spec-name {
          flex: 1;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .image-uploader {
    .multi-image-preview {
      grid-template-columns: 1fr;
    }
  }
}
</style>
