import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['**/*.{js,mjs,cjs,ts,vue}'],
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            indent: [
                'error',
                4,
                {
                    SwitchCase: 1
                }
            ],
            'vue/multi-word-component-names': [
                'error',
                {
                    ignores: ['index', 'Header'] //需要忽略的组件名
                }
            ],
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            semi: 'off',
            '@typescript-eslint/no-this-alias': 'off',
            'eslintno-debugger': 'off',
            'vue/no-unused-vars': 'off',
            'vue/no-template-shadow': 'off',
            'vue/require-v-for-key': 'off',
            'vue/no-textarea-mustache': 'off',
            'vue/no-v-html': 'off'
        }
    },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    ...pluginPrettier.configs.recommended,
    { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } }
];
