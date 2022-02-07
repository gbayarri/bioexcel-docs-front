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

    // fetch Document image
    const fetchDocumentImage = async (id) => {

        const response = await fetch(`${process.env.VUE_APP_API_FILES}${id}/png`)
        return response

    }

    // fetch Document pdf
    const fetchDocumentPDF = async (id) => {

        const response = await fetch(`${process.env.VUE_APP_API_FILES}${id}/pdf`)
        return response

    }

    return {
        apiData, respStatus,
        fetchCategoryDocuments,
        fetchDocumentImage,
        fetchDocumentPDF
    }

}