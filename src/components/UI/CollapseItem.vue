<template>
  <el-collapse-item :title="setting.title" :name="setting.id">
    <el-radio-group v-model="resourse" size="medium"> 
      <el-radio 
        v-for="variant in setting.variants" 
        border 
        :key="variant" 
        :label="variant"
      >
      </el-radio>
    </el-radio-group>
  </el-collapse-item>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'collapse-item',
  props: {
    setting: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      resourse: ''
    }
  }
})
</script>

<style scope lang="scss">
.el-collapse {
  border: none;
  &-item__header {
    color: white;
    background-color: #C1A6A7;
    padding-left: 10px;
  }
  &-item__wrap {
    background-color: #aa8d8e;
    .el-collapse-item__content {
      color: white;
    }
  }
  &-item__content {
    padding: 10px 0px 10px 10px;
  }
}

.el-radio-group {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  & > label {
    margin-bottom: 5px;
  }
  & > label:first-child {
    margin-left: 10px;
  }
  & > label:last-child {
    margin-right: 30px;
    margin-bottom: 0px;
  }

  .el-radio__label {
    color: white;
  }
}
.el-radio__input.is-checked+.el-radio__label {
  color: lightgreen;
  font-weight: bold;
}
.el-radio.is-bordered.el-radio--medium {
  border-radius: 0px;
}
</style>