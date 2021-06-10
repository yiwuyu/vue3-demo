import { computed, unref, reactive } from 'vue'
import { modal } from '@/mixins/mixin'
import { useForm } from '@ant-design-vue/use'
import { v4 as uuidv4 } from 'uuid'
import CardWrap from './Card'

// table
const cardTable = (card, event) => {
  const columns = [
    {
      title: '卡',
      dataIndex: 'number',
      key: 'number'
    },
    {
      title: '初始余额(HKD)',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      slots: {
        customRender: 'amount'
      }
    },
    {
      title: '当前余额(HKD)',
      dataIndex: 'current',
      key: 'current',
      align: 'right',
      slots: {
        customRender: 'current'
      }
    },
    {
      title: '编辑',
      dataIndex: 'operation',
      key: 'operation',
      slots: {
        customRender: 'operation'
      }
    }
  ]

  const cardList = computed(() => {
    return unref(card).map(i => {
      const value = unref(event).filter(e => e.card === i.id).map(x => x.status ? (x.type === 0 ? -x.amount : x.amount) : 0).reduce((prev, next) => prev + next, 0)
      return {
        ...i,
        current: i.amount + value
      }
    })
  })

  return {
    columns,
    cardList
  }
}
// modal
const cardModal = ({ card, emit }) => {
  const { visible, onClose } = modal()

  let formState = reactive({
    amount: 0,
    number: ''
  })

  const rules = reactive({
    amount: [
      { required: true, message: '请输入金额', type: 'number' }
    ],
    number: [
      { required: true, message: '请输入卡号后四位' }
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

  const handleCardSubmit = (item) => {
    const index = card.value.findIndex(i => i.id === item.id)
    if (index > -1) {
      card.value.splice(index, 1, item)
    } else {
      card.value.push(item)
    }
  }

  return {
    visible,
    show,
    formState,
    rules,
    resetFields,
    onSubmit,
    handleCardSubmit
  }
}

export {
  CardWrap,
  cardTable,
  cardModal
}
