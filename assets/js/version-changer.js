document.addEventListener('DOMContentLoaded', () => {
    // Jump menu for the versions.
    const el = document.querySelector('#version-changer select');
    el.addEventListener('change', (() => {
        window.location = document.querySelector('#version-changer select option:checked').value;
    }));

    // Remove 'version changer' from the hash.
    if (window.location.hash === '#version-changer') {
        window.location.hash = '';
    }
});
