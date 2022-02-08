import { reactive } from 'vue'

const dialog = reactive({
  link: false
})

const extraData = reactive({
  data: {}
})

export default function useModals() {

  const openModal = function (label, data = null) {
    dialog[label] = true
    if(data) extraData.data = data
  }

  const closeModal = function (label) {
    dialog[label] = false
  }
  
  return { dialog, extraData, openModal, closeModal }

}