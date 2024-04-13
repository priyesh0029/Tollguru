import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from "dotenv"


dotenv.config();


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0', // Set to allow connections from all IPs
  },
  define: {
    'process.env.REACT_GOOGLEMAPS_APIkEY': JSON.stringify(process.env.REACT_GOOGLEMAPS_APIkEY),
    'process.env.TOLLGURU_BASE_URL' : JSON.stringify(process.env.TOLLGURU_BASE_URL),
    'process.env.TOLLGURU_APIKEY' : JSON.stringify(process.env.TOLLGURU_APIKEY)

  },
})

dotenv.config();