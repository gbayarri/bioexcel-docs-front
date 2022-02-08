<template>
    <Dialog v-model:visible="dialog.link" 
            @show="onShow"
            :closable="true"
            :closeOnEscape="true" 
            :dismissableMask="true" 
            :modal="true" 
            :baseZIndex="2001"
            :style="{ width: '60vw' }">
        <template #header>
            <i class="fas fa-link"></i> <h3>Create link for this block</h3>
        </template>

        <p>For sharing a direct link to this document, <strong>you just need to copy the URL below</strong>: </p>
        <div class="p-inputgroup">
            <Textarea v-model="linkHtml" rows="1" id="linktextarea" />
            <Button icon="far fa-copy" label="Copy" @click="copyLink" />
        </div>

        <template #footer>
            <Button label="Close" icon="pi pi-times" class="p-button-outlined" @click="closeThisModal" />
        </template>
    </Dialog>
</template>

<script>
import { computed } from 'vue'
import useModals from '@/modules/common/useModals'
export default {
    components: {  },
    setup() {

        const { dialog, extraData, closeModal } = useModals()

        const closeThisModal = () => {
            closeModal('link')
        }

        const onShow = () => {
            document.querySelector('#linktextarea').setAttribute('readonly', 'true')
        }

        const linkHtml = computed(() => extraData.data.url)
        const copyLink = () => {
            const copyTextarea = document.querySelector('#linktextarea')
            copyTextarea.focus();
            copyTextarea.select();
            try {
                document.execCommand('copy')
                console.log('Text successfully copied into clipboard')
            } catch (err) {
                console.log('Oops, unable to copy')
            }
        }

        return { 
            dialog, closeThisModal, onShow,
            linkHtml, copyLink
        }
    }
}
</script>

<style>
    #linktextarea { resize: none;}
</style>