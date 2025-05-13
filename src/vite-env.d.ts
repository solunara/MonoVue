/// <reference types="vite/client" />
interface ImportMeta {
  url: string
}
declare module "*.vue" {
  import { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}
