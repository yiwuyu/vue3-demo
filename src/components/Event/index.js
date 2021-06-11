import { v4 as uuidv4 } from 'uuid'
import { reactive, unref, computed } from 'vue'
import { modal } from '@/mixins/mixin'
import { useForm } from '@ant-design-vue/use'
import EventWrap from './Event'

const eventTable = (card, project, event) => {
  
  const cardOptions = computed(() => unref(card).map(i => {
    return {
      label: i.number,
      value: i.id
    }
  }))

  const projectOptions = computed(() => unref(project).map(i => {
    return {
      label: i.name,
      value: i.id
    }
  }))

  const columns = [
    {
      title: '时间',
      dataIndex: 'tradedAt',
      key: 'tradedAt'
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      slots: {
        customRender: 'type'
      }
    },
    {
      title: '关联卡',
      dataIndex: 'card',
      key: 'card',
      slots: {
        customRender: 'card'
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
      title: '金额HKD',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      slots: {
        customRender: 'amount'
      }
    },
    {
      title: '金额USD',
      dataIndex: 'usd',
      key: 'usd',
      align: 'right',
      slots: {
        customRender: 'usd'
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      slots: {
        customRender: 'status'
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

  const search = reactive({
    type: undefined,
    project: undefined,
    card: undefined,
    status: undefined
  })

  const resetFields = () => {
    Object.assign(search, {
      type: undefined,
      project: undefined,
      card: undefined,
      status: undefined
    })
  }
  
  const eventList = computed(() => {
    const { type, project, card, status } = unref(search)
    return unref(event).filter(i => {
      // console.log(i, (type === undefined ? true : type === i.type)
      // && (project === undefined ? true : project === i.project)
      // && (card === undefined ? true : card === i.card)
      // && (status === undefined ? true : i.status === (!!status)))
      return (type === undefined ? true : type === i.type)
      && (project === undefined ? true : project === i.project)
      && (card === undefined ? true : card === i.card)
      && (status === undefined ? true : i.status === (!!status))
    }).sort((a, b) => new Date(b.tradedAt) - new Date(a.tradedAt))
  })

  return {
    columns,
    search,
    eventList,
    resetFields,
    cardOptions,
    projectOptions
  }
}

const eventModal = ({ event, emit }) => {
  const { visible, onClose } = modal()

  const formState = reactive({
    tradedAt: undefined,
    type: 0,
    card: '',
    project: '',
    amount: 0,
    usd: 0,
    status: false
  })

  const rules = reactive({
    tradedAt: [
      { required: true, message: '请选择交易时间' }
    ],
    card: [
      { required: true, message: '请选择关联卡' }
    ]
  })

  const { resetFields, validate } = useForm(formState, rules)

  const show = (item) => {
    visible.value = true
    resetFields()
    Object.assign(formState, item)
  }

  const onSubmit = () => {
    validate()
    .then(() => {
      emit('submit', { id: formState.id || uuidv4(), ...unref(formState) })
      resetFields()
      onClose()
    }).catch(err => {
      console.log(err)
    })
  }

  const handleEventSubmit = (item) => {
    const index = event.value.findIndex(i => i.id === item.id)
    if (index > -1) {
      event.value.splice(index, 1, item)
    } else {
      event.value.push(item)
    }
  }

  return {
    visible,
    show,
    formState,
    rules,
    onSubmit,
    handleEventSubmit
  }
}

export {
  EventWrap,
  eventTable,
  eventModal
}