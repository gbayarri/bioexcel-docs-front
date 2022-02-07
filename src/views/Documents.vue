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
            </template>
        </Card>
        <ScrollTop :threshold="200" />
    </div>
</template>

<script>
import globals from "@/globals";
import { inject, ref, computed, watch } from 'vue'
import useAPI from '@/modules/api/useAPI'
export default {
    props: ['id'],
    setup(props) {

        const $router = inject('$router')

        const { apiData, respStatus, fetchCategoryDocuments, fetchDocumentImage, fetchDocumentPDF } = useAPI()

        const doc_id = computed(() => props.id)

        const openExternal = (id) => {
            fetchDocumentPDF(id)
                .then(response => response.blob())
                .then(blob => {
                    const file = new Blob([blob], {type: 'application/pdf'});
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL, '_blank');
                })

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
                            fetchDocumentImage(item.id)
                                .then(response => response.blob())
                                .then(blob => {
                                    const file = new Blob([blob], {type: 'image/png'});
                                    const fileURL = URL.createObjectURL(file);
                                    images.value[item.id] = fileURL
                                }) 
                        })

                        // once page is loaded, check if anchor in URL and go to it
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

        return { header, doc_id, docsList, images, openExternal }

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