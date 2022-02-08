<template>
    <footer v-if="footerEnabled" class="footer">
      <div class="container">
        <span class="text-muted">{{ new Date().getFullYear() }} &copy; <a target="_blank" class="white-link" href="https://mmb.irbbarcelona.org">Molecular Modeling and Bioinformatics Group</a></span>
      </div>
    </footer>
</template>

<script>
import { computed } from "vue";
import useFlags from "@/modules/common/useFlags";
export default {
  setup() {
    const { flags } = useFlags();

    const footerEnabled = computed(() => flags.footerEnabled);

    return { footerEnabled };
  }
}
</script>

<style>

</style>