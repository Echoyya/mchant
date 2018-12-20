module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: ['plugin:vue/essential', 'plugin:prettier/recommended'],
    // required to lint *.vue files
    plugins: ['vue', 'prettier'],
    // add your custom rules here
    rules: {
        'vue/html-indent': ['error', 4],
        'vue/max-attributes-per-line': [
            2,
            {
                singleline: 20
            }
        ],
        'vue/mustache-interpolation-spacing': 'off',
        'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
        'prettier/prettier': 0,
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
}
