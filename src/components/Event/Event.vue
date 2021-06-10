<style scoped>
.font-color.red {
  color: red;
}
</style>
<template>
  <a-card
    title="事件"
  >
    <template #extra>
      <a @click="showModal()">添加</a>
    </template>
    <div class="search">
      <a-form
        :model="search"
        layout="inline"
      >
        <a-form-item label="关联卡">
          <a-select
            v-model:value="search.card"
            :options="cardOptions"
            style="width: 120px"
            allowClear
          ></a-select>
        </a-form-item>
        <a-form-item label="项目">
          <a-select
            v-model:value="search.project"
            :options="projectOptions"
            style="width: 120px"
            allowClear
          ></a-select>
        </a-form-item>
        <a-form-item label="类型">
          <a-select
            style="width: 120px"
            v-model:value="search.type"
            allowClear
          >
            <a-select-option :value="1">充值</a-select-option>
            <a-select-option :value="0">扣款</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            style="width: 120px"
            v-model:value="search.status"
            allowClear
          >
            <a-select-option :value="1">已成交</a-select-option>
            <a-select-option :value="0">未成交</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button @click.prevent="resetFields">重置</a-button>
        </a-form-item>
      </a-form>
    </div>
    <a-table
      rowKey="id"
      :dataSource="eventList"
      :columns="columns"
    >
      <template #amount="{ text }">
        {{ padZero(NumberFormat(text)) }}
      </template>
      <template #usd="{ text }">
        {{ padZero(NumberFormat(text)) }}
      </template>
      <template #type="{ text }">
        {{ getType(text) }}
      </template>
      <template #card="{ text }">
        {{ getCardNumber(text) }}
      </template>
      <template #project="{ text }">
        {{ getProjectName(text) }}
      </template>
      <template #operation="{ record }">
        <a @click="showModal(record)">编辑</a>
      </template>
      <template #status="{ text }">
        <span :class="['font-color', !text && 'red']">{{ getEventStatus(text) }}</span>
      </template>
    </a-table>
    <EventModal :cardOptions="cardOptions" :projectOptions="projectOptions" ref="modal" @submit="handleSubmit" />
  </a-card>
</template>

<script>
import { ref, toRefs, unref } from '@vue/reactivity'
import EventModal from './EventModal.vue'
import { eventTable } from './index'
import { NumberFormat, padZero } from '@/mixins/mixin'
export default {
  name: 'Event',
  components: {
    EventModal
  },
  props: {
    event: {
      type: Array,
      default() {
        return []
      }
    },
    card: {
      type: Array,
      default() {
        return []
      }
    },
    project: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup(props, { emit }) {
    const modal = ref()
    const showModal = (item) => {
      modal.value.show(item)
    }
    
    const handleSubmit = (item) => {
      emit('submit', item)
    }

    const { card, project, event } = toRefs(props)

    const {
      cardOptions, projectOptions,
      columns, search, resetFields, eventList
    } = eventTable(card, project, event)

    const getCardNumber = id => {
      const cardItem = unref(card).find(i => id === i.id)
      return cardItem && cardItem.number
    }
    const getProjectName = id => {
      const projectItem = unref(project).find(i => id === i.id)
      return projectItem && projectItem.name
    }
    const getEventStatus = bool => {
      return bool ? '已成交' : '未成交'
    }
    const getType = text => {
      return ['扣款', '充值'][text]
    }

    return {
      search,
      resetFields,
      modal,
      showModal,
      handleSubmit,
      columns,
      cardOptions,
      projectOptions,
      getCardNumber,
      getProjectName,
      getEventStatus,
      getType,
      eventList,
      NumberFormat,
      padZero
    }
  }
}
</script>