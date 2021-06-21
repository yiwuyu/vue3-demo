<template>
  <a-modal
    title="事件"
    @ok="onSubmit"
    v-model:visible="visible"
    @afterClose="resetFields"
  >
    <a-form
      :model="formState"
      :rules="rules"
      layout="vertical"
    >
      <a-form-item label="时间">
        <a-date-picker
          v-model:value="formState.tradedAt"
          type="date"
          style="width: 100%"
          valueFormat="YYYY/MM/DD"
        ></a-date-picker>
      </a-form-item>
      <a-form-item label="类型">
        <a-select v-model:value="formState.type">
          <a-select-option :value="1">充值</a-select-option>
          <a-select-option :value="0">扣款</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="关联卡">
        <a-select
          v-model:value="formState.card"
          :options="cardOptions"
        ></a-select>
      </a-form-item>
      <a-form-item label="关联项目" v-if="formState.type === 0">
        <a-select
          v-model:value="formState.project"
          :options="projectOptions"
        ></a-select>
      </a-form-item>
      <a-form-item
        label="项目类型"
        v-if="formState.project"
      >
        <a-radio-group
          v-model:value="formState.eventType"
          :options="eventTypeOptions"
        >
        </a-radio-group>
      </a-form-item>
      <a-form-item label="金额(HKD)">
        <a-input-number style="width: 100%" v-model:value="formState.amount" :min="0"></a-input-number>
      </a-form-item>
      <a-form-item label="金额(USD)">
        <a-input-number style="width: 100%" :min="0" v-model:value="formState.usd"></a-input-number>
      </a-form-item>
      <a-form-item label="状态">
        <a-switch v-model:checked="formState.status"></a-switch>
      </a-form-item>
      <a-form-item label="备注">
        <a-textarea
          v-model:value="formState.remark"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { eventModal } from './index'
export default {
  name: 'EventModal',
  props: {
    cardOptions: {
      type: Array,
      default() {
        return []
      }
    },
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
    } = eventModal({ emit })

    const eventTypeOptions = [
      { label: 'EC2', value: 0 },
      { label: 'DOMAIN', value: 1 }
    ]
    
    return {
      visible, show,
      formState,
      rules,
      onSubmit,
      eventTypeOptions,
      resetFields
    }
  }
}
</script>