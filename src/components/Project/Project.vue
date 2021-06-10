<style scoped>
.font-color.red {
  color: red;
}
</style>
<template>
  <a-card
    title="project"
  >
    <template #extra>
      <a @click="showModal">添加</a>
    </template>
    <a-table
      :dataSource="projectList"
      :columns="columns"
      rowKey="id"
      :pagination="false"
    >
      <template #status="{ text }">
        <span :class="['font-color', text && 'red']">
          {{ getStatusText(text) }}
        </span>
      </template>
    </a-table>
    <ProjectModal ref="modal" @submit="handleSubmit" />
  </a-card>
</template>

<script>
import { ref, toRefs } from 'vue'
import { projectTable } from './index'
import ProjectModal from './ProjectModal'
export default {
  name: 'Project',
  components: { ProjectModal },
  props: {
    project: {
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
    const modal = ref()
    const showModal = () => {
      modal.value.show()
    }
    const handleSubmit = (item) => {
      emit('submit', item)
    }
    
    const { project, event } = toRefs(props)

    const { columns, projectList } = projectTable(project, event)


    const getStatusText = bool => {
      return bool ? '是' : '否'
    }
    return {
      modal,
      showModal,
      handleSubmit,
      // table
      projectList,
      columns,
      // filter
      getStatusText
    }
  }
}
</script>