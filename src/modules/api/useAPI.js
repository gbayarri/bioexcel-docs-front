import { ref } from 'vue'

export default function useAPI() {

    const apiData = ref({})
    const respStatus = ref(0)

    // fetch Category list
    const fetchCategoryDocuments = async (id) => {

        const response = await fetch(`${process.env.VUE_APP_API_DOCUMENTS}category/${id}`)
        respStatus.value = response.status
        apiData.value = await response.json()

    }

    // fetch Document file
    const fetchFile = async (id, type) => {

        const url = type === 'png' ? `${process.env.VUE_APP_API_FILES}${id}/png` : `${process.env.VUE_APP_API_FILES}${id}/pdf`

        const response = await fetch(url)
        return response

    }

    return {
        apiData, respStatus,
        fetchCategoryDocuments,
        fetchFile
    }

}