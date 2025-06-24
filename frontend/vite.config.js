import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    host: '0.0.0.0', // 외부 접속 허용
    allowedHosts: ['a80c-1-240-85-140.ngrok-free.app'], // 여기에 ngrok 주소 추가
  },
})
