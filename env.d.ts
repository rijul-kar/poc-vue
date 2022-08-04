/// <reference types="vite/client" />

// VUE_APP_API_ROUTE = 'https://dummyapi.io/data/v1';
interface ImportMetaEnv {
  readonly VITE_APP_ID: string;
  readonly VITE_API_ROUTE: string;
  // more env variables...
}
