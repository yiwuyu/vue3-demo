<template>
  <a-modal
    v-model:visible="visible"
    title="添加项目"
    @ok="onSubmit"
    @afterClose="resetFields"
  >
    <a-form
      :model="formState"
      :rules="rules"
      layout="vertical"
    >
      <a-form-item label="名称">
        <a-input v-model:value="formState.name"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { projectModal } from './index'
export default {
  setup(props, { emit }) {

    const {
      visible, show,
      formState, rules, onSubmit, resetFields
    } = projectModal({ emit })
    
    return {
      show,
      visible,
      formState,
      rules,
      onSubmit,
      resetFields
    }
  }
}
</script>