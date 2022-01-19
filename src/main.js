import { createApp } from 'vue'

// import PrimeVue and components
import PrimeVue from 'primevue/config'
import TabMenu from 'primevue/tabmenu'
import Panel from 'primevue/panel'
import Card from 'primevue/card'
import Button from 'primevue/button'

// custom components
import ScrollTop from '@/components/custom/ScrollTop'

// generic components
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'

import App from '@/App.vue'
import router from '@/router'

// import PrimeVue resources
import 'primevue/resources/themes/saga-blue/theme.css'      
import 'primevue/resources/primevue.min.css'                
import 'primeicons/primeicons.css'                          
import 'primeflex/primeflex.css'
// import font awesome
import '@fortawesome/fontawesome-free/css/all.css'

// main css
import '@/css/main.css'

const app = createApp(App)
app.use(router)
app.use(PrimeVue, {ripple: true})

// create global components
app.component('TabMenu', TabMenu)
app.component('Header', Header)
app.component('Footer', Footer)
app.component('Panel', Panel)
app.component('Card', Card)
app.component('Button', Button)
app.component('ScrollTop', ScrollTop)

//mount app
app.mount('#app')
// provide / inject globally modules
app.provide('$router', router)
