import { modal } from '@/mixins/mixin'
import { useForm } from '@ant-design-vue/use'
import { reactive, computed, unref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
const domainTable = ({ project, domain }) => {
  const columns = [
    {
      title: '域名',
      dataIndex: 'domain',
      key: 'domain'
    },
    {
      title: '过期时间',
      dataIndex: 'expiredAt',
      key: 'expiredAt',
      slots: {
        customRender: 'expiredAt'
      }
    },
    {
      title: '项目',
      dataIndex: 'project',
      key: 'project',
      slots: {
        customRender: 'project'
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      slots: {
        customRender: 'operation'
      }
    }
  ]
  const projectOptions = computed(() => unref(project).map(i => {
    return {
      label: i.name,
      value: i.id
    }
  }))

  const domainList = computed(() => {
    return unref(domain).sort((a, b) => new Date(a.expiredAt) - new Date(b.expiredAt))
  })

  return {
    columns,
    projectOptions,
    domainList
  }
}

const domainModal = ({ domain, emit }) => {
  const { visible, onClose } = modal()
  
  const formState = reactive({
    project: '',
    domain: '',
    expiredAt: undefined
  })

  const rules  = reactive({
    domain: [
      { required: true, message: '请输入域名' }
    ],
    project: [
      { required: true, message: '请选择项目' }
    ],
    expiredAt: [
      { required: true, message: '请选择过期时间' }
    ]
  })

  const { resetFields, validate } = useForm(formState, rules)

  const onSubmit = () => {
    validate().then(values => {
      emit('submit', { id: formState.id || uuidv4(), ...values })
      resetFields()
      onClose()
    }).catch(err => {
      console.log(err)
    })
  }

  const show = item => {
    visible.value = true
    resetFields()
    Object.assign(formState, item)
  }

  const handleDomainSubmit = item => {
    const index = domain.value.findIndex(i => i.id === item.id)
    if (index > -1) {
      domain.value.splice(index, 1, item)
    } else {
      domain.value.push(item)
    }
  }

  return {
    visible,
    show,
    formState,
    rules,
    onSubmit,
    resetFields,
    handleDomainSubmit
  }
}

export {
  domainModal,
  domainTable
}