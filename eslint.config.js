import { configApp } from '@adonisjs/eslint-config'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
export default configApp([
  {
    plugins: {
      eslintPluginUnicorn,
    },
    files: ['inertia/**/*.ts', 'inertia/**/*.js'],
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],
    },
  },
])
