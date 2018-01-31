import '../scss/app.scss';

require('clipboard');
require('js-cookie');
require('smoothscroll');
const baguetteBox = require('baguettebox.js');

// Prism - code highlighting
require('prismjs');
require('prismjs/plugins/toolbar/prism-toolbar.js');
require('prismjs/components/prism-javascript.js');
require('prismjs/components/prism-bash.js');
require('prismjs/components/prism-css.js');
require('prismjs/components/prism-json.js');
require('prismjs/components/prism-nginx.js');
require('prismjs/components/prism-php.js');
require('prismjs/components/prism-twig.js');
require('prismjs/components/prism-yaml.js');
require('./prism-clipboard');

// Algolia Docsearch
require('./docsearch');
require('./navbar-hamburger');

(function() {
    // Jumpmenu for the versions.
    let el = document.querySelector('#version-changer select');
    el.addEventListener('change', (() => {
            window.location = document.querySelector('#version-changer select option:checked').value;
        })
    );

    // Remove 'version changer' from the hash.
    if (window.location.hash == '#version-changer') {
        window.location.hash = '';
    }

    // Enable "baguettebox" thingies.
    baguetteBox.run('#content');
}());