
(function() {
    if (typeof self === 'undefined' || !self.Prism || !self.document) {
        return;
    }

    if (!Prism.plugins.toolbar) {
        console.warn('Copy to Clipboard plugin loaded before Toolbar plugin.');
        return;
    }

    let Clipboard = window.Clipboard || undefined;

    if (Clipboard && /(native code)/.test(Clipboard.toString())) {
        Clipboard = undefined;
    }

    if (!Clipboard && typeof require === 'function') {
        Clipboard = require('clipboard');
    }

    const callbacks = [];

    if (!Clipboard) {
        const script = document.createElement('script');
        const head = document.querySelector('head');

        script.onload = function() {
            Clipboard = window.Clipboard;

            if (Clipboard) {
                while (callbacks.length) {
                    callbacks.pop()();
                }
            }
        };

        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.7.1/clipboard.min.js';
        head.appendChild(script);
    }

    Prism.plugins.toolbar.registerButton('copy-to-clipboard', (env) => {
        const linkCopy = document.createElement('a');
        linkCopy.className = 'copy-code';
        linkCopy.setAttribute('aria-label', 'Copy Code');
        linkCopy.innerHTML = '<i class="icon-copy"></i>';

        if (!Clipboard) {
            callbacks.push(registerClipboard);
        } else {
            registerClipboard();
        }

        return linkCopy;

        function registerClipboard() {
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

                resetText();
            });
        }

        function resetText() {
            setTimeout(() => {
                linkCopy.setAttribute('aria-label', 'Copy Code');
            }, 5000);
        }
    });
}());
