<template>
  <a-card
    title="card"
  >
    <template #extra>
      <a @click="showModal()">添加</a>
    </template>

    <div class="card-wrap">
      <a-table
        rowKey="id"
        :dataSource="cardList"
        :columns="columns"
        :pagination="false"
      >
        <template #current="{ text }">
          {{ padZero(NumberFormat(text)) }}
        </template>
        <template #amount="{ text }">
          {{ padZero(NumberFormat(text)) }}
        </template>
        <template #operation="{ record }">
          <a @click="showModal(record)">编辑</a>
        </template>
      </a-table>
    </div>
    <CardModal ref="modal" @submit="handleSubmit" />
  </a-card>
</template>

<script>
import { ref, toRefs } from '@vue/reactivity'
import CardModal from './CardModal'
import { NumberFormat, padZero } from '@/mixins/mixin'
import { cardTable } from './index'
export default {
  name: 'Card',
  components: { CardModal },
  props: {
    card: {
      type: Array,
      default() {
        return []
      }
    },
    event: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup(props, { emit }) {
    // modal
    const modal = ref()
    const showModal = (item) => {
      modal.value.show(item)
    }
    const handleSubmit = (item) => {
      emit('submit', item)
    }

    const { card, event } = toRefs(props)

    const { columns, cardList } = cardTable(card, event)
    
    return {
      modal,
      showModal,
      handleSubmit,
      // table
      cardList,
      columns,
      // filter
      NumberFormat,
      padZero
    }
  }
}
</script>