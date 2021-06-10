<template>
  <a-modal
    v-model:visible="visible"
    title="添加卡"
    @ok="onSubmit"
    @afterClose="resetFields"
  >
    <a-form
      :model="formState"
      :rules="rules"
      layout="vertical"
    >
      <a-form-item label="尾号">
        <a-input v-model:value="formState.number"></a-input>
      </a-form-item>
      <a-form-item label="初始余额 HKD">
        <a-input-number style="width: 100%" v-model:value="formState.amount" :min="0"></a-input-number>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { cardModal } from './index'
export default {
  setup(props, { emit }) {

    const {
      visible,
      show,
      formState,
      rules,
      resetFields,
      onSubmit
    } = cardModal({ emit })

    return {
      show,
      visible,
      formState,
      rules,
      resetFields,
      onSubmit
    }
  }
}
</script>