const docsearch = require('docsearch.js');

document.addEventListener('DOMContentLoaded', () => {
    const version = document.getElementById('algolia-search').getAttribute('data-version');

    docsearch({
        apiKey: '1b46aac18cdcead6090088f1994f7ea8',
        indexName: 'bolt',
        inputSelector: '#algolia-search',
        algoliaOptions: { facetFilters: [`version:${version}`] },
    });
});
