
jQuery(function($) { 

	SyntaxHighlighter.defaults['auto-links'] = false;
	SyntaxHighlighter.all();

    // Initialize the Fancybox shizzle, if present.
    if(jQuery().fancybox) {
        $('.fancybox, div.imageholder a').fancybox({ });
    }

});
