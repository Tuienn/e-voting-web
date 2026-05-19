import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            'react-refresh/only-export-components': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    args: 'after-used',
                    ignoreRestSiblings: true,

                    // cho phép biến bắt đầu bằng _
                    varsIgnorePattern: '^_',
                    argsIgnorePattern: '^_'
                }
            ],
            'no-unused-vars': 'off',
            'no-restricted-imports': [
                'error',
                {
                    patterns: [{ regex: '^@mui/[^/]+$' }]
                }
            ]
            // Doc: https://mui.com/material-ui/guides/minimizing-bundle-size/
        }
    }
])
