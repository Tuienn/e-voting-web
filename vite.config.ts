import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        svgr({
            svgrOptions: {
                icon: true, // scale theo font-size
                dimensions: false // bỏ width/height cứng
            }
        }),
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler']]
            }
        })
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes('node_modules')) return

                    if (id.includes('react')) return 'react'
                    if (id.includes('@tanstack')) return 'tanstack'
                    if (id.includes('@mui/icons-material')) return 'mui-icons'
                    if (id.includes('@mui')) return 'mui'
                    if (id.includes('@emotion')) return 'emotion'
                    if (id.includes('i18next') || id.includes('react-i18next')) return 'i18n'
                    if (id.includes('crypto-js')) return 'crypto'
                    if (id.includes('axios')) return 'axios'

                    return 'vendor'
                }
            },
            plugins: [
                visualizer({
                    open: true,
                    gzipSize: true,
                    brotliSize: true
                })
            ]
        }
    }
})
