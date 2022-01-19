<template>
    <div class="main container">
        <h1>{{ header }}</h1> 
        <Card style="margin-bottom: 2em" v-for="(doc) in docsList" :key="doc.id" v-bind="{ id: doc.id }">
            <template #title>
                {{ doc.name }}
            </template>
            <template #content>
                <div class="grid">
                    <div class="lg:col-3 md:col-4 sm:col-12">
                        <img :src="require(`@/assets/img/thumbnails/${doc_id}/${doc.id}.png`)" class="thumbnail" >
                    </div>
                    <div class="lg:col-9 md:col-8 sm:col-12">
                        <p v-html="doc.abstract"></p>
                    </div>
                </div>
                <Button icon="fas fa-file-pdf" class="p-button-sm" label="Open in PDF format" @click="openExternal(doc.path)" />
            </template>
        </Card>
        <ScrollTop :threshold="200" />
    </div>
</template>

<script>
import { computed } from 'vue'
import docsUC3 from "@/data/uc3.json";
import docsWP2 from "@/data/wp2.json";
import docsBioBB from "@/data/biobb.json";
export default {
    props: ['id'],
    setup(props) {

        let doc_id = computed(() => props.id)

        const documentation = {
            uc3: docsUC3,
            wp2: docsWP2,
            biobb: docsBioBB
        }

        const headers = {
            uc3: 'Use Case 3 preprints',
            wp2: 'Work Package 2 deliverables',
            biobb: 'BioBB related papers'
        }

        const docsList = computed(() => documentation[doc_id.value])
        const header = computed(() => headers[doc_id.value])

        const openExternal = (path) => {
            window.open(process.env.VUE_APP_DATA_URL + path, '_blank')
        }

        return { header, doc_id, docsList, openExternal }

    }
}
</script>

<style>
    .thumbnail { width:100%; }
</style>