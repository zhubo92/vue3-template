import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintAutoImport from "./.eslintrc-auto-import.json" assert { type: "json" };

/** @type {import("eslint").Linter.Config[]} */
export default [
    {
        languageOptions: {
            globals: {
                ...eslintAutoImport.globals,
                ...globals.browser,
                ...globals.node
            }
        }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs["flat/essential"],
    { files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } },
    {
        files: ["**/*.{js,mjs,cjs,ts,vue,less}"],
        rules: {
            "@typescript-eslint/no-unused-vars": "off",
            indent: [
                "error",
                4,
                {
                    SwitchCase: 1
                }
            ],
            "vue/multi-word-component-names": [
                "error",
                {
                    ignores: ["index", "Header"] //需要忽略的组件名
                }
            ],
            "@typescript-eslint/no-var-requires": "off",
            "@typescript-eslint/no-explicit-any": "off",
            semi: "off",
            "@typescript-eslint/no-this-alias": "off",
            "eslintno-debugger": "off",
            "vue/no-unused-vars": "off",
            "vue/no-template-shadow": "off",
            "vue/require-v-for-key": "off",
            "vue/no-textarea-mustache": "off",
            "vue/no-v-html": "off",
            quotes: ["error", "double"],
            "no-constant-condition": "off"
        },
        ignores: [
            "node_modules",
            "*.md",
            ".vscode",
            ".idea",
            "dist",
            "/public",
            "/docs",
            ".husky",
            ".local",
            "/bin",
            "Dockerfile"
        ]
    },
    eslintPluginPrettierRecommended
];
