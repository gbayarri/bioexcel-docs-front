<template>
    <div class="main container">
        <h1>{{ header }}</h1> 
        <Card style="margin-bottom: 2em" v-for="(doc) in docsList" :key="doc.id" v-bind="{ id: doc.id }">
            <template #title>
                {{ doc.name }}
            </template>
            <template #content>
                <div class="grid">
                    <div class="lg:col-3 md:col-4 sm:col-12 col-thumbnail">
                        <img :src="images[doc.id]" class="thumbnail" >
                    </div>
                    <div class="lg:col-9 md:col-8 sm:col-12">
                        <p v-html="doc.abstract"></p>
                    </div>
                </div>
                <Button icon="fas fa-file-pdf" class="p-button-sm" label="Open in PDF format" @click="openExternal(doc.id)" />
                <Button icon="fas fa-link" class="p-button-sm p-button-outlined" style="float: right;" label="Get link for this document" @click="openModalLink(doc.id)" />
            </template>
        </Card>
        <ScrollTop :threshold="200" />
    </div>

    <ModalLink />
</template>

<script>
import globals from "@/globals";
import { ref, computed, watch } from 'vue'
import useAPI from '@/modules/api/useAPI'
import useModals from '@/modules/common/useModals'
import ModalLink from '@/components/modals/ModalLink'
export default {
    components: { 
        ModalLink
    },
    props: ['id'],
    setup(props) {

        const { apiData, respStatus, fetchCategoryDocuments, fetchFile } = useAPI()
        const { openModal } = useModals()

        const doc_id = computed(() => props.id)

        const openExternal = (id) => {
            window.open(`${window.location.origin}${process.env.BASE_URL}${process.env.VUE_APP_URL_FILES}${id}/pdf`);
        }

        const openModalLink= (id) => {
            const data = {
                url: `${window.location.origin}${process.env.BASE_URL}docs/${doc_id.value}#${id}`
            }
            openModal('link', data)
        }

        let docsList = ref([])
        let header = ref('LOADING...')
        let images = ref({})

        const loadDocsList = (id) => {
            fetchCategoryDocuments(id)
                .then(() => {
                    if(respStatus.value === 200) {
                        docsList.value = apiData.value
                        header.value = globals.menu.filter(item => item.category === id)[0].desc

                        // create images URLs
                        docsList.value.forEach(item => {
                            fetchFile(item.id, 'png')
                                .then(response => response.blob())
                                .then(blob => {
                                    const file = new Blob([blob], { type: globals.file_types.filter(item => item.id === 'png')[0].type });
                                    const fileURL = URL.createObjectURL(file);
                                    images.value[item.id] = fileURL
                                })
                        })

                        // once page is loaded, check if anchor in URL and go there
                        setTimeout(() => {
                            if(window.location.hash) {
                                var top = document.querySelector(window.location.hash).offsetTop
                                document.body.scrollTop = top
                            }
                        }, 1000)

                    } else if(respStatus.value === 404) {
                        console.error('Category not found')
                        header.value = 'CATEGORY NOT FOUND'
                    }
                })
        }

        loadDocsList(doc_id.value)

        watch(doc_id, (id, prevID) => {
            if(id !== prevID) {
                loadDocsList(id)
            }
        })

        return { header, /*doc_id,*/ docsList, images, openExternal, openModalLink }

    }
}
</script>

<style>
    .thumbnail {  width:100%; }
    .col-thumbnail {
        background-image: url("~@/assets/loader.svg"); 
        background-repeat: no-repeat; 
        background-position: center;
    }
</style>