import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router"
import { createHead } from '@unhead/vue'
import Counter from './components/Counter.vue'
import 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-markup-templating'



const files = import.meta.glob('./src/technology/**.md')

const app = createApp(App)
app.use(createHead())
app.component("Counter",Counter)
// app.use(router)
app.mount('#app')
