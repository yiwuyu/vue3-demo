<style scoped>
  .font-color.red {
    color: red;
  }
  .font-color.orange {
    color: orange;
  }
</style>
<template>
  <a-card
    title="域名"
  >
    <template #extra>
      <a @click="showModal()">添加</a>
    </template>

    <a-table
      rowKey="id"
      :dataSource="domainList"
      :columns="columns"
    >
      <template #expiredAt="{ text }">
        <span :class="['font-color', getColors(text)]">{{ text }} {{ getColorText(text) }}</span>
      </template>
      <template #project="{ text }">
        {{ getProjectName(text) }}
      </template>
      <template #operation="{ record }">
        <a @click="showModal(record)">编辑</a>
      </template>
    </a-table>
    <DomainModal :projectOptions="projectOptions" ref="modal" @submit="handleSubmit" />
  </a-card>
</template>

<script>
import { ref, toRefs, unref } from 'vue'
import DomainModal from './DomainModal'
import { domainTable } from './index'
export default {
  name: 'Domain',
  components: {
    DomainModal
  },
  props: {
    project: {
      type: Array,
      default() {
        return []
      }
    },
    domain: {
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
      console.log(item)
      emit('submit', item)
    }

    const { project, domain } = toRefs(props)

    const {
      columns,
      projectOptions,
      domainList
    } = domainTable({ project, domain })

    const getProjectName = id => {
      const projectItem = unref(project).find(i => id === i.id)
      return projectItem && projectItem.name
    }

    const getColors = expiredAt => {
      const during = new Date(expiredAt) - new Date()
      
      if (during < 0) {
        return 'red'
      } else if (during < 7 * 24 * 60 * 60 * 1000) {
        return 'orange'
      }
      return ''
    }
    const getColorText = expiredAt => {
      const during = new Date(expiredAt) - new Date()
      
      if (during < 0) {
        return '【已过期，请尽快续费】'
      } else if (during < 7 * 24 * 60 * 60 * 1000) {
        return '【7天内过期，请尽快检查续费情况】'
      }
      return ''
    }

    return {
      modal,
      showModal,
      handleSubmit,
      getProjectName,
      getColors,
      getColorText,
      columns,
      domainList,
      projectOptions
    }
  }
}
</script>