import vue from '@vitejs/plugin-vue'
import path from 'path'
import packageJson from './package.json'

const r = (...args) => path.resolve(__dirname, ...args)

export default {
  root: r('./example'),
  plugins: [vue()],
  resolve: {
    alias: {
      [packageJson.name]: r('.'),
    },
  },
}
