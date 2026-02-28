import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/formfreedom/',
    server: {
        proxy: {
            '/api': 'http://localhost:5000'
        }
    }
})
