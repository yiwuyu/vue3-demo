import { ref, unref } from "vue"
import { saveAs } from 'file-saver'

export const io = () => {
  const card = ref([])
  const project = ref([])
  const event = ref([])
  const domain = ref([])
  const handleFileChange = (e) => {
    const reader = new FileReader()
    reader.onload = () => {
      const data = JSON.parse(reader.result)
      card.value = data.card || []
      project.value = data.project || []
      event.value = data.event || []
      domain.value = data.domain || []
    }
    e.target.files[0] && reader.readAsText(e.target.files[0])
  }
  const download = () => {
    const data = {
      card: unref(card),
      project: unref(project),
      event: unref(event),
      domain: unref(domain)
    }
    const jsonStr = JSON.stringify(data, null, '\t')
    console.log(jsonStr)
    const blob = new Blob([jsonStr], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, 'data.json')
  }
  
  
  return {
    card,
    project,
    event,
    domain,
    handleFileChange,
    download
  }
}