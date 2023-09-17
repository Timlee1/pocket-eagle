module.exports = {
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": ["standard-with-typescript", "prettier"],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script",
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": ["prettier"],
    "rules": {
        "@typescript-eslint/space-before-function-paren": "off",
        "@typescript-eslint/no-misused-promises":"off",
        "@typescript-eslint/semi": "off",
        "semi": [2, "always"]
    }
}
