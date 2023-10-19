import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // starts development server on port 3001
  server: {
    port: 3001,
    host: true, 
  },

  // starts preview server on port 3001
  preview: {
    port: 3001,
    host:true
  },
})
