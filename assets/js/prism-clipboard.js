/* eslint no-param-reassign: ["error", { "props": false }] */
const Clipboard = require('clipboard');
const Prism = require('prismjs');
require('prismjs/plugins/toolbar/prism-toolbar.js');
require('prismjs/components/prism-javascript.js');
require('prismjs/components/prism-bash.js');
require('prismjs/components/prism-css.js');
require('prismjs/components/prism-json.js');
require('prismjs/components/prism-nginx.js');
require('prismjs/components/prism-php.js');
require('prismjs/components/prism-twig.js');
require('prismjs/components/prism-yaml.js');

class DarkSideOfTheMoon {
    static register() {
        Prism.plugins.toolbar.registerButton('copy-to-clipboard', (env) => {
            const linkCopy = document.createElement('a');
            linkCopy.className = 'copy-code';
            linkCopy.setAttribute('aria-label', 'Copy Code');
            linkCopy.innerHTML = '<i class="icon-copy"></i>';

            DarkSideOfTheMoon.registerClipboard(env, linkCopy);

            return linkCopy;
        });
    }

    static registerClipboard(env, linkCopy) {
        const clip = new Clipboard(linkCopy, {
            text() {
                return env.code;
            },
        });

        clip.on('success', () => {
            linkCopy.setAttribute('aria-label', 'Copied!');
            resetText();
        });
        clip.on('error', () => {
            linkCopy.textContent = 'Press Ctrl+C to copy';
            resetText(linkCopy);
        });

        function resetText() {
            setTimeout(() => {
                linkCopy.setAttribute('aria-label', 'Copy Code');
            }, 5000);
        }
    }
}

DarkSideOfTheMoon.register();
