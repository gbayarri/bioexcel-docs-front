import { reactive } from 'vue'

const flags = reactive({
    menuEnabled: true
})

export default function useFlags() {

  const setFlagStatus = function (label, status) {
    flags[label] = status
  }

  return { flags, setFlagStatus }

}