import antfu from "@antfu/eslint-config"
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()


export default antfu({
  // TypeScript and Vue are autoetected, you can also explicitly enable them:
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: "double", // or 'double'
    semi: true,
  },
  typescript: true,
  vue: true,
},
...compat.config({
    extends: ["plugin:tailwindcss/recommended"],
  })
)
