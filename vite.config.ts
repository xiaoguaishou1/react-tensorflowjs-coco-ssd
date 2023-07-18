/*
 * @Author: panghu
 * @Date: 2023-07-14 19:41:42
 * @LastEditors: panghu 760695955@qq.com
 * @LastEditTime: 2023-07-14 19:56:51
 * @FilePath: /tensorflow/vite.config.ts
 * @Description: 
 * 
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0"
  },
  plugins: [react()],
})
