module.exports = {
    "root": true,
    "plugins": ["node"],
    "extends": "airbnb",
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
    },
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "brace-style": "error",
        "eol-last": "error",
        "eqeqeq": "error",
        "global-require": "off",
        "indent": [
            "error", 4, {
                "SwitchCase": 1
            }
        ],
        "key-spacing": "error",
        "keyword-spacing": [
            "error", {
                "after": true
            }
        ],
        "no-caller": "error",
        "no-console": "off",
        "node/no-deprecated-api": "error",
        "node/no-missing-import": "error",
        "node/no-missing-require": [
            "error", {
                "allowModules": [
                    "webpack"
                ]
            }
        ],
        "node/no-unpublished-bin": "error",
        "node/no-unpublished-require": "error",
        "node/process-exit-as-throw": "error",
        "no-empty": "off",
        "no-extra-bind": "warn",
        "no-extra-semi": "error",
        "no-loop-func": "warn",
        "no-multiple-empty-lines": "error",
        "no-multi-spaces": "error",
        "no-process-exit": "warn",
        "no-template-curly-in-string": "error",
        "no-trailing-spaces": "error",
        "no-undef": "error",
        "no-unsafe-negation": "error",
        "no-unused-vars": [
            "error", {
                "args": "none"
            }
        ],
        "no-use-before-define": "off",
        "object-curly-spacing": [
            "error", "always"
        ],
        "quotes": [
            "error", "single"
        ],
        "semi": "error",
        "space-before-blocks": "error",
        "space-before-function-paren": [
            "error",
            "never"
        ],
        "space-infix-ops": "error",
        "space-in-parens": "error",
        "valid-jsdoc": [
            "error", {
                "requireParamDescription": false,
                "requireReturnDescription": false
            }
        ]
    }
};
