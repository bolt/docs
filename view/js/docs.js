
var q = "";

jQuery(function($) {

    hljs.initHighlightingOnLoad();

    // hiding the mobile navigation
    $('.main-nav').removeClass('expanded');

    // and toggling it again with a button
    $('.menu-toggle').click(function() {
        $('.main-nav').toggleClass('expanded');
        $(this).toggleClass('active');
    });

    $('main .content a.popup').magnificPopup({
        type: 'image'
        // other options
    });

    $('div.gallery-popup').magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery:{
        enabled:true
      }
    });

    $(window).scroll(function () {
        $('header').css('backgroundPosition', '0px ' + (posTop() / 2) + 'px');
    });

// // test: 33-basics
// var node = $tree.tree('getNodeById', '33-basics');
// console.log('selected', $tree.tree('selectNode', node));

//         $tree.tree('openNode', node);

    console.log('window.location.pathname', window.location.pathname);

    var pathname = window.location.pathname;

    var $tree = $('#tree1').tree({
        autoOpen: 1,
        saveState: 'boltmenu',
        onCreateLi: function(node, $li) {
            // console.log(node.childrenlinks);
            // Append a link to the jqtree-element div.
            // The link has an url '#node-[id]' and a data property 'node-id'.
            if (node.url == pathname) {
                $li.addClass('jqtree-selected');
            } else {
                $li.removeClass('jqtree-selected');
            }

            if (typeof node.childrenlinks != 'undefined' && node.childrenlinks.indexOf(pathname) >= 0) {
                console.log("jaaa", pathname, node.childrenlinks);
                $tree.tree('openNode', node);
                $li.addClass('jqtree-selected');
            }

            //$li.find('.jqtree-element').append(
            //    '&lt;a href="#node-'+ node.id +'" class="edit" data-node-id="'+
            //    node.id +'"&gt;edit&lt;/a&gt;'
            //);
        }
    });

    $('#tree1').bind(
        'tree.click',
        function(event) {
            // The clicked node is 'event.node'
            var node = event.node;
            var theURL = node.url;
            if (theURL) {
                location.href = theURL;
            }
            $tree.tree('toggle', node);
        }
    );

    $('#jqtree-collapse-all').click(function() {
        var tree = $tree.tree('getTree');

        tree.iterate(function(node, level) {
            if (node.hasChildren()) {
                // This will close the folder
                $tree.tree('closeNode', node);
                return false;
            }

            return true;
        });

    });

    $('#jqtree-expand-all').click(function() {
        var tree = $tree.tree('getTree');

        tree.iterate(function(node, level) {
            if (node.hasChildren()) {
                // This will open the folder
                $tree.tree('openNode', node);
                return false;
            }

            return true;
        });

    });






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

    // Jumpmenu for the versions
    $("#version-changer-submit").hide();
    $("#version-changer select").change(function() {
        window.location = $("#version-changer select option:selected").val();
    })


    //Zero Clipboard stuff..
    $('pre code').each(function(index) {
        // Get the text to be copied to the clipboard
        var text = $(this).text();

        // Create the copy button
        var copyBtn = $('<span class="copy-btn">[ Copy Code ]</span>')
            .attr('data-clipboard-text', text) // set the text to be copied
            .insertBefore(this); // insert copy button before <pre>
    });

    initClipBoard();

});

function initClipBoard() {

    var clipboard = new Clipboard('.copy-btn');

    clipboard.on('success', function(e) {
        $(e.trigger).text('[ Copied ]');
        window.setTimeout(function(){ $(e.trigger).text('[ Copy code ]'); }, 2000);
        e.clearSelection();
    });

}

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
