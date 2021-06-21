<template>
  <a-modal
    v-model:visible="visible"
    title="域名管理"
    @ok="onSubmit"
    @afterClose="resetFields"
  >
    <a-form
      :model="formState"
      :rules="rules"
      layout="vertical"
    >
      <a-form-item label="项目">
        <a-select
          v-model:value="formState.project"
          :options="projectOptions"
        ></a-select>
      </a-form-item>
      <a-form-item label="域名">
        <a-input
          v-model:value="formState.domain"
        ></a-input>
      </a-form-item>
      <a-form-item label="过期时间">
        <a-date-picker
          v-model:value="formState.expiredAt"
          type="date"
          style="width: 100%"
          valueFormat="YYYY/MM/DD"
        ></a-date-picker>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { domainModal } from './index'
export default {
  name: 'DomainModal',
  props: {
    projectOptions: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup(props, { emit }) {
    const {
      visible, show,
      formState,
      rules,
      resetFields,
      onSubmit
    } = domainModal({ emit })

    return {
      visible, show,
      formState,
      rules,
      onSubmit,
      resetFields
    }
  }
}
</script>