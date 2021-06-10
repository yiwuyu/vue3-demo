import { createApp } from 'vue'
import {
  Button,
  Form,
  Card,
  Row,
  Col,
  Table,
  Modal,
  InputNumber,
  Select,
  Switch,
  DatePicker,
  Input,
  ConfigProvider
} from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
// app.use(Antd)
app.use(Button)
app.use(Form)
app.use(Card)
app.use(Row)
app.use(Col)
app.use(Table)
app.use(Modal)
app.use(InputNumber)
app.use(Select)
app.use(Switch)
app.use(DatePicker)
app.use(Input)
app.use(ConfigProvider)
app.config.productionTip = false
app.mount('#app')
