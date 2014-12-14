
var q = "";

jQuery(function($) { 

    hljs.initHighlightingOnLoad();
    
    // Initialize the Fancybox shizzle, if present.
    // if(jQuery().fancybox) {
    //     $('.fancybox, div.imageholder a').fancybox({ });
    // }
   
    // hiding the mobile navigation
    $('.main-nav').removeClass('expanded');
    
    // and toggling it again with a button
    $('.menu-toggle').click(function() {
        $('.main-nav').toggleClass('expanded');
        $(this).toggleClass('active');
    });

    if ($('a.popup').is('*')) {
        $('a.popup').magnificPopup({ 
        type: 'image'
            // other options
        });    
    }

    $(window).scroll(function () {
        $('header').css('backgroundPosition', '0px ' + (posTop() / 2) + 'px');
    });

    /* ----- no sticky header for the docs. ---------
    if($(window).width() > 801) { // ONLY LARGE-UP 
        
        $(window).scroll(function () { 
            var nav = $(".main-nav");
            var navwidth = nav.width();
            var halfwidth = Math.round(navwidth/2);
    
            // make main-nav sticky when scrolled lower then header height
            if (posTop() > ($('header').height()-44)){
                nav.addClass('is-sticky');
                nav.css({ 'margin-left':'-'+halfwidth+'px' });
            };
            // make main-nav UNsticky when scrolled up again
            if (posTop() <= ($('header').height()-44)){
                nav.removeClass('is-sticky');
                nav.css({'margin-left':'auto'})
            };
        });     
    }
    ------ */

    // Update the number of stars. Stolen from foundation.zurb.com. 
    $.ajax({
      dataType: 'jsonp',
      url: 'https://api.github.com/repos/bolt/bolt?callback=boltGithub&access_token=8e0dfc559d22265208b2924266c8b15b60fd9b85',
      success: function (response) {
        if (response && response.data.watchers) {
          var watchers = response.data.watchers;
          // var watchers = (Math.round((response.data.watchers / 100), 10) / 10).toFixed(1);
          $('#stargazers').html(watchers + ' Stars');
        }
      }
    });

    

    $("#searchbox").select2({
        placeholder: "Search …",
        minimumInputLength: 3,
        ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
            url: prefix + "/search.php",
            dataType: 'json',
            quietMillis: 250,
            data: function (term, page) {
                q = term;
                return {
                    q: term, // search term
                };
            },
            results: function (data, page) { 
                return { results: data.items };
            },
            cache: true
        }
    });    

    $('#searchbox').on("select2-selecting", function(e) { 
        window.location = prefix + "/" + e.val;
    });    

});


function formatForUrl(str) {
    return str.replace(/_/g, '-')
        .replace(/ /g, '-')
        .replace(/:/g, '-')
        .replace(/\\/g, '-')
        .replace(/\//g, '-')
        .replace(/[^a-zA-Z0-9\-]+/g, '')
        .replace(/-{2,}/g, '-')
        .toLowerCase();
};

function posTop() {
    return typeof window.pageYOffset != 'undefined' ? window.pageYOffset: document.documentElement.scrollTop? document.documentElement.scrollTop: document.body.scrollTop? document.body.scrollTop:0;
}    