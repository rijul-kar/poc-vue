import { Axios } from 'axios';

const https = new Axios({
  baseURL: import.meta.env.VITE_API_ROUTE,
  headers: {
    'app-id': import.meta.env.VITE_APP_ID,
  },
});

export default https;
