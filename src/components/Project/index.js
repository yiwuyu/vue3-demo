import { v4 as uuidv4 } from 'uuid'
import { modal } from '@/mixins/mixin'
import { useForm } from '@ant-design-vue/use'
import { computed, unref, reactive } from 'vue'
import Project from './Project'

const projectTable = (project, event) => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '是否存在账单欠费',
      dataIndex: 'status',
      key: 'status',
      align: 'right',
      slots: {
        customRender: 'status'
      }
    }
  ]
  const projectList = computed(() => {
    const eventList = unref(event)
    return unref(project).map(i => {
      return {
        ...i,
        status: eventList.findIndex(e => e.project === i.id && !e.status && e.type === 0) > -1
      }
    })
  })
  
  return {
    columns,
    projectList
  }
}

const projectModal = ({ project, emit }) => {
  const { visible, onClose } = modal()
  const show = () => {
    visible.value = true
  }

  const formState = reactive({
    name: ''
  })
  const rules = reactive({
    name: [
      { required: true, message: '请输入项目简称' }
    ]
  })
  const { validate, resetFields } = useForm(formState, rules)

  const onSubmit = () => {
    formState
    validate().then(() => {
      emit('submit', { id: uuidv4(), ...unref(formState) })
      resetFields()
      onClose()
    }).catch(err => {
      console.log(err)
    })
  }
  
  const handleProjectSubmit = (item) => {
    const index = project.value.findIndex(i => i.id === item.id)
    if (index > -1) {
      project.value.splice(index, 1, item)
    } else {
      project.value.push(item)
    }
  }
  return {
    visible,
    show,
    formState,
    onSubmit,
    handleProjectSubmit
  }
}

export {
  Project,
  projectTable,
  projectModal
}
