<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <a-row type="flex" justify="space-between" style="margin-bottom: 20px">
        <a-col :span="4">
          <input type="file" @change="handleFileChange">
        </a-col>
        <a-col :span="4">
          <a-button block @click="download">导出</a-button>
        </a-col>
      </a-row>
      <a-row type="flex" :gutter="[12, 12]" style="margin-bottom: 20px;align-items: stretch;">
        <a-col :span="12">
          <CardWrap :card="card" :event="event" @submit="handleCardSubmit" style="height: 100%" />
        </a-col>
        <a-col :span="12">
          <Project :project="project" :event="event" @submit="handleProjectSubmit" style="height: 100%" />
        </a-col>
      </a-row>
      <EventWrap :event="event" :card="card" :project="project" @submit="handleEventSubmit" />
    </div>
  </a-config-provider>
</template>

<script>
import { io } from './app'
import { cardModal, CardWrap } from '@/components/Card'
import { eventModal, EventWrap } from '@/components/Event'
import { projectModal, Project } from '@/components/Project'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
export default {
  name: 'App',
  components: { Project, CardWrap, EventWrap },
  setup() {
    const {
      event,
      card,
      project,
      handleFileChange,
      download
    } = io()

    const { handleCardSubmit } = cardModal({ card })

    const { handleProjectSubmit } = projectModal({ project })

    const { handleEventSubmit } = eventModal({ event })
    
    return {
      locale: zhCN,
      event,
      card,
      project,
      handleFileChange,
      download,
      handleCardSubmit,
      handleEventSubmit,
      handleProjectSubmit
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
