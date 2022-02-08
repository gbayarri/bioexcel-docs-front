<template>
    <embed v-if="file_type === 'pdf'" :src="fileURL" id="file-container" type="application/pdf">
    <img v-if="file_type === 'png'" :src="fileURL" >
</template>

<script>
import globals from "@/globals"
import { ref, computed } from 'vue'
import useFlags from '@/modules/common/useFlags'
import useAPI from '@/modules/api/useAPI'
export default {
    props: ['id', 'type'],
    setup(props) {

        const { setFlagStatus } = useFlags()
        const { fetchFile } = useAPI()

        const doc_id = computed(() => props.id)
        const file_type = computed(() => props.type)

        setFlagStatus('menuEnabled', false)
        setFlagStatus('footerEnabled', false)

        let fileURL = ref()

        fetchFile(doc_id.value, file_type.value)
            .then(response => response.blob())
            .then(blob => {
                const file = new Blob([blob], { type: globals.file_types.filter(item => item.id === file_type.value)[0].type });
                fileURL.value = URL.createObjectURL(file);
            })

        // hide overflow only for this component
        document.querySelector('body').style.overflowY = "hidden";

        return { file_type, fileURL }

    }
}
</script>

<style>
    
</style>