/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_ADMIN_URL: string
  readonly VITE_API_CUSTOMER_URL: string
  readonly VITE_REGION: string
  readonly VITE_TABLE: string
  readonly VITE_ADMIN_USER_POOL_ID: string
  readonly VITE_ADMIN_USER_POOL_CLIENT_ID: string
  readonly VITE_ADMIN_IDENTITY_POOL_ID: string
  readonly VITE_CUSTOMER_USER_POOL_ID: string
  readonly VITE_CUSTOMER_USER_POOL_CLIENT_ID: string
  readonly VITE_CUSTOMER_IDENTITY_POOL_ID: string
  readonly VITE_API_WEBSOCKET_URL: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}