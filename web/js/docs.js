/*!
 * clipboard.js v1.5.2
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Clipboard=t()}}(function(){var t,e,n;return function t(e,n,r){function o(a,c){if(!n[a]){if(!e[a]){var s="function"==typeof require&&require;if(!c&&s)return s(a,!0);if(i)return i(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[a]={exports:{}};e[a][0].call(l.exports,function(t){var n=e[a][1][t];return o(n?n:t)},l,l.exports,t,e,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(t,e,n){var r=t("matches-selector");e.exports=function(t,e,n){for(var o=n?t:t.parentNode;o&&o!==document;){if(r(o,e))return o;o=o.parentNode}}},{"matches-selector":2}],2:[function(t,e,n){function r(t,e){if(i)return i.call(t,e);for(var n=t.parentNode.querySelectorAll(e),r=0;r<n.length;++r)if(n[r]==t)return!0;return!1}var o=Element.prototype,i=o.matchesSelector||o.webkitMatchesSelector||o.mozMatchesSelector||o.msMatchesSelector||o.oMatchesSelector;e.exports=r},{}],3:[function(t,e,n){function r(t,e,n,r){var i=o.apply(this,arguments);return t.addEventListener(n,i),{destroy:function(){t.removeEventListener(n,i)}}}function o(t,e,n,r){return function(n){var o=i(n.target,e,!0);o&&(Object.defineProperty(n,"target",{value:o}),r.call(t,n))}}var i=t("closest");e.exports=r},{closest:1}],4:[function(t,e,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.function=function(t){var e=Object.prototype.toString.call(t);return"[object Function]"===e}},{}],5:[function(t,e,n){function r(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!c.string(e))throw new TypeError("Second argument must be a String");if(!c.function(n))throw new TypeError("Third argument must be a Function");if(c.node(t))return o(t,e,n);if(c.nodeList(t))return i(t,e,n);if(c.string(t))return a(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function o(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function i(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function a(t,e,n){return s(document.body,t,e,n)}var c=t("./is"),s=t("delegate");e.exports=r},{"./is":4,delegate:3}],6:[function(t,e,n){function r(t){var e;if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName)t.select(),e=t.value;else{var n=window.getSelection(),r=document.createRange();r.selectNodeContents(t),n.removeAllRanges(),n.addRange(r),e=n.toString()}return e}e.exports=r},{}],7:[function(t,e,n){function r(){}r.prototype={on:function(t,e,n){var r=this.e||(this.e={});return(r[t]||(r[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function r(){o.off(t,r),e.apply(n,arguments)}var o=this;return r._=e,this.on(t,r,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),r=0,o=n.length;for(r;o>r;r++)n[r].fn.apply(n[r].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),r=n[t],o=[];if(r&&e)for(var i=0,a=r.length;a>i;i++)r[i].fn!==e&&r[i].fn._!==e&&o.push(r[i]);return o.length?n[t]=o:delete n[t],this}},e.exports=r},{}],8:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.__esModule=!0;var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=t("select"),c=r(a),s=function(){function t(e){o(this,t),this.resolveOptions(e),this.initSelection()}return t.prototype.resolveOptions=function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action=e.action,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""},t.prototype.initSelection=function t(){if(this.text&&this.target)throw new Error('Multiple attributes declared, use either "target" or "text"');if(this.text)this.selectFake();else{if(!this.target)throw new Error('Missing required attributes, use either "target" or "text"');this.selectTarget()}},t.prototype.selectFake=function t(){var e=this;this.removeFake(),this.fakeHandler=document.body.addEventListener("click",function(){return e.removeFake()}),this.fakeElem=document.createElement("textarea"),this.fakeElem.style.position="absolute",this.fakeElem.style.left="-9999px",this.fakeElem.style.top=(window.pageYOffset||document.documentElement.scrollTop)+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,document.body.appendChild(this.fakeElem),this.selectedText=c.default(this.fakeElem),this.copyText()},t.prototype.removeFake=function t(){this.fakeHandler&&(document.body.removeEventListener("click"),this.fakeHandler=null),this.fakeElem&&(document.body.removeChild(this.fakeElem),this.fakeElem=null)},t.prototype.selectTarget=function t(){this.selectedText=c.default(this.target),this.copyText()},t.prototype.copyText=function t(){var e=void 0;try{e=document.execCommand(this.action)}catch(n){e=!1}this.handleResult(e)},t.prototype.handleResult=function t(e){e?this.emitter.emit("success",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)}):this.emitter.emit("error",{action:this.action,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})},t.prototype.clearSelection=function t(){this.target&&this.target.blur(),window.getSelection().removeAllRanges()},t.prototype.destroy=function t(){this.removeFake()},i(t,[{key:"action",set:function t(){var e=arguments.length<=0||void 0===arguments[0]?"copy":arguments[0];if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function t(){return this._action}},{key:"target",set:function t(e){if(void 0!==e){if(!e||"object"!=typeof e||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');this._target=e}},get:function t(){return this._target}}]),t}();n.default=s,e.exports=n.default},{select:6}],9:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}n.__esModule=!0;var c=t("./clipboard-action"),s=r(c),u=t("tiny-emitter"),l=r(u),f=t("good-listener"),d=r(f),h=function(t){function e(n,r){o(this,e),t.call(this),this.resolveOptions(r),this.listenClick(n)}return i(e,t),e.prototype.resolveOptions=function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText},e.prototype.listenClick=function t(e){var n=this;this.listener=d.default(e,"click",function(t){return n.onClick(t)})},e.prototype.onClick=function t(e){this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new s.default({action:this.action(e.target),target:this.target(e.target),text:this.text(e.target),trigger:e.target,emitter:this})},e.prototype.defaultAction=function t(e){return a("action",e)},e.prototype.defaultTarget=function t(e){var n=a("target",e);return n?document.querySelector(n):void 0},e.prototype.defaultText=function t(e){return a("text",e)},e.prototype.destroy=function t(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)},e}(l.default);n.default=h,e.exports=n.default},{"./clipboard-action":8,"good-listener":5,"tiny-emitter":7}]},{},[9])(9)});


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

    var pathname = window.location.pathname;

    var $tree = $('#tree1');
    $tree.tree({
        saveState: 'boltmenu',
        data: $tree.data('data'),
        onCreateLi: function(node, $li) {
            $li.toggleClass('jqtree-selected', node.url === pathname);

            if (pathname !== node.url && pathname.indexOf(node.url) === 0) {
                $tree.tree('openNode', node);
                $li.removeClass('jqtree-closed');
            }
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

    //put the quicklinks in a decent place 

    $('.quick-links').insertAfter('.content h1');

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
        console.log('jo');
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

// Apache, Bash, CSS, HTTP, Ini, JSON, Javascript, Makefile, Markdown, NGinx, PHP, SQL, Twig
!function(e){"undefined"!=typeof exports?e(exports):(window.hljs=e({}),"function"==typeof define&&define.amd&&define("hljs",[],function(){return window.hljs}))}(function(e){function n(e){return e.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function t(e){return e.nodeName.toLowerCase()}function r(e,n){var t=e&&e.exec(n);return t&&0==t.index}function a(e){return/^(no-?highlight|plain|text)$/i.test(e)}function i(e){var n,t,r,i=e.className+" ";if(i+=e.parentNode?e.parentNode.className:"",t=/\blang(?:uage)?-([\w-]+)\b/i.exec(i))return w(t[1])?t[1]:"no-highlight";for(i=i.split(/\s+/),n=0,r=i.length;r>n;n++)if(w(i[n])||a(i[n]))return i[n]}function o(e,n){var t,r={};for(t in e)r[t]=e[t];if(n)for(t in n)r[t]=n[t];return r}function u(e){var n=[];return function r(e,a){for(var i=e.firstChild;i;i=i.nextSibling)3==i.nodeType?a+=i.nodeValue.length:1==i.nodeType&&(n.push({event:"start",offset:a,node:i}),a=r(i,a),t(i).match(/br|hr|img|input/)||n.push({event:"stop",offset:a,node:i}));return a}(e,0),n}function c(e,r,a){function i(){return e.length&&r.length?e[0].offset!=r[0].offset?e[0].offset<r[0].offset?e:r:"start"==r[0].event?e:r:e.length?e:r}function o(e){function r(e){return" "+e.nodeName+'="'+n(e.value)+'"'}l+="<"+t(e)+Array.prototype.map.call(e.attributes,r).join("")+">"}function u(e){l+="</"+t(e)+">"}function c(e){("start"==e.event?o:u)(e.node)}for(var s=0,l="",f=[];e.length||r.length;){var g=i();if(l+=n(a.substr(s,g[0].offset-s)),s=g[0].offset,g==e){f.reverse().forEach(u);do c(g.splice(0,1)[0]),g=i();while(g==e&&g.length&&g[0].offset==s);f.reverse().forEach(o)}else"start"==g[0].event?f.push(g[0].node):f.pop(),c(g.splice(0,1)[0])}return l+n(a.substr(s))}function s(e){function n(e){return e&&e.source||e}function t(t,r){return new RegExp(n(t),"m"+(e.cI?"i":"")+(r?"g":""))}function r(a,i){if(!a.compiled){if(a.compiled=!0,a.k=a.k||a.bK,a.k){var u={},c=function(n,t){e.cI&&(t=t.toLowerCase()),t.split(" ").forEach(function(e){var t=e.split("|");u[t[0]]=[n,t[1]?Number(t[1]):1]})};"string"==typeof a.k?c("keyword",a.k):Object.keys(a.k).forEach(function(e){c(e,a.k[e])}),a.k=u}a.lR=t(a.l||/\b\w+\b/,!0),i&&(a.bK&&(a.b="\\b("+a.bK.split(" ").join("|")+")\\b"),a.b||(a.b=/\B|\b/),a.bR=t(a.b),a.e||a.eW||(a.e=/\B|\b/),a.e&&(a.eR=t(a.e)),a.tE=n(a.e)||"",a.eW&&i.tE&&(a.tE+=(a.e?"|":"")+i.tE)),a.i&&(a.iR=t(a.i)),void 0===a.r&&(a.r=1),a.c||(a.c=[]);var s=[];a.c.forEach(function(e){e.v?e.v.forEach(function(n){s.push(o(e,n))}):s.push("self"==e?a:e)}),a.c=s,a.c.forEach(function(e){r(e,a)}),a.starts&&r(a.starts,i);var l=a.c.map(function(e){return e.bK?"\\.?("+e.b+")\\.?":e.b}).concat([a.tE,a.i]).map(n).filter(Boolean);a.t=l.length?t(l.join("|"),!0):{exec:function(){return null}}}}r(e)}function l(e,t,a,i){function o(e,n){for(var t=0;t<n.c.length;t++)if(r(n.c[t].bR,e))return n.c[t]}function u(e,n){if(r(e.eR,n)){for(;e.endsParent&&e.parent;)e=e.parent;return e}return e.eW?u(e.parent,n):void 0}function c(e,n){return!a&&r(n.iR,e)}function g(e,n){var t=N.cI?n[0].toLowerCase():n[0];return e.k.hasOwnProperty(t)&&e.k[t]}function h(e,n,t,r){var a=r?"":E.classPrefix,i='<span class="'+a,o=t?"":"</span>";return i+=e+'">',i+n+o}function p(){if(!L.k)return n(M);var e="",t=0;L.lR.lastIndex=0;for(var r=L.lR.exec(M);r;){e+=n(M.substr(t,r.index-t));var a=g(L,r);a?(B+=a[1],e+=h(a[0],n(r[0]))):e+=n(r[0]),t=L.lR.lastIndex,r=L.lR.exec(M)}return e+n(M.substr(t))}function d(){var e="string"==typeof L.sL;if(e&&!x[L.sL])return n(M);var t=e?l(L.sL,M,!0,y[L.sL]):f(M,L.sL.length?L.sL:void 0);return L.r>0&&(B+=t.r),e&&(y[L.sL]=t.top),h(t.language,t.value,!1,!0)}function b(){return void 0!==L.sL?d():p()}function v(e,t){var r=e.cN?h(e.cN,"",!0):"";e.rB?(k+=r,M=""):e.eB?(k+=n(t)+r,M=""):(k+=r,M=t),L=Object.create(e,{parent:{value:L}})}function m(e,t){if(M+=e,void 0===t)return k+=b(),0;var r=o(t,L);if(r)return k+=b(),v(r,t),r.rB?0:t.length;var a=u(L,t);if(a){var i=L;i.rE||i.eE||(M+=t),k+=b();do L.cN&&(k+="</span>"),B+=L.r,L=L.parent;while(L!=a.parent);return i.eE&&(k+=n(t)),M="",a.starts&&v(a.starts,""),i.rE?0:t.length}if(c(t,L))throw new Error('Illegal lexeme "'+t+'" for mode "'+(L.cN||"<unnamed>")+'"');return M+=t,t.length||1}var N=w(e);if(!N)throw new Error('Unknown language: "'+e+'"');s(N);var R,L=i||N,y={},k="";for(R=L;R!=N;R=R.parent)R.cN&&(k=h(R.cN,"",!0)+k);var M="",B=0;try{for(var C,j,I=0;;){if(L.t.lastIndex=I,C=L.t.exec(t),!C)break;j=m(t.substr(I,C.index-I),C[0]),I=C.index+j}for(m(t.substr(I)),R=L;R.parent;R=R.parent)R.cN&&(k+="</span>");return{r:B,value:k,language:e,top:L}}catch(O){if(-1!=O.message.indexOf("Illegal"))return{r:0,value:n(t)};throw O}}function f(e,t){t=t||E.languages||Object.keys(x);var r={r:0,value:n(e)},a=r;return t.forEach(function(n){if(w(n)){var t=l(n,e,!1);t.language=n,t.r>a.r&&(a=t),t.r>r.r&&(a=r,r=t)}}),a.language&&(r.second_best=a),r}function g(e){return E.tabReplace&&(e=e.replace(/^((<[^>]+>|\t)+)/gm,function(e,n){return n.replace(/\t/g,E.tabReplace)})),E.useBR&&(e=e.replace(/\n/g,"<br>")),e}function h(e,n,t){var r=n?R[n]:t,a=[e.trim()];return e.match(/\bhljs\b/)||a.push("hljs"),-1===e.indexOf(r)&&a.push(r),a.join(" ").trim()}function p(e){var n=i(e);if(!a(n)){var t;E.useBR?(t=document.createElementNS("http://www.w3.org/1999/xhtml","div"),t.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n")):t=e;var r=t.textContent,o=n?l(n,r,!0):f(r),s=u(t);if(s.length){var p=document.createElementNS("http://www.w3.org/1999/xhtml","div");p.innerHTML=o.value,o.value=c(s,u(p),r)}o.value=g(o.value),e.innerHTML=o.value,e.className=h(e.className,n,o.language),e.result={language:o.language,re:o.r},o.second_best&&(e.second_best={language:o.second_best.language,re:o.second_best.r})}}function d(e){E=o(E,e)}function b(){if(!b.called){b.called=!0;var e=document.querySelectorAll("pre code");Array.prototype.forEach.call(e,p)}}function v(){addEventListener("DOMContentLoaded",b,!1),addEventListener("load",b,!1)}function m(n,t){var r=x[n]=t(e);r.aliases&&r.aliases.forEach(function(e){R[e]=n})}function N(){return Object.keys(x)}function w(e){return e=(e||"").toLowerCase(),x[e]||x[R[e]]}var E={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0},x={},R={};return e.highlight=l,e.highlightAuto=f,e.fixMarkup=g,e.highlightBlock=p,e.configure=d,e.initHighlighting=b,e.initHighlightingOnLoad=v,e.registerLanguage=m,e.listLanguages=N,e.getLanguage=w,e.inherit=o,e.IR="[a-zA-Z]\\w*",e.UIR="[a-zA-Z_]\\w*",e.NR="\\b\\d+(\\.\\d+)?",e.CNR="(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",e.BNR="\\b(0b[01]+)",e.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",e.BE={b:"\\\\[\\s\\S]",r:0},e.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[e.BE]},e.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[e.BE]},e.PWM={b:/\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/},e.C=function(n,t,r){var a=e.inherit({cN:"comment",b:n,e:t,c:[]},r||{});return a.c.push(e.PWM),a.c.push({cN:"doctag",b:"(?:TODO|FIXME|NOTE|BUG|XXX):",r:0}),a},e.CLCM=e.C("//","$"),e.CBCM=e.C("/\\*","\\*/"),e.HCM=e.C("#","$"),e.NM={cN:"number",b:e.NR,r:0},e.CNM={cN:"number",b:e.CNR,r:0},e.BNM={cN:"number",b:e.BNR,r:0},e.CSSNM={cN:"number",b:e.NR+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r:0},e.RM={cN:"regexp",b:/\//,e:/\/[gimuy]*/,i:/\n/,c:[e.BE,{b:/\[/,e:/\]/,r:0,c:[e.BE]}]},e.TM={cN:"title",b:e.IR,r:0},e.UTM={cN:"title",b:e.UIR,r:0},e});hljs.registerLanguage("nginx",function(e){var r={cN:"variable",v:[{b:/\$\d+/},{b:/\$\{/,e:/}/},{b:"[\\$\\@]"+e.UIR}]},b={eW:!0,l:"[a-z/_]+",k:{built_in:"on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"},r:0,i:"=>",c:[e.HCM,{cN:"string",c:[e.BE,r],v:[{b:/"/,e:/"/},{b:/'/,e:/'/}]},{cN:"url",b:"([a-z]+):/",e:"\\s",eW:!0,eE:!0,c:[r]},{cN:"regexp",c:[e.BE,r],v:[{b:"\\s\\^",e:"\\s|{|;",rE:!0},{b:"~\\*?\\s+",e:"\\s|{|;",rE:!0},{b:"\\*(\\.[a-z\\-]+)+"},{b:"([a-z\\-]+\\.)+\\*"}]},{cN:"number",b:"\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"},{cN:"number",b:"\\b\\d+[kKmMgGdshdwy]*\\b",r:0},r]};return{aliases:["nginxconf"],c:[e.HCM,{b:e.UIR+"\\s",e:";|{",rB:!0,c:[{cN:"title",b:e.UIR,starts:b}],r:0}],i:"[^\\s\\}]"}});hljs.registerLanguage("makefile",function(e){var a={cN:"variable",b:/\$\(/,e:/\)/,c:[e.BE]};return{aliases:["mk","mak"],c:[e.HCM,{b:/^\w+\s*\W*=/,rB:!0,r:0,starts:{cN:"constant",e:/\s*\W*=/,eE:!0,starts:{e:/$/,r:0,c:[a]}}},{cN:"title",b:/^[\w]+:\s*$/},{cN:"phony",b:/^\.PHONY:/,e:/$/,k:".PHONY",l:/[\.\w]+/},{b:/^\t+/,e:/$/,r:0,c:[e.QSM,a]}]}});hljs.registerLanguage("http",function(t){return{aliases:["https"],i:"\\S",c:[{cN:"status",b:"^HTTP/[0-9\\.]+",e:"$",c:[{cN:"number",b:"\\b\\d{3}\\b"}]},{cN:"request",b:"^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",rB:!0,e:"$",c:[{cN:"string",b:" ",e:" ",eB:!0,eE:!0}]},{cN:"attribute",b:"^\\w",e:": ",eE:!0,i:"\\n|\\s|=",starts:{cN:"string",e:"$"}},{b:"\\n\\n",starts:{sL:[],eW:!0}}]}});hljs.registerLanguage("json",function(e){var t={literal:"true false null"},i=[e.QSM,e.CNM],l={cN:"value",e:",",eW:!0,eE:!0,c:i,k:t},c={b:"{",e:"}",c:[{cN:"attribute",b:'\\s*"',e:'"\\s*:\\s*',eB:!0,eE:!0,c:[e.BE],i:"\\n",starts:l}],i:"\\S"},n={b:"\\[",e:"\\]",c:[e.inherit(l,{cN:null})],i:"\\S"};return i.splice(i.length,0,c,n),{c:i,k:t,i:"\\S"}});hljs.registerLanguage("css",function(e){var c="[a-zA-Z-][a-zA-Z0-9_-]*",a={cN:"function",b:c+"\\(",rB:!0,eE:!0,e:"\\("},r={cN:"rule",b:/[A-Z\_\.\-]+\s*:/,rB:!0,e:";",eW:!0,c:[{cN:"attribute",b:/\S/,e:":",eE:!0,starts:{cN:"value",eW:!0,eE:!0,c:[a,e.CSSNM,e.QSM,e.ASM,e.CBCM,{cN:"hexcolor",b:"#[0-9A-Fa-f]+"},{cN:"important",b:"!important"}]}}]};return{cI:!0,i:/[=\/|'\$]/,c:[e.CBCM,{cN:"id",b:/\#[A-Za-z0-9_-]+/},{cN:"class",b:/\.[A-Za-z0-9_-]+/},{cN:"attr_selector",b:/\[/,e:/\]/,i:"$"},{cN:"pseudo",b:/:(:)?[a-zA-Z0-9\_\-\+\(\)"']+/},{cN:"at_rule",b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{cN:"at_rule",b:"@",e:"[{;]",c:[{cN:"keyword",b:/\S+/},{b:/\s/,eW:!0,eE:!0,r:0,c:[a,e.ASM,e.QSM,e.CSSNM]}]},{cN:"tag",b:c,r:0},{cN:"rules",b:"{",e:"}",i:/\S/,c:[e.CBCM,r]}]}});hljs.registerLanguage("bash",function(e){var t={cN:"variable",v:[{b:/\$[\w\d#@][\w\d_]*/},{b:/\$\{(.*?)}/}]},s={cN:"string",b:/"/,e:/"/,c:[e.BE,t,{cN:"variable",b:/\$\(/,e:/\)/,c:[e.BE]}]},a={cN:"string",b:/'/,e:/'/};return{aliases:["sh","zsh"],l:/-?[a-z\.]+/,k:{keyword:"if then else elif fi for while in do done case esac function",literal:"true false",built_in:"break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",operator:"-ne -eq -lt -gt -f -d -e -s -l -a"},c:[{cN:"shebang",b:/^#![^\n]+sh\s*$/,r:10},{cN:"function",b:/\w[\w\d_]*\s*\(\s*\)\s*\{/,rB:!0,c:[e.inherit(e.TM,{b:/\w[\w\d_]*/})],r:0},e.HCM,e.NM,s,a,t]}});hljs.registerLanguage("xml",function(t){var s="[A-Za-z0-9\\._:-]+",c={b:/<\?(php)?(?!\w)/,e:/\?>/,sL:"php"},e={eW:!0,i:/</,r:0,c:[c,{cN:"attribute",b:s,r:0},{b:"=",r:0,c:[{cN:"value",c:[c],v:[{b:/"/,e:/"/},{b:/'/,e:/'/},{b:/[^\s\/>]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xsl","plist"],cI:!0,c:[{cN:"doctype",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},t.C("<!--","-->",{r:10}),{cN:"cdata",b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{title:"style"},c:[e],starts:{e:"</style>",rE:!0,sL:"css"}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{title:"script"},c:[e],starts:{e:"</script>",rE:!0,sL:["actionscript","javascript","handlebars"]}},c,{cN:"pi",b:/<\?\w+/,e:/\?>/,r:10},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"title",b:/[^ \/><\n\t]+/,r:0},e]}]}});hljs.registerLanguage("markdown",function(e){return{aliases:["md","mkdown","mkd"],c:[{cN:"header",v:[{b:"^#{1,6}",e:"$"},{b:"^.+?\\n[=-]{2,}$"}]},{b:"<",e:">",sL:"xml",r:0},{cN:"bullet",b:"^([*+-]|(\\d+\\.))\\s+"},{cN:"strong",b:"[*_]{2}.+?[*_]{2}"},{cN:"emphasis",v:[{b:"\\*.+?\\*"},{b:"_.+?_",r:0}]},{cN:"blockquote",b:"^>\\s+",e:"$"},{cN:"code",v:[{b:"`.+?`"},{b:"^( {4}|   )",e:"$",r:0}]},{cN:"horizontal_rule",b:"^[-\\*]{3,}",e:"$"},{b:"\\[.+?\\][\\(\\[].*?[\\)\\]]",rB:!0,c:[{cN:"link_label",b:"\\[",e:"\\]",eB:!0,rE:!0,r:0},{cN:"link_url",b:"\\]\\(",e:"\\)",eB:!0,eE:!0},{cN:"link_reference",b:"\\]\\[",e:"\\]",eB:!0,eE:!0}],r:10},{b:"^\\[.+\\]:",rB:!0,c:[{cN:"link_reference",b:"\\[",e:"\\]:",eB:!0,eE:!0,starts:{cN:"link_url",e:"$"}}]}]}});hljs.registerLanguage("php",function(e){var c={cN:"variable",b:"\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"},a={cN:"preprocessor",b:/<\?(php)?|\?>/},i={cN:"string",c:[e.BE,a],v:[{b:'b"',e:'"'},{b:"b'",e:"'"},e.inherit(e.ASM,{i:null}),e.inherit(e.QSM,{i:null})]},t={v:[e.BNM,e.CNM]};return{aliases:["php3","php4","php5","php6"],cI:!0,k:"and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",c:[e.CLCM,e.HCM,e.C("/\\*","\\*/",{c:[{cN:"doctag",b:"@[A-Za-z]+"},a]}),e.C("__halt_compiler.+?;",!1,{eW:!0,k:"__halt_compiler",l:e.UIR}),{cN:"string",b:/<<<['"]?\w+['"]?$/,e:/^\w+;?$/,c:[e.BE,{cN:"subst",v:[{b:/\$\w+/},{b:/\{\$/,e:/\}/}]}]},a,c,{b:/(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/},{cN:"function",bK:"function",e:/[;{]/,eE:!0,i:"\\$|\\[|%",c:[e.UTM,{cN:"params",b:"\\(",e:"\\)",c:["self",c,e.CBCM,i,t]}]},{cN:"class",bK:"class interface",e:"{",eE:!0,i:/[:\(\$"]/,c:[{bK:"extends implements"},e.UTM]},{bK:"namespace",e:";",i:/[\.']/,c:[e.UTM]},{bK:"use",e:";",c:[e.UTM]},{b:"=>"},i,t]}});hljs.registerLanguage("javascript",function(e){return{aliases:["js"],k:{keyword:"in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"},c:[{cN:"pi",r:10,b:/^\s*['"]use (strict|asm)['"]/},e.ASM,e.QSM,{cN:"string",b:"`",e:"`",c:[e.BE,{cN:"subst",b:"\\$\\{",e:"\\}"}]},e.CLCM,e.CBCM,{cN:"number",v:[{b:"\\b(0[bB][01]+)"},{b:"\\b(0[oO][0-7]+)"},{b:e.CNR}],r:0},{b:"("+e.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[e.CLCM,e.CBCM,e.RM,{b:/</,e:/>\s*[);\]]/,r:0,sL:"xml"}],r:0},{cN:"function",bK:"function",e:/\{/,eE:!0,c:[e.inherit(e.TM,{b:/[A-Za-z$_][0-9A-Za-z$_]*/}),{cN:"params",b:/\(/,e:/\)/,eB:!0,eE:!0,c:[e.CLCM,e.CBCM]}],i:/\[|%/},{b:/\$[(.]/},{b:"\\."+e.IR,r:0},{bK:"import",e:"[;$]",k:"import from as",c:[e.ASM,e.QSM]},{cN:"class",bK:"class",e:/[{;=]/,eE:!0,i:/[:"\[\]]/,c:[{bK:"extends"},e.UTM]}],i:/#/}});hljs.registerLanguage("ini",function(e){var c={cN:"string",c:[e.BE],v:[{b:"'''",e:"'''",r:10},{b:'"""',e:'"""',r:10},{b:'"',e:'"'},{b:"'",e:"'"}]};return{aliases:["toml"],cI:!0,i:/\S/,c:[e.C(";","$"),e.HCM,{cN:"title",b:/^\s*\[+/,e:/\]+/},{cN:"setting",b:/^[a-z0-9\[\]_-]+\s*=\s*/,e:"$",c:[{cN:"value",eW:!0,k:"on off true false yes no",c:[{cN:"variable",v:[{b:/\$[\w\d"][\w\d_]*/},{b:/\$\{(.*?)}/}]},c,{cN:"number",b:/([\+\-]+)?[\d]+_[\d_]+/},e.NM],r:0}]}]}});hljs.registerLanguage("apache",function(e){var r={cN:"number",b:"[\\$%]\\d+"};return{aliases:["apacheconf"],cI:!0,c:[e.HCM,{cN:"tag",b:"</?",e:">"},{cN:"keyword",b:/\w+/,r:0,k:{common:"order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"},starts:{e:/$/,r:0,k:{literal:"on off all"},c:[{cN:"sqbracket",b:"\\s\\[",e:"\\]$"},{cN:"cbracket",b:"[\\$%]\\{",e:"\\}",c:["self",r]},r,e.QSM]}}],i:/\S/}});hljs.registerLanguage("sql",function(e){var t=e.C("--","$");return{cI:!0,i:/[<>{}*]/,c:[{cN:"operator",bK:"begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke",e:/;/,eW:!0,k:{keyword:"abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias allocate allow alter always analyze ancillary and any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound buffer_cache buffer_pool build bulk by byte byteordermark bytes c cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle d data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration e each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain export export_set extended extent external external_1 external_2 externally extract f failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function g general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour http i id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists k keep keep_duplicates key keys kill l language large last last_day last_insert_id last_value lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim m main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex n name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding p package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second section securefile security seed segment select self sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime t table tables tablespace tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",literal:"true false null",built_in:"array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"},c:[{cN:"string",b:"'",e:"'",c:[e.BE,{b:"''"}]},{cN:"string",b:'"',e:'"',c:[e.BE,{b:'""'}]},{cN:"string",b:"`",e:"`",c:[e.BE]},e.CNM,e.CBCM,t]},e.CBCM,t]}});hljs.registerLanguage("twig",function(e){var t={cN:"params",b:"\\(",e:"\\)"},a="attribute block constant cycle date dump include max min parent random range source template_from_string",r={cN:"function",bK:a,r:0,c:[t]},c={cN:"filter",b:/\|[A-Za-z_]+:?/,k:"abs batch capitalize convert_encoding date date_modify default escape first format join json_encode keys last length lower merge nl2br number_format raw replace reverse round slice sort split striptags title trim upper url_encode",c:[r]},n="autoescape block do embed extends filter flush for if import include macro sandbox set spaceless use verbatim";return n=n+" "+n.split(" ").map(function(e){return"end"+e}).join(" "),{aliases:["craftcms"],cI:!0,sL:"xml",c:[e.C(/\{#/,/#}/),{cN:"template_tag",b:/\{%/,e:/%}/,k:n,c:[c,r]},{cN:"variable",b:/\{\{/,e:/}}/,c:[c,r]}]}});
/*! Magnific Popup - v1.0.0 - 2015-09-17
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2015 Dmitry Semenov; */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(a){var b,c,d,e,f,g,h="Close",i="BeforeClose",j="AfterClose",k="BeforeAppend",l="MarkupParse",m="Open",n="Change",o="mfp",p="."+o,q="mfp-ready",r="mfp-removing",s="mfp-prevent-close",t=function(){},u=!!window.jQuery,v=a(window),w=function(a,c){b.ev.on(o+a+p,c)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(c,d){b.ev.triggerHandler(o+c,d),b.st.callbacks&&(c=c.charAt(0).toLowerCase()+c.slice(1),b.st.callbacks[c]&&b.st.callbacks[c].apply(b,a.isArray(d)?d:[d]))},z=function(c){return c===g&&b.currTemplate.closeBtn||(b.currTemplate.closeBtn=a(b.st.closeMarkup.replace("%title%",b.st.tClose)),g=c),b.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(b=new t,b.init(),a.magnificPopup.instance=b)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(void 0!==a.transition)return!0;for(;b.length;)if(b.pop()+"Transition"in a)return!0;return!1};t.prototype={constructor:t,init:function(){var c=navigator.appVersion;b.isIE7=-1!==c.indexOf("MSIE 7."),b.isIE8=-1!==c.indexOf("MSIE 8."),b.isLowIE=b.isIE7||b.isIE8,b.isAndroid=/android/gi.test(c),b.isIOS=/iphone|ipad|ipod/gi.test(c),b.supportsTransition=B(),b.probablyMobile=b.isAndroid||b.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),d=a(document),b.popupsCache={}},open:function(c){var e;if(c.isObj===!1){b.items=c.items.toArray(),b.index=0;var g,h=c.items;for(e=0;e<h.length;e++)if(g=h[e],g.parsed&&(g=g.el[0]),g===c.el[0]){b.index=e;break}}else b.items=a.isArray(c.items)?c.items:[c.items],b.index=c.index||0;if(b.isOpen)return void b.updateItemHTML();b.types=[],f="",c.mainEl&&c.mainEl.length?b.ev=c.mainEl.eq(0):b.ev=d,c.key?(b.popupsCache[c.key]||(b.popupsCache[c.key]={}),b.currTemplate=b.popupsCache[c.key]):b.currTemplate={},b.st=a.extend(!0,{},a.magnificPopup.defaults,c),b.fixedContentPos="auto"===b.st.fixedContentPos?!b.probablyMobile:b.st.fixedContentPos,b.st.modal&&(b.st.closeOnContentClick=!1,b.st.closeOnBgClick=!1,b.st.showCloseBtn=!1,b.st.enableEscapeKey=!1),b.bgOverlay||(b.bgOverlay=x("bg").on("click"+p,function(){b.close()}),b.wrap=x("wrap").attr("tabindex",-1).on("click"+p,function(a){b._checkIfClose(a.target)&&b.close()}),b.container=x("container",b.wrap)),b.contentContainer=x("content"),b.st.preloader&&(b.preloader=x("preloader",b.container,b.st.tLoading));var i=a.magnificPopup.modules;for(e=0;e<i.length;e++){var j=i[e];j=j.charAt(0).toUpperCase()+j.slice(1),b["init"+j].call(b)}y("BeforeOpen"),b.st.showCloseBtn&&(b.st.closeBtnInside?(w(l,function(a,b,c,d){c.close_replaceWith=z(d.type)}),f+=" mfp-close-btn-in"):b.wrap.append(z())),b.st.alignTop&&(f+=" mfp-align-top"),b.fixedContentPos?b.wrap.css({overflow:b.st.overflowY,overflowX:"hidden",overflowY:b.st.overflowY}):b.wrap.css({top:v.scrollTop(),position:"absolute"}),(b.st.fixedBgPos===!1||"auto"===b.st.fixedBgPos&&!b.fixedContentPos)&&b.bgOverlay.css({height:d.height(),position:"absolute"}),b.st.enableEscapeKey&&d.on("keyup"+p,function(a){27===a.keyCode&&b.close()}),v.on("resize"+p,function(){b.updateSize()}),b.st.closeOnContentClick||(f+=" mfp-auto-cursor"),f&&b.wrap.addClass(f);var k=b.wH=v.height(),n={};if(b.fixedContentPos&&b._hasScrollBar(k)){var o=b._getScrollbarSize();o&&(n.marginRight=o)}b.fixedContentPos&&(b.isIE7?a("body, html").css("overflow","hidden"):n.overflow="hidden");var r=b.st.mainClass;return b.isIE7&&(r+=" mfp-ie7"),r&&b._addClassToMFP(r),b.updateItemHTML(),y("BuildControls"),a("html").css(n),b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo||a(document.body)),b._lastFocusedEl=document.activeElement,setTimeout(function(){b.content?(b._addClassToMFP(q),b._setFocus()):b.bgOverlay.addClass(q),d.on("focusin"+p,b._onFocusIn)},16),b.isOpen=!0,b.updateSize(k),y(m),c},close:function(){b.isOpen&&(y(i),b.isOpen=!1,b.st.removalDelay&&!b.isLowIE&&b.supportsTransition?(b._addClassToMFP(r),setTimeout(function(){b._close()},b.st.removalDelay)):b._close())},_close:function(){y(h);var c=r+" "+q+" ";if(b.bgOverlay.detach(),b.wrap.detach(),b.container.empty(),b.st.mainClass&&(c+=b.st.mainClass+" "),b._removeClassFromMFP(c),b.fixedContentPos){var e={marginRight:""};b.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}d.off("keyup"+p+" focusin"+p),b.ev.off(p),b.wrap.attr("class","mfp-wrap").removeAttr("style"),b.bgOverlay.attr("class","mfp-bg"),b.container.attr("class","mfp-container"),!b.st.showCloseBtn||b.st.closeBtnInside&&b.currTemplate[b.currItem.type]!==!0||b.currTemplate.closeBtn&&b.currTemplate.closeBtn.detach(),b._lastFocusedEl&&a(b._lastFocusedEl).focus(),b.currItem=null,b.content=null,b.currTemplate=null,b.prevHeight=0,y(j)},updateSize:function(a){if(b.isIOS){var c=document.documentElement.clientWidth/window.innerWidth,d=window.innerHeight*c;b.wrap.css("height",d),b.wH=d}else b.wH=a||v.height();b.fixedContentPos||b.wrap.css("height",b.wH),y("Resize")},updateItemHTML:function(){var c=b.items[b.index];b.contentContainer.detach(),b.content&&b.content.detach(),c.parsed||(c=b.parseEl(b.index));var d=c.type;if(y("BeforeChange",[b.currItem?b.currItem.type:"",d]),b.currItem=c,!b.currTemplate[d]){var f=b.st[d]?b.st[d].markup:!1;y("FirstMarkupParse",f),f?b.currTemplate[d]=a(f):b.currTemplate[d]=!0}e&&e!==c.type&&b.container.removeClass("mfp-"+e+"-holder");var g=b["get"+d.charAt(0).toUpperCase()+d.slice(1)](c,b.currTemplate[d]);b.appendContent(g,d),c.preloaded=!0,y(n,c),e=c.type,b.container.prepend(b.contentContainer),y("AfterChange")},appendContent:function(a,c){b.content=a,a?b.st.showCloseBtn&&b.st.closeBtnInside&&b.currTemplate[c]===!0?b.content.find(".mfp-close").length||b.content.append(z()):b.content=a:b.content="",y(k),b.container.addClass("mfp-"+c+"-holder"),b.contentContainer.append(b.content)},parseEl:function(c){var d,e=b.items[c];if(e.tagName?e={el:a(e)}:(d=e.type,e={data:e,src:e.src}),e.el){for(var f=b.types,g=0;g<f.length;g++)if(e.el.hasClass("mfp-"+f[g])){d=f[g];break}e.src=e.el.attr("data-mfp-src"),e.src||(e.src=e.el.attr("href"))}return e.type=d||b.st.type||"inline",e.index=c,e.parsed=!0,b.items[c]=e,y("ElementParse",e),b.items[c]},addGroup:function(a,c){var d=function(d){d.mfpEl=this,b._openClick(d,a,c)};c||(c={});var e="click.magnificPopup";c.mainEl=a,c.items?(c.isObj=!0,a.off(e).on(e,d)):(c.isObj=!1,c.delegate?a.off(e).on(e,c.delegate,d):(c.items=a,a.off(e).on(e,d)))},_openClick:function(c,d,e){var f=void 0!==e.midClick?e.midClick:a.magnificPopup.defaults.midClick;if(f||!(2===c.which||c.ctrlKey||c.metaKey||c.altKey||c.shiftKey)){var g=void 0!==e.disableOn?e.disableOn:a.magnificPopup.defaults.disableOn;if(g)if(a.isFunction(g)){if(!g.call(b))return!0}else if(v.width()<g)return!0;c.type&&(c.preventDefault(),b.isOpen&&c.stopPropagation()),e.el=a(c.mfpEl),e.delegate&&(e.items=d.find(e.delegate)),b.open(e)}},updateStatus:function(a,d){if(b.preloader){c!==a&&b.container.removeClass("mfp-s-"+c),d||"loading"!==a||(d=b.st.tLoading);var e={status:a,text:d};y("UpdateStatus",e),a=e.status,d=e.text,b.preloader.html(d),b.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),b.container.addClass("mfp-s-"+a),c=a}},_checkIfClose:function(c){if(!a(c).hasClass(s)){var d=b.st.closeOnContentClick,e=b.st.closeOnBgClick;if(d&&e)return!0;if(!b.content||a(c).hasClass("mfp-close")||b.preloader&&c===b.preloader[0])return!0;if(c===b.content[0]||a.contains(b.content[0],c)){if(d)return!0}else if(e&&a.contains(document,c))return!0;return!1}},_addClassToMFP:function(a){b.bgOverlay.addClass(a),b.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),b.wrap.removeClass(a)},_hasScrollBar:function(a){return(b.isIE7?d.height():document.body.scrollHeight)>(a||v.height())},_setFocus:function(){(b.st.focus?b.content.find(b.st.focus).eq(0):b.wrap).focus()},_onFocusIn:function(c){return c.target===b.wrap[0]||a.contains(b.wrap[0],c.target)?void 0:(b._setFocus(),!1)},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(l,[b,c,d]),a.each(c,function(a,c){if(void 0===c||c===!1)return!0;if(e=a.split("_"),e.length>1){var d=b.find(p+"-"+e[0]);if(d.length>0){var f=e[1];"replaceWith"===f?d[0]!==c[0]&&d.replaceWith(c):"img"===f?d.is("img")?d.attr("src",c):d.replaceWith('<img src="'+c+'" class="'+d.attr("class")+'" />'):d.attr(e[1],c)}}else b.find(p+"-"+a).html(c)})},_getScrollbarSize:function(){if(void 0===b.scrollbarSize){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),b.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return b.scrollbarSize}},a.magnificPopup={instance:null,proto:t.prototype,modules:[],open:function(b,c){return A(),b=b?a.extend(!0,{},b):{},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},a.fn.magnificPopup=function(c){A();var d=a(this);if("string"==typeof c)if("open"===c){var e,f=u?d.data("magnificPopup"):d[0].magnificPopup,g=parseInt(arguments[1],10)||0;f.items?e=f.items[g]:(e=d,f.delegate&&(e=e.find(f.delegate)),e=e.eq(g)),b._openClick({mfpEl:e},d,f)}else b.isOpen&&b[c].apply(b,Array.prototype.slice.call(arguments,1));else c=a.extend(!0,{},c),u?d.data("magnificPopup",c):d[0].magnificPopup=c,b.addGroup(d,c);return d};var C,D,E,F="inline",G=function(){E&&(D.after(E.addClass(C)).detach(),E=null)};a.magnificPopup.registerModule(F,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){b.types.push(F),w(h+"."+F,function(){G()})},getInline:function(c,d){if(G(),c.src){var e=b.st.inline,f=a(c.src);if(f.length){var g=f[0].parentNode;g&&g.tagName&&(D||(C=e.hiddenClass,D=x(C),C="mfp-"+C),E=f.after(D).detach().removeClass(C)),b.updateStatus("ready")}else b.updateStatus("error",e.tNotFound),f=a("<div>");return c.inlineElement=f,f}return b.updateStatus("ready"),b._parseMarkup(d,{},c),d}}});var H,I="ajax",J=function(){H&&a(document.body).removeClass(H)},K=function(){J(),b.req&&b.req.abort()};a.magnificPopup.registerModule(I,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){b.types.push(I),H=b.st.ajax.cursor,w(h+"."+I,K),w("BeforeChange."+I,K)},getAjax:function(c){H&&a(document.body).addClass(H),b.updateStatus("loading");var d=a.extend({url:c.src,success:function(d,e,f){var g={data:d,xhr:f};y("ParseAjax",g),b.appendContent(a(g.data),I),c.finished=!0,J(),b._setFocus(),setTimeout(function(){b.wrap.addClass(q)},16),b.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),c.finished=c.loadError=!0,b.updateStatus("error",b.st.ajax.tError.replace("%url%",c.src))}},b.st.ajax.settings);return b.req=a.ajax(d),""}}});var L,M=function(c){if(c.data&&void 0!==c.data.title)return c.data.title;var d=b.st.image.titleSrc;if(d){if(a.isFunction(d))return d.call(b,c);if(c.el)return c.el.attr(d)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=b.st.image,d=".image";b.types.push("image"),w(m+d,function(){"image"===b.currItem.type&&c.cursor&&a(document.body).addClass(c.cursor)}),w(h+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),v.off("resize"+p)}),w("Resize"+d,b.resizeImage),b.isLowIE&&w("AfterChange",b.resizeImage)},resizeImage:function(){var a=b.currItem;if(a&&a.img&&b.st.image.verticalFit){var c=0;b.isLowIE&&(c=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",b.wH-c)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(b.content&&b.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var c=0,d=a.img[0],e=function(f){L&&clearInterval(L),L=setInterval(function(){return d.naturalWidth>0?void b._onImageHasSize(a):(c>200&&clearInterval(L),c++,void(3===c?e(10):40===c?e(50):100===c&&e(500)))},f)};e(1)},getImage:function(c,d){var e=0,f=function(){c&&(c.img[0].complete?(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("ready")),c.hasSize=!0,c.loaded=!0,y("ImageLoadComplete")):(e++,200>e?setTimeout(f,100):g()))},g=function(){c&&(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("error",h.tError.replace("%url%",c.src))),c.hasSize=!0,c.loaded=!0,c.loadError=!0)},h=b.st.image,i=d.find(".mfp-img");if(i.length){var j=document.createElement("img");j.className="mfp-img",c.el&&c.el.find("img").length&&(j.alt=c.el.find("img").attr("alt")),c.img=a(j).on("load.mfploader",f).on("error.mfploader",g),j.src=c.src,i.is("img")&&(c.img=c.img.clone()),j=c.img[0],j.naturalWidth>0?c.hasSize=!0:j.width||(c.hasSize=!1)}return b._parseMarkup(d,{title:M(c),img_replaceWith:c.img},c),b.resizeImage(),c.hasSize?(L&&clearInterval(L),c.loadError?(d.addClass("mfp-loading"),b.updateStatus("error",h.tError.replace("%url%",c.src))):(d.removeClass("mfp-loading"),b.updateStatus("ready")),d):(b.updateStatus("loading"),c.loading=!0,c.hasSize||(c.imgHidden=!0,d.addClass("mfp-loading"),b.findImageSize(c)),d)}}});var N,O=function(){return void 0===N&&(N=void 0!==document.createElement("p").style.MozTransform),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a,c=b.st.zoom,d=".zoom";if(c.enabled&&b.supportsTransition){var e,f,g=c.duration,j=function(a){var b=a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+c.duration/1e3+"s "+c.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,b.css(e),b},k=function(){b.content.css("visibility","visible")};w("BuildControls"+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.content.css("visibility","hidden"),a=b._getItemToZoom(),!a)return void k();f=j(a),f.css(b._getOffset()),b.wrap.append(f),e=setTimeout(function(){f.css(b._getOffset(!0)),e=setTimeout(function(){k(),setTimeout(function(){f.remove(),a=f=null,y("ZoomAnimationEnded")},16)},g)},16)}}),w(i+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.st.removalDelay=g,!a){if(a=b._getItemToZoom(),!a)return;f=j(a)}f.css(b._getOffset(!0)),b.wrap.append(f),b.content.css("visibility","hidden"),setTimeout(function(){f.css(b._getOffset())},16)}}),w(h+d,function(){b._allowZoom()&&(k(),f&&f.remove(),a=null)})}},_allowZoom:function(){return"image"===b.currItem.type},_getItemToZoom:function(){return b.currItem.hasSize?b.currItem.img:!1},_getOffset:function(c){var d;d=c?b.currItem.img:b.st.zoom.opener(b.currItem.el||b.currItem);var e=d.offset(),f=parseInt(d.css("padding-top"),10),g=parseInt(d.css("padding-bottom"),10);e.top-=a(window).scrollTop()-f;var h={width:d.width(),height:(u?d.innerHeight():d[0].offsetHeight)-g-f};return O()?h["-moz-transform"]=h.transform="translate("+e.left+"px,"+e.top+"px)":(h.left=e.left,h.top=e.top),h}}});var P="iframe",Q="//about:blank",R=function(a){if(b.currTemplate[P]){var c=b.currTemplate[P].find("iframe");c.length&&(a||(c[0].src=Q),b.isIE8&&c.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){b.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(h+"."+P,function(){R()})},getIframe:function(c,d){var e=c.src,f=b.st.iframe;a.each(f.patterns,function(){return e.indexOf(this.index)>-1?(this.id&&(e="string"==typeof this.id?e.substr(e.lastIndexOf(this.id)+this.id.length,e.length):this.id.call(this,e)),e=this.src.replace("%id%",e),!1):void 0});var g={};return f.srcAction&&(g[f.srcAction]=e),b._parseMarkup(d,g,c),b.updateStatus("ready"),d}}});var S=function(a){var c=b.items.length;return a>c-1?a-c:0>a?c+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=b.st.gallery,e=".mfp-gallery",g=Boolean(a.fn.mfpFastClick);return b.direction=!0,c&&c.enabled?(f+=" mfp-gallery",w(m+e,function(){c.navigateByImgClick&&b.wrap.on("click"+e,".mfp-img",function(){return b.items.length>1?(b.next(),!1):void 0}),d.on("keydown"+e,function(a){37===a.keyCode?b.prev():39===a.keyCode&&b.next()})}),w("UpdateStatus"+e,function(a,c){c.text&&(c.text=T(c.text,b.currItem.index,b.items.length))}),w(l+e,function(a,d,e,f){var g=b.items.length;e.counter=g>1?T(c.tCounter,f.index,g):""}),w("BuildControls"+e,function(){if(b.items.length>1&&c.arrows&&!b.arrowLeft){var d=c.arrowMarkup,e=b.arrowLeft=a(d.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(s),f=b.arrowRight=a(d.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(s),h=g?"mfpFastClick":"click";e[h](function(){b.prev()}),f[h](function(){b.next()}),b.isIE7&&(x("b",e[0],!1,!0),x("a",e[0],!1,!0),x("b",f[0],!1,!0),x("a",f[0],!1,!0)),b.container.append(e.add(f))}}),w(n+e,function(){b._preloadTimeout&&clearTimeout(b._preloadTimeout),b._preloadTimeout=setTimeout(function(){b.preloadNearbyImages(),b._preloadTimeout=null},16)}),void w(h+e,function(){d.off(e),b.wrap.off("click"+e),b.arrowLeft&&g&&b.arrowLeft.add(b.arrowRight).destroyMfpFastClick(),b.arrowRight=b.arrowLeft=null})):!1},next:function(){b.direction=!0,b.index=S(b.index+1),b.updateItemHTML()},prev:function(){b.direction=!1,b.index=S(b.index-1),b.updateItemHTML()},goTo:function(a){b.direction=a>=b.index,b.index=a,b.updateItemHTML()},preloadNearbyImages:function(){var a,c=b.st.gallery.preload,d=Math.min(c[0],b.items.length),e=Math.min(c[1],b.items.length);for(a=1;a<=(b.direction?e:d);a++)b._preloadItem(b.index+a);for(a=1;a<=(b.direction?d:e);a++)b._preloadItem(b.index-a)},_preloadItem:function(c){if(c=S(c),!b.items[c].preloaded){var d=b.items[c];d.parsed||(d=b.parseEl(c)),y("LazyLoad",d),"image"===d.type&&(d.img=a('<img class="mfp-img" />').on("load.mfploader",function(){d.hasSize=!0}).on("error.mfploader",function(){d.hasSize=!0,d.loadError=!0,y("LazyLoadError",d)}).attr("src",d.src)),d.preloaded=!0}}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=b.st.retina,c=a.ratio;c=isNaN(c)?c():c,c>1&&(w("ImageHasSize."+U,function(a,b){b.img.css({"max-width":b.img[0].naturalWidth/c,width:"100%"})}),w("ElementParse."+U,function(b,d){d.src=a.replaceSrc(d,c)}))}}}}),function(){var b=1e3,c="ontouchstart"in window,d=function(){v.off("touchmove"+f+" touchend"+f)},e="mfpFastClick",f="."+e;a.fn.mfpFastClick=function(e){return a(this).each(function(){var g,h=a(this);if(c){var i,j,k,l,m,n;h.on("touchstart"+f,function(a){l=!1,n=1,m=a.originalEvent?a.originalEvent.touches[0]:a.touches[0],j=m.clientX,k=m.clientY,v.on("touchmove"+f,function(a){m=a.originalEvent?a.originalEvent.touches:a.touches,n=m.length,m=m[0],(Math.abs(m.clientX-j)>10||Math.abs(m.clientY-k)>10)&&(l=!0,d())}).on("touchend"+f,function(a){d(),l||n>1||(g=!0,a.preventDefault(),clearTimeout(i),i=setTimeout(function(){g=!1},b),e())})})}h.on("click"+f,function(){g||e()})})},a.fn.destroyMfpFastClick=function(){a(this).off("touchstart"+f+" click"+f),c&&v.off("touchmove"+f+" touchend"+f)}}(),A()});
/*!
 * JavaScript Cookie v2.1.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        var _OldCookies = window.Cookies;
        var api = window.Cookies = factory();
        api.noConflict = function () {
            window.Cookies = _OldCookies;
            return api;
        };
    }
}(function () {
    function extend () {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[ i ];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }

    function init (converter) {
        function api (key, value, attributes) {
            var result;

            // Write

            if (arguments.length > 1) {
                attributes = extend({
                    path: '/'
                }, api.defaults, attributes);

                if (typeof attributes.expires === 'number') {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                    attributes.expires = expires;
                }

                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) {}

                if (!converter.write) {
                    value = encodeURIComponent(String(value))
                        .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                } else {
                    value = converter.write(value, key);
                }

                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);

                return (document.cookie = [
                    key, '=', value,
                    attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
                    attributes.path    && '; path=' + attributes.path,
                    attributes.domain  && '; domain=' + attributes.domain,
                    attributes.secure ? '; secure' : ''
                ].join(''));
            }

            // Read

            if (!key) {
                result = {};
            }

            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling "get()"
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;

            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var name = parts[0].replace(rdecode, decodeURIComponent);
                var cookie = parts.slice(1).join('=');

                if (cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }

                try {
                    cookie = converter.read ?
                        converter.read(cookie, name) : converter(cookie, name) ||
                        cookie.replace(rdecode, decodeURIComponent);

                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) {}
                    }

                    if (key === name) {
                        result = cookie;
                        break;
                    }

                    if (!key) {
                        result[name] = cookie;
                    }
                } catch (e) {}
            }

            return result;
        }

        api.get = api.set = api;
        api.getJSON = function () {
            return api.apply({
                json: true
            }, [].slice.call(arguments));
        };
        api.defaults = {};

        api.remove = function (key, attributes) {
            api(key, '', extend(attributes, {
                expires: -1
            }));
        };

        api.withConverter = init;

        return api;
    }

    return init(function () {});
}));
/*! modernizr 3.1.0 (Custom Build) | MIT *
 * http://modernizr.com/download/?- !*/
!function(n,e,s){function o(n,e){return typeof n===e}function a(){var n,e,s,a,i,l,r;for(var c in f)if(f.hasOwnProperty(c)){if(n=[],e=f[c],e.name&&(n.push(e.name.toLowerCase()),e.options&&e.options.aliases&&e.options.aliases.length))for(s=0;s<e.options.aliases.length;s++)n.push(e.options.aliases[s].toLowerCase());for(a=o(e.fn,"function")?e.fn():e.fn,i=0;i<n.length;i++)l=n[i],r=l.split("."),1===r.length?Modernizr[r[0]]=a:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=a),t.push((a?"":"no-")+r.join("-"))}}function i(n){var e=r.className,s=Modernizr._config.classPrefix||"";if(c&&(e=e.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+s+"no-js(\\s|$)");e=e.replace(o,"$1"+s+"js$2")}Modernizr._config.enableClasses&&(e+=" "+s+n.join(" "+s),c?r.className.baseVal=e:r.className=e)}var t=[],f=[],l={_version:"3.1.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(n,e){var s=this;setTimeout(function(){e(s[n])},0)},addTest:function(n,e,s){f.push({name:n,fn:e,options:s})},addAsyncTest:function(n){f.push({name:null,fn:n})}},Modernizr=function(){};Modernizr.prototype=l,Modernizr=new Modernizr;var r=e.documentElement,c="svg"===r.nodeName.toLowerCase();a(),i(t),delete l.addTest,delete l.addAsyncTest;for(var u=0;u<Modernizr._q.length;u++)Modernizr._q[u]();n.Modernizr=Modernizr}(window,document);
/*
JqTree 1.3.0

Copyright 2015 Marco Braak

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $, DragAndDropHandler, DragElement, HitAreasGenerator, Position, VisibleNodeIterator, node_module,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

node_module = require('./node');

Position = node_module.Position;

$ = jQuery;

DragAndDropHandler = (function() {
  function DragAndDropHandler(tree_widget) {
    this.tree_widget = tree_widget;
    this.hovered_area = null;
    this.$ghost = null;
    this.hit_areas = [];
    this.is_dragging = false;
    this.current_item = null;
  }

  DragAndDropHandler.prototype.mouseCapture = function(position_info) {
    var $element, node_element;
    $element = $(position_info.target);
    if (!this.mustCaptureElement($element)) {
      return null;
    }
    if (this.tree_widget.options.onIsMoveHandle && !this.tree_widget.options.onIsMoveHandle($element)) {
      return null;
    }
    node_element = this.tree_widget._getNodeElement($element);
    if (node_element && this.tree_widget.options.onCanMove) {
      if (!this.tree_widget.options.onCanMove(node_element.node)) {
        node_element = null;
      }
    }
    this.current_item = node_element;
    return this.current_item !== null;
  };

  DragAndDropHandler.prototype.mouseStart = function(position_info) {
    var offset;
    this.refresh();
    offset = $(position_info.target).offset();
    this.drag_element = new DragElement(this.current_item.node, position_info.page_x - offset.left, position_info.page_y - offset.top, this.tree_widget.element);
    this.is_dragging = true;
    this.current_item.$element.addClass('jqtree-moving');
    return true;
  };

  DragAndDropHandler.prototype.mouseDrag = function(position_info) {
    var area, can_move_to;
    this.drag_element.move(position_info.page_x, position_info.page_y);
    area = this.findHoveredArea(position_info.page_x, position_info.page_y);
    can_move_to = this.canMoveToArea(area);
    if (can_move_to && area) {
      if (!area.node.isFolder()) {
        this.stopOpenFolderTimer();
      }
      if (this.hovered_area !== area) {
        this.hovered_area = area;
        if (this.mustOpenFolderTimer(area)) {
          this.startOpenFolderTimer(area.node);
        } else {
          this.stopOpenFolderTimer();
        }
        this.updateDropHint();
      }
    } else {
      this.removeHover();
      this.removeDropHint();
      this.stopOpenFolderTimer();
    }
    if (!area) {
      if (this.tree_widget.options.onDragMove != null) {
        this.tree_widget.options.onDragMove(this.current_item.node, position_info.original_event);
      }
    }
    return true;
  };

  DragAndDropHandler.prototype.mustCaptureElement = function($element) {
    return !$element.is('input,select');
  };

  DragAndDropHandler.prototype.canMoveToArea = function(area) {
    var position_name;
    if (!area) {
      return false;
    } else if (this.tree_widget.options.onCanMoveTo) {
      position_name = Position.getName(area.position);
      return this.tree_widget.options.onCanMoveTo(this.current_item.node, area.node, position_name);
    } else {
      return true;
    }
  };

  DragAndDropHandler.prototype.mouseStop = function(position_info) {
    var current_item;
    this.moveItem(position_info);
    this.clear();
    this.removeHover();
    this.removeDropHint();
    this.removeHitAreas();
    current_item = this.current_item;
    if (this.current_item) {
      this.current_item.$element.removeClass('jqtree-moving');
      this.current_item = null;
    }
    this.is_dragging = false;
    if (!this.hovered_area && current_item) {
      if (this.tree_widget.options.onDragStop != null) {
        this.tree_widget.options.onDragStop(current_item.node, position_info.original_event);
      }
    }
    return false;
  };

  DragAndDropHandler.prototype.refresh = function() {
    this.removeHitAreas();
    if (this.current_item) {
      this.generateHitAreas();
      this.current_item = this.tree_widget._getNodeElementForNode(this.current_item.node);
      if (this.is_dragging) {
        return this.current_item.$element.addClass('jqtree-moving');
      }
    }
  };

  DragAndDropHandler.prototype.removeHitAreas = function() {
    return this.hit_areas = [];
  };

  DragAndDropHandler.prototype.clear = function() {
    this.drag_element.remove();
    return this.drag_element = null;
  };

  DragAndDropHandler.prototype.removeDropHint = function() {
    if (this.previous_ghost) {
      return this.previous_ghost.remove();
    }
  };

  DragAndDropHandler.prototype.removeHover = function() {
    return this.hovered_area = null;
  };

  DragAndDropHandler.prototype.generateHitAreas = function() {
    var hit_areas_generator;
    hit_areas_generator = new HitAreasGenerator(this.tree_widget.tree, this.current_item.node, this.getTreeDimensions().bottom);
    return this.hit_areas = hit_areas_generator.generate();
  };

  DragAndDropHandler.prototype.findHoveredArea = function(x, y) {
    var area, dimensions, high, low, mid;
    dimensions = this.getTreeDimensions();
    if (x < dimensions.left || y < dimensions.top || x > dimensions.right || y > dimensions.bottom) {
      return null;
    }
    low = 0;
    high = this.hit_areas.length;
    while (low < high) {
      mid = (low + high) >> 1;
      area = this.hit_areas[mid];
      if (y < area.top) {
        high = mid;
      } else if (y > area.bottom) {
        low = mid + 1;
      } else {
        return area;
      }
    }
    return null;
  };

  DragAndDropHandler.prototype.mustOpenFolderTimer = function(area) {
    var node;
    node = area.node;
    return node.isFolder() && !node.is_open && area.position === Position.INSIDE;
  };

  DragAndDropHandler.prototype.updateDropHint = function() {
    var node_element;
    if (!this.hovered_area) {
      return;
    }
    this.removeDropHint();
    node_element = this.tree_widget._getNodeElementForNode(this.hovered_area.node);
    return this.previous_ghost = node_element.addDropHint(this.hovered_area.position);
  };

  DragAndDropHandler.prototype.startOpenFolderTimer = function(folder) {
    var openFolder;
    openFolder = (function(_this) {
      return function() {
        return _this.tree_widget._openNode(folder, _this.tree_widget.options.slide, function() {
          _this.refresh();
          return _this.updateDropHint();
        });
      };
    })(this);
    this.stopOpenFolderTimer();
    return this.open_folder_timer = setTimeout(openFolder, this.tree_widget.options.openFolderDelay);
  };

  DragAndDropHandler.prototype.stopOpenFolderTimer = function() {
    if (this.open_folder_timer) {
      clearTimeout(this.open_folder_timer);
      return this.open_folder_timer = null;
    }
  };

  DragAndDropHandler.prototype.moveItem = function(position_info) {
    var doMove, event, moved_node, position, previous_parent, target_node;
    if (this.hovered_area && this.hovered_area.position !== Position.NONE && this.canMoveToArea(this.hovered_area)) {
      moved_node = this.current_item.node;
      target_node = this.hovered_area.node;
      position = this.hovered_area.position;
      previous_parent = moved_node.parent;
      if (position === Position.INSIDE) {
        this.hovered_area.node.is_open = true;
      }
      doMove = (function(_this) {
        return function() {
          _this.tree_widget.tree.moveNode(moved_node, target_node, position);
          _this.tree_widget.element.empty();
          return _this.tree_widget._refreshElements();
        };
      })(this);
      event = this.tree_widget._triggerEvent('tree.move', {
        move_info: {
          moved_node: moved_node,
          target_node: target_node,
          position: Position.getName(position),
          previous_parent: previous_parent,
          do_move: doMove,
          original_event: position_info.original_event
        }
      });
      if (!event.isDefaultPrevented()) {
        return doMove();
      }
    }
  };

  DragAndDropHandler.prototype.getTreeDimensions = function() {
    var offset;
    offset = this.tree_widget.element.offset();
    return {
      left: offset.left,
      top: offset.top,
      right: offset.left + this.tree_widget.element.width(),
      bottom: offset.top + this.tree_widget.element.height() + 16
    };
  };

  return DragAndDropHandler;

})();

VisibleNodeIterator = (function() {
  function VisibleNodeIterator(tree) {
    this.tree = tree;
  }

  VisibleNodeIterator.prototype.iterate = function() {
    var _iterateNode, is_first_node;
    is_first_node = true;
    _iterateNode = (function(_this) {
      return function(node, next_node) {
        var $element, child, children_length, i, j, len, must_iterate_inside, ref;
        must_iterate_inside = (node.is_open || !node.element) && node.hasChildren();
        if (node.element) {
          $element = $(node.element);
          if (!$element.is(':visible')) {
            return;
          }
          if (is_first_node) {
            _this.handleFirstNode(node, $element);
            is_first_node = false;
          }
          if (!node.hasChildren()) {
            _this.handleNode(node, next_node, $element);
          } else if (node.is_open) {
            if (!_this.handleOpenFolder(node, $element)) {
              must_iterate_inside = false;
            }
          } else {
            _this.handleClosedFolder(node, next_node, $element);
          }
        }
        if (must_iterate_inside) {
          children_length = node.children.length;
          ref = node.children;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            child = ref[i];
            if (i === (children_length - 1)) {
              _iterateNode(node.children[i], null);
            } else {
              _iterateNode(node.children[i], node.children[i + 1]);
            }
          }
          if (node.is_open) {
            return _this.handleAfterOpenFolder(node, next_node, $element);
          }
        }
      };
    })(this);
    return _iterateNode(this.tree, null);
  };

  VisibleNodeIterator.prototype.handleNode = function(node, next_node, $element) {};

  VisibleNodeIterator.prototype.handleOpenFolder = function(node, $element) {};

  VisibleNodeIterator.prototype.handleClosedFolder = function(node, next_node, $element) {};

  VisibleNodeIterator.prototype.handleAfterOpenFolder = function(node, next_node, $element) {};

  VisibleNodeIterator.prototype.handleFirstNode = function(node, $element) {};

  return VisibleNodeIterator;

})();

HitAreasGenerator = (function(superClass) {
  extend(HitAreasGenerator, superClass);

  function HitAreasGenerator(tree, current_node, tree_bottom) {
    HitAreasGenerator.__super__.constructor.call(this, tree);
    this.current_node = current_node;
    this.tree_bottom = tree_bottom;
  }

  HitAreasGenerator.prototype.generate = function() {
    this.positions = [];
    this.last_top = 0;
    this.iterate();
    return this.generateHitAreas(this.positions);
  };

  HitAreasGenerator.prototype.getTop = function($element) {
    return $element.offset().top;
  };

  HitAreasGenerator.prototype.addPosition = function(node, position, top) {
    var area;
    area = {
      top: top,
      node: node,
      position: position
    };
    this.positions.push(area);
    return this.last_top = top;
  };

  HitAreasGenerator.prototype.handleNode = function(node, next_node, $element) {
    var top;
    top = this.getTop($element);
    if (node === this.current_node) {
      this.addPosition(node, Position.NONE, top);
    } else {
      this.addPosition(node, Position.INSIDE, top);
    }
    if (next_node === this.current_node || node === this.current_node) {
      return this.addPosition(node, Position.NONE, top);
    } else {
      return this.addPosition(node, Position.AFTER, top);
    }
  };

  HitAreasGenerator.prototype.handleOpenFolder = function(node, $element) {
    if (node === this.current_node) {
      return false;
    }
    if (node.children[0] !== this.current_node) {
      this.addPosition(node, Position.INSIDE, this.getTop($element));
    }
    return true;
  };

  HitAreasGenerator.prototype.handleClosedFolder = function(node, next_node, $element) {
    var top;
    top = this.getTop($element);
    if (node === this.current_node) {
      return this.addPosition(node, Position.NONE, top);
    } else {
      this.addPosition(node, Position.INSIDE, top);
      if (next_node !== this.current_node) {
        return this.addPosition(node, Position.AFTER, top);
      }
    }
  };

  HitAreasGenerator.prototype.handleFirstNode = function(node, $element) {
    if (node !== this.current_node) {
      return this.addPosition(node, Position.BEFORE, this.getTop($(node.element)));
    }
  };

  HitAreasGenerator.prototype.handleAfterOpenFolder = function(node, next_node, $element) {
    if (node === this.current_node.node || next_node === this.current_node.node) {
      return this.addPosition(node, Position.NONE, this.last_top);
    } else {
      return this.addPosition(node, Position.AFTER, this.last_top);
    }
  };

  HitAreasGenerator.prototype.generateHitAreas = function(positions) {
    var group, hit_areas, j, len, position, previous_top;
    previous_top = -1;
    group = [];
    hit_areas = [];
    for (j = 0, len = positions.length; j < len; j++) {
      position = positions[j];
      if (position.top !== previous_top && group.length) {
        if (group.length) {
          this.generateHitAreasForGroup(hit_areas, group, previous_top, position.top);
        }
        previous_top = position.top;
        group = [];
      }
      group.push(position);
    }
    this.generateHitAreasForGroup(hit_areas, group, previous_top, this.tree_bottom);
    return hit_areas;
  };

  HitAreasGenerator.prototype.generateHitAreasForGroup = function(hit_areas, positions_in_group, top, bottom) {
    var area_height, area_top, i, position, position_count;
    position_count = Math.min(positions_in_group.length, 4);
    area_height = Math.round((bottom - top) / position_count);
    area_top = top;
    i = 0;
    while (i < position_count) {
      position = positions_in_group[i];
      hit_areas.push({
        top: area_top,
        bottom: area_top + area_height,
        node: position.node,
        position: position.position
      });
      area_top += area_height;
      i += 1;
    }
    return null;
  };

  return HitAreasGenerator;

})(VisibleNodeIterator);

DragElement = (function() {
  function DragElement(node, offset_x, offset_y, $tree) {
    this.offset_x = offset_x;
    this.offset_y = offset_y;
    this.$element = $("<span class=\"jqtree-title jqtree-dragging\">" + node.name + "</span>");
    this.$element.css("position", "absolute");
    $tree.append(this.$element);
  }

  DragElement.prototype.move = function(page_x, page_y) {
    return this.$element.offset({
      left: page_x - this.offset_x,
      top: page_y - this.offset_y
    });
  };

  DragElement.prototype.remove = function() {
    return this.$element.remove();
  };

  return DragElement;

})();

module.exports = {
  DragAndDropHandler: DragAndDropHandler,
  DragElement: DragElement,
  HitAreasGenerator: HitAreasGenerator
};

},{"./node":5}],2:[function(require,module,exports){
var $, ElementsRenderer, NodeElement, html_escape, node_element, util;

node_element = require('./node_element');

NodeElement = node_element.NodeElement;

util = require('./util');

html_escape = util.html_escape;

$ = jQuery;

ElementsRenderer = (function() {
  function ElementsRenderer(tree_widget) {
    this.tree_widget = tree_widget;
    this.opened_icon_element = this.createButtonElement(tree_widget.options.openedIcon);
    this.closed_icon_element = this.createButtonElement(tree_widget.options.closedIcon);
  }

  ElementsRenderer.prototype.render = function(from_node) {
    if (from_node && from_node.parent) {
      return this.renderFromNode(from_node);
    } else {
      return this.renderFromRoot();
    }
  };

  ElementsRenderer.prototype.renderFromRoot = function() {
    var $element;
    $element = this.tree_widget.element;
    $element.empty();
    return this.createDomElements($element[0], this.tree_widget.tree.children, true, true, 1);
  };

  ElementsRenderer.prototype.renderFromNode = function(node) {
    var $previous_li, li;
    $previous_li = $(node.element);
    li = this.createLi(node);
    this.attachNodeData(node, li);
    $previous_li.after(li);
    $previous_li.remove();
    if (node.children) {
      return this.createDomElements(li, node.children, false, false, node.getLevel());
    }
  };

  ElementsRenderer.prototype.createDomElements = function(element, children, is_root_node, is_open, level) {
    var child, i, len, li, ul;
    ul = this.createUl(is_root_node);
    element.appendChild(ul);
    for (i = 0, len = children.length; i < len; i++) {
      child = children[i];
      li = this.createLi(child, level);
      ul.appendChild(li);
      this.attachNodeData(child, li);
      if (child.hasChildren()) {
        this.createDomElements(li, child.children, false, child.is_open, level + 1);
      }
    }
    return null;
  };

  ElementsRenderer.prototype.attachNodeData = function(node, li) {
    node.element = li;
    return $(li).data('node', node);
  };

  ElementsRenderer.prototype.createUl = function(is_root_node) {
    var class_string, role, ul;
    if (!is_root_node) {
      class_string = '';
      role = 'group';
    } else {
      class_string = 'jqtree-tree';
      role = 'tree';
      if (this.tree_widget.options.rtl) {
        class_string += ' jqtree-rtl';
      }
    }
    ul = document.createElement('ul');
    ul.className = "jqtree_common " + class_string;
    ul.setAttribute('role', role);
    return ul;
  };

  ElementsRenderer.prototype.createLi = function(node, level) {
    var is_selected, li;
    is_selected = this.tree_widget.select_node_handler && this.tree_widget.select_node_handler.isNodeSelected(node);
    if (node.isFolder()) {
      li = this.createFolderLi(node, level, is_selected);
    } else {
      li = this.createNodeLi(node, level, is_selected);
    }
    if (this.tree_widget.options.onCreateLi) {
      this.tree_widget.options.onCreateLi(node, $(li));
    }
    return li;
  };

  ElementsRenderer.prototype.createFolderLi = function(node, level, is_selected) {
    var button_classes, button_link, div, folder_classes, icon_element, is_folder, li;
    button_classes = this.getButtonClasses(node);
    folder_classes = this.getFolderClasses(node, is_selected);
    if (node.is_open) {
      icon_element = this.opened_icon_element;
    } else {
      icon_element = this.closed_icon_element;
    }
    li = document.createElement('li');
    li.className = "jqtree_common " + folder_classes;
    li.setAttribute('role', 'presentation');
    div = document.createElement('div');
    div.className = "jqtree-element jqtree_common";
    div.setAttribute('role', 'presentation');
    li.appendChild(div);
    button_link = document.createElement('a');
    button_link.className = button_classes;
    button_link.appendChild(icon_element.cloneNode(false));
    button_link.setAttribute('role', 'presentation');
    button_link.setAttribute('aria-hidden', 'true');
    if (this.tree_widget.options.buttonLeft) {
      div.appendChild(button_link);
    }
    div.appendChild(this.createTitleSpan(node.name, level, is_selected, node.is_open, is_folder = true));
    if (!this.tree_widget.options.buttonLeft) {
      div.appendChild(button_link);
    }
    return li;
  };

  ElementsRenderer.prototype.createNodeLi = function(node, level, is_selected) {
    var class_string, div, is_folder, li, li_classes;
    li_classes = ['jqtree_common'];
    if (is_selected) {
      li_classes.push('jqtree-selected');
    }
    class_string = li_classes.join(' ');
    li = document.createElement('li');
    li.className = class_string;
    li.setAttribute('role', 'presentation');
    div = document.createElement('div');
    div.className = "jqtree-element jqtree_common";
    div.setAttribute('role', 'presentation');
    li.appendChild(div);
    div.appendChild(this.createTitleSpan(node.name, level, is_selected, node.is_open, is_folder = false));
    return li;
  };

  ElementsRenderer.prototype.createTitleSpan = function(node_name, level, is_selected, is_open, is_folder) {
    var classes, title_span;
    title_span = document.createElement('span');
    classes = "jqtree-title jqtree_common";
    if (is_folder) {
      classes += " jqtree-title-folder";
    }
    title_span.className = classes;
    title_span.setAttribute('role', 'treeitem');
    title_span.setAttribute('aria-level', level);
    title_span.setAttribute('aria-selected', util.getBoolString(is_selected));
    title_span.setAttribute('aria-expanded', util.getBoolString(is_open));
    if (is_selected) {
      title_span.setAttribute('tabindex', 0);
    }
    title_span.innerHTML = this.escapeIfNecessary(node_name);
    return title_span;
  };

  ElementsRenderer.prototype.getButtonClasses = function(node) {
    var classes;
    classes = ['jqtree-toggler', 'jqtree_common'];
    if (!node.is_open) {
      classes.push('jqtree-closed');
    }
    if (this.tree_widget.options.buttonLeft) {
      classes.push('jqtree-toggler-left');
    } else {
      classes.push('jqtree-toggler-right');
    }
    return classes.join(' ');
  };

  ElementsRenderer.prototype.getFolderClasses = function(node, is_selected) {
    var classes;
    classes = ['jqtree-folder'];
    if (!node.is_open) {
      classes.push('jqtree-closed');
    }
    if (is_selected) {
      classes.push('jqtree-selected');
    }
    if (node.is_loading) {
      classes.push('jqtree-loading');
    }
    return classes.join(' ');
  };

  ElementsRenderer.prototype.escapeIfNecessary = function(value) {
    if (this.tree_widget.options.autoEscape) {
      return html_escape(value);
    } else {
      return value;
    }
  };

  ElementsRenderer.prototype.createButtonElement = function(value) {
    var div;
    if (typeof value === 'string') {
      div = document.createElement('div');
      div.innerHTML = value;
      return document.createTextNode(div.innerHTML);
    } else {
      return $(value)[0];
    }
  };

  return ElementsRenderer;

})();

module.exports = ElementsRenderer;

},{"./node_element":6,"./util":12}],3:[function(require,module,exports){
var $, KeyHandler,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

$ = jQuery;

KeyHandler = (function() {
  var DOWN, LEFT, RIGHT, UP;

  LEFT = 37;

  UP = 38;

  RIGHT = 39;

  DOWN = 40;

  function KeyHandler(tree_widget) {
    this.selectNode = bind(this.selectNode, this);
    this.tree_widget = tree_widget;
    if (tree_widget.options.keyboardSupport) {
      $(document).bind('keydown.jqtree', $.proxy(this.handleKeyDown, this));
    }
  }

  KeyHandler.prototype.deinit = function() {
    return $(document).unbind('keydown.jqtree');
  };

  KeyHandler.prototype.moveDown = function() {
    var node;
    node = this.tree_widget.getSelectedNode();
    if (node) {
      return this.selectNode(node.getNextNode());
    } else {
      return false;
    }
  };

  KeyHandler.prototype.moveUp = function() {
    var node;
    node = this.tree_widget.getSelectedNode();
    if (node) {
      return this.selectNode(node.getPreviousNode());
    } else {
      return false;
    }
  };

  KeyHandler.prototype.moveRight = function() {
    var node;
    node = this.tree_widget.getSelectedNode();
    if (!node) {
      return true;
    } else if (!node.isFolder()) {
      return true;
    } else {
      if (node.is_open) {
        return this.selectNode(node.getNextNode());
      } else {
        this.tree_widget.openNode(node);
        return false;
      }
    }
  };

  KeyHandler.prototype.moveLeft = function() {
    var node;
    node = this.tree_widget.getSelectedNode();
    if (!node) {
      return true;
    } else if (node.isFolder() && node.is_open) {
      this.tree_widget.closeNode(node);
      return false;
    } else {
      return this.selectNode(node.getParent());
    }
  };

  KeyHandler.prototype.handleKeyDown = function(e) {
    var key;
    if (!this.tree_widget.options.keyboardSupport) {
      return true;
    }
    if ($(document.activeElement).is('textarea,input,select')) {
      return true;
    }
    if (!this.tree_widget.getSelectedNode()) {
      return true;
    }
    key = e.which;
    switch (key) {
      case DOWN:
        return this.moveDown();
      case UP:
        return this.moveUp();
      case RIGHT:
        return this.moveRight();
      case LEFT:
        return this.moveLeft();
    }
    return true;
  };

  KeyHandler.prototype.selectNode = function(node) {
    if (!node) {
      return true;
    } else {
      this.tree_widget.selectNode(node);
      if (this.tree_widget.scroll_handler && (!this.tree_widget.scroll_handler.isScrolledIntoView($(node.element).find('.jqtree-element')))) {
        this.tree_widget.scrollToNode(node);
      }
      return false;
    }
  };

  return KeyHandler;

})();

module.exports = KeyHandler;

},{}],4:[function(require,module,exports){

/*
This widget does the same a the mouse widget in jqueryui.
 */
var $, MouseWidget, SimpleWidget,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SimpleWidget = require('./simple.widget');

$ = jQuery;

MouseWidget = (function(superClass) {
  extend(MouseWidget, superClass);

  function MouseWidget() {
    return MouseWidget.__super__.constructor.apply(this, arguments);
  }

  MouseWidget.is_mouse_handled = false;

  MouseWidget.prototype._init = function() {
    this.$el.bind('mousedown.mousewidget', $.proxy(this._mouseDown, this));
    this.$el.bind('touchstart.mousewidget', $.proxy(this._touchStart, this));
    this.is_mouse_started = false;
    this.mouse_delay = 0;
    this._mouse_delay_timer = null;
    this._is_mouse_delay_met = true;
    return this.mouse_down_info = null;
  };

  MouseWidget.prototype._deinit = function() {
    var $document;
    this.$el.unbind('mousedown.mousewidget');
    this.$el.unbind('touchstart.mousewidget');
    $document = $(document);
    $document.unbind('mousemove.mousewidget');
    return $document.unbind('mouseup.mousewidget');
  };

  MouseWidget.prototype._mouseDown = function(e) {
    var result;
    if (e.which !== 1) {
      return;
    }
    result = this._handleMouseDown(e, this._getPositionInfo(e));
    if (result) {
      e.preventDefault();
    }
    return result;
  };

  MouseWidget.prototype._handleMouseDown = function(e, position_info) {
    if (MouseWidget.is_mouse_handled) {
      return;
    }
    if (this.is_mouse_started) {
      this._handleMouseUp(position_info);
    }
    this.mouse_down_info = position_info;
    if (!this._mouseCapture(position_info)) {
      return;
    }
    this._handleStartMouse();
    this.is_mouse_handled = true;
    return true;
  };

  MouseWidget.prototype._handleStartMouse = function() {
    var $document;
    $document = $(document);
    $document.bind('mousemove.mousewidget', $.proxy(this._mouseMove, this));
    $document.bind('touchmove.mousewidget', $.proxy(this._touchMove, this));
    $document.bind('mouseup.mousewidget', $.proxy(this._mouseUp, this));
    $document.bind('touchend.mousewidget', $.proxy(this._touchEnd, this));
    if (this.mouse_delay) {
      return this._startMouseDelayTimer();
    }
  };

  MouseWidget.prototype._startMouseDelayTimer = function() {
    if (this._mouse_delay_timer) {
      clearTimeout(this._mouse_delay_timer);
    }
    this._mouse_delay_timer = setTimeout((function(_this) {
      return function() {
        return _this._is_mouse_delay_met = true;
      };
    })(this), this.mouse_delay);
    return this._is_mouse_delay_met = false;
  };

  MouseWidget.prototype._mouseMove = function(e) {
    return this._handleMouseMove(e, this._getPositionInfo(e));
  };

  MouseWidget.prototype._handleMouseMove = function(e, position_info) {
    if (this.is_mouse_started) {
      this._mouseDrag(position_info);
      return e.preventDefault();
    }
    if (this.mouse_delay && !this._is_mouse_delay_met) {
      return true;
    }
    this.is_mouse_started = this._mouseStart(this.mouse_down_info) !== false;
    if (this.is_mouse_started) {
      this._mouseDrag(position_info);
    } else {
      this._handleMouseUp(position_info);
    }
    return !this.is_mouse_started;
  };

  MouseWidget.prototype._getPositionInfo = function(e) {
    return {
      page_x: e.pageX,
      page_y: e.pageY,
      target: e.target,
      original_event: e
    };
  };

  MouseWidget.prototype._mouseUp = function(e) {
    return this._handleMouseUp(this._getPositionInfo(e));
  };

  MouseWidget.prototype._handleMouseUp = function(position_info) {
    var $document;
    $document = $(document);
    $document.unbind('mousemove.mousewidget');
    $document.unbind('touchmove.mousewidget');
    $document.unbind('mouseup.mousewidget');
    $document.unbind('touchend.mousewidget');
    if (this.is_mouse_started) {
      this.is_mouse_started = false;
      this._mouseStop(position_info);
    }
  };

  MouseWidget.prototype._mouseCapture = function(position_info) {
    return true;
  };

  MouseWidget.prototype._mouseStart = function(position_info) {
    return null;
  };

  MouseWidget.prototype._mouseDrag = function(position_info) {
    return null;
  };

  MouseWidget.prototype._mouseStop = function(position_info) {
    return null;
  };

  MouseWidget.prototype.setMouseDelay = function(mouse_delay) {
    return this.mouse_delay = mouse_delay;
  };

  MouseWidget.prototype._touchStart = function(e) {
    var touch;
    if (e.originalEvent.touches.length > 1) {
      return;
    }
    touch = e.originalEvent.changedTouches[0];
    return this._handleMouseDown(e, this._getPositionInfo(touch));
  };

  MouseWidget.prototype._touchMove = function(e) {
    var touch;
    if (e.originalEvent.touches.length > 1) {
      return;
    }
    touch = e.originalEvent.changedTouches[0];
    return this._handleMouseMove(e, this._getPositionInfo(touch));
  };

  MouseWidget.prototype._touchEnd = function(e) {
    var touch;
    if (e.originalEvent.touches.length > 1) {
      return;
    }
    touch = e.originalEvent.changedTouches[0];
    return this._handleMouseUp(this._getPositionInfo(touch));
  };

  return MouseWidget;

})(SimpleWidget);

module.exports = MouseWidget;

},{"./simple.widget":10}],5:[function(require,module,exports){
var $, Node, Position;

$ = jQuery;

Position = {
  getName: function(position) {
    return Position.strings[position - 1];
  },
  nameToIndex: function(name) {
    var i, j, ref;
    for (i = j = 1, ref = Position.strings.length; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      if (Position.strings[i - 1] === name) {
        return i;
      }
    }
    return 0;
  }
};

Position.BEFORE = 1;

Position.AFTER = 2;

Position.INSIDE = 3;

Position.NONE = 4;

Position.strings = ['before', 'after', 'inside', 'none'];

Node = (function() {
  function Node(o, is_root, node_class) {
    if (is_root == null) {
      is_root = false;
    }
    if (node_class == null) {
      node_class = Node;
    }
    this.name = '';
    this.setData(o);
    this.children = [];
    this.parent = null;
    if (is_root) {
      this.id_mapping = {};
      this.tree = this;
      this.node_class = node_class;
    }
  }

  Node.prototype.setData = function(o) {
    var key, setName, value;
    setName = (function(_this) {
      return function(name) {
        if (name !== null) {
          return _this.name = name;
        }
      };
    })(this);
    if (typeof o !== 'object') {
      setName(o);
    } else {
      for (key in o) {
        value = o[key];
        if (key === 'label') {
          setName(value);
        } else {
          this[key] = value;
        }
      }
    }
    return null;
  };

  Node.prototype.initFromData = function(data) {
    var addChildren, addNode;
    addNode = (function(_this) {
      return function(node_data) {
        _this.setData(node_data);
        if (node_data.children) {
          return addChildren(node_data.children);
        }
      };
    })(this);
    addChildren = (function(_this) {
      return function(children_data) {
        var child, j, len, node;
        for (j = 0, len = children_data.length; j < len; j++) {
          child = children_data[j];
          node = new _this.tree.node_class('');
          node.initFromData(child);
          _this.addChild(node);
        }
        return null;
      };
    })(this);
    addNode(data);
    return null;
  };


  /*
  Create tree from data.
  
  Structure of data is:
  [
      {
          label: 'node1',
          children: [
              { label: 'child1' },
              { label: 'child2' }
          ]
      },
      {
          label: 'node2'
      }
  ]
   */

  Node.prototype.loadFromData = function(data) {
    var j, len, node, o;
    this.removeChildren();
    for (j = 0, len = data.length; j < len; j++) {
      o = data[j];
      node = new this.tree.node_class(o);
      this.addChild(node);
      if (typeof o === 'object' && o.children) {
        node.loadFromData(o.children);
      }
    }
    return null;
  };


  /*
  Add child.
  
  tree.addChild(
      new Node('child1')
  );
   */

  Node.prototype.addChild = function(node) {
    this.children.push(node);
    return node._setParent(this);
  };


  /*
  Add child at position. Index starts at 0.
  
  tree.addChildAtPosition(
      new Node('abc'),
      1
  );
   */

  Node.prototype.addChildAtPosition = function(node, index) {
    this.children.splice(index, 0, node);
    return node._setParent(this);
  };

  Node.prototype._setParent = function(parent) {
    this.parent = parent;
    this.tree = parent.tree;
    return this.tree.addNodeToIndex(this);
  };


  /*
  Remove child. This also removes the children of the node.
  
  tree.removeChild(tree.children[0]);
   */

  Node.prototype.removeChild = function(node) {
    node.removeChildren();
    return this._removeChild(node);
  };

  Node.prototype._removeChild = function(node) {
    this.children.splice(this.getChildIndex(node), 1);
    return this.tree.removeNodeFromIndex(node);
  };


  /*
  Get child index.
  
  var index = getChildIndex(node);
   */

  Node.prototype.getChildIndex = function(node) {
    return $.inArray(node, this.children);
  };


  /*
  Does the tree have children?
  
  if (tree.hasChildren()) {
      //
  }
   */

  Node.prototype.hasChildren = function() {
    return this.children.length !== 0;
  };

  Node.prototype.isFolder = function() {
    return this.hasChildren() || this.load_on_demand;
  };


  /*
  Iterate over all the nodes in the tree.
  
  Calls callback with (node, level).
  
  The callback must return true to continue the iteration on current node.
  
  tree.iterate(
      function(node, level) {
         console.log(node.name);
  
         // stop iteration after level 2
         return (level <= 2);
      }
  );
   */

  Node.prototype.iterate = function(callback) {
    var _iterate;
    _iterate = function(node, level) {
      var child, j, len, ref, result;
      if (node.children) {
        ref = node.children;
        for (j = 0, len = ref.length; j < len; j++) {
          child = ref[j];
          result = callback(child, level);
          if (result && child.hasChildren()) {
            _iterate(child, level + 1);
          }
        }
        return null;
      }
    };
    _iterate(this, 0);
    return null;
  };


  /*
  Move node relative to another node.
  
  Argument position: Position.BEFORE, Position.AFTER or Position.Inside
  
  // move node1 after node2
  tree.moveNode(node1, node2, Position.AFTER);
   */

  Node.prototype.moveNode = function(moved_node, target_node, position) {
    if (moved_node.isParentOf(target_node)) {
      return;
    }
    moved_node.parent._removeChild(moved_node);
    if (position === Position.AFTER) {
      return target_node.parent.addChildAtPosition(moved_node, target_node.parent.getChildIndex(target_node) + 1);
    } else if (position === Position.BEFORE) {
      return target_node.parent.addChildAtPosition(moved_node, target_node.parent.getChildIndex(target_node));
    } else if (position === Position.INSIDE) {
      return target_node.addChildAtPosition(moved_node, 0);
    }
  };


  /*
  Get the tree as data.
   */

  Node.prototype.getData = function(include_parent) {
    var getDataFromNodes;
    if (include_parent == null) {
      include_parent = false;
    }
    getDataFromNodes = function(nodes) {
      var data, j, k, len, node, tmp_node, v;
      data = [];
      for (j = 0, len = nodes.length; j < len; j++) {
        node = nodes[j];
        tmp_node = {};
        for (k in node) {
          v = node[k];
          if ((k !== 'parent' && k !== 'children' && k !== 'element' && k !== 'tree') && Object.prototype.hasOwnProperty.call(node, k)) {
            tmp_node[k] = v;
          }
        }
        if (node.hasChildren()) {
          tmp_node.children = getDataFromNodes(node.children);
        }
        data.push(tmp_node);
      }
      return data;
    };
    if (include_parent) {
      return getDataFromNodes([this]);
    } else {
      return getDataFromNodes(this.children);
    }
  };

  Node.prototype.getNodeByName = function(name) {
    var result;
    result = null;
    this.iterate(function(node) {
      if (node.name === name) {
        result = node;
        return false;
      } else {
        return true;
      }
    });
    return result;
  };

  Node.prototype.addAfter = function(node_info) {
    var child_index, node;
    if (!this.parent) {
      return null;
    } else {
      node = new this.tree.node_class(node_info);
      child_index = this.parent.getChildIndex(this);
      this.parent.addChildAtPosition(node, child_index + 1);
      return node;
    }
  };

  Node.prototype.addBefore = function(node_info) {
    var child_index, node;
    if (!this.parent) {
      return null;
    } else {
      node = new this.tree.node_class(node_info);
      child_index = this.parent.getChildIndex(this);
      this.parent.addChildAtPosition(node, child_index);
      return node;
    }
  };

  Node.prototype.addParent = function(node_info) {
    var child, j, len, new_parent, original_parent, ref;
    if (!this.parent) {
      return null;
    } else {
      new_parent = new this.tree.node_class(node_info);
      new_parent._setParent(this.tree);
      original_parent = this.parent;
      ref = original_parent.children;
      for (j = 0, len = ref.length; j < len; j++) {
        child = ref[j];
        new_parent.addChild(child);
      }
      original_parent.children = [];
      original_parent.addChild(new_parent);
      return new_parent;
    }
  };

  Node.prototype.remove = function() {
    if (this.parent) {
      this.parent.removeChild(this);
      return this.parent = null;
    }
  };

  Node.prototype.append = function(node_info) {
    var node;
    node = new this.tree.node_class(node_info);
    this.addChild(node);
    return node;
  };

  Node.prototype.prepend = function(node_info) {
    var node;
    node = new this.tree.node_class(node_info);
    this.addChildAtPosition(node, 0);
    return node;
  };

  Node.prototype.isParentOf = function(node) {
    var parent;
    parent = node.parent;
    while (parent) {
      if (parent === this) {
        return true;
      }
      parent = parent.parent;
    }
    return false;
  };

  Node.prototype.getLevel = function() {
    var level, node;
    level = 0;
    node = this;
    while (node.parent) {
      level += 1;
      node = node.parent;
    }
    return level;
  };

  Node.prototype.getNodeById = function(node_id) {
    return this.id_mapping[node_id];
  };

  Node.prototype.addNodeToIndex = function(node) {
    if (node.id != null) {
      return this.id_mapping[node.id] = node;
    }
  };

  Node.prototype.removeNodeFromIndex = function(node) {
    if (node.id != null) {
      return delete this.id_mapping[node.id];
    }
  };

  Node.prototype.removeChildren = function() {
    this.iterate((function(_this) {
      return function(child) {
        _this.tree.removeNodeFromIndex(child);
        return true;
      };
    })(this));
    return this.children = [];
  };

  Node.prototype.getPreviousSibling = function() {
    var previous_index;
    if (!this.parent) {
      return null;
    } else {
      previous_index = this.parent.getChildIndex(this) - 1;
      if (previous_index >= 0) {
        return this.parent.children[previous_index];
      } else {
        return null;
      }
    }
  };

  Node.prototype.getNextSibling = function() {
    var next_index;
    if (!this.parent) {
      return null;
    } else {
      next_index = this.parent.getChildIndex(this) + 1;
      if (next_index < this.parent.children.length) {
        return this.parent.children[next_index];
      } else {
        return null;
      }
    }
  };

  Node.prototype.getNodesByProperty = function(key, value) {
    return this.filter(function(node) {
      return node[key] === value;
    });
  };

  Node.prototype.filter = function(f) {
    var result;
    result = [];
    this.iterate(function(node) {
      if (f(node)) {
        result.push(node);
      }
      return true;
    });
    return result;
  };

  Node.prototype.getNextNode = function(include_children) {
    var next_sibling;
    if (include_children == null) {
      include_children = true;
    }
    if (include_children && this.hasChildren() && this.is_open) {
      return this.children[0];
    } else {
      if (!this.parent) {
        return null;
      } else {
        next_sibling = this.getNextSibling();
        if (next_sibling) {
          return next_sibling;
        } else {
          return this.parent.getNextNode(false);
        }
      }
    }
  };

  Node.prototype.getPreviousNode = function() {
    var previous_sibling;
    if (!this.parent) {
      return null;
    } else {
      previous_sibling = this.getPreviousSibling();
      if (previous_sibling) {
        if (!previous_sibling.hasChildren() || !previous_sibling.is_open) {
          return previous_sibling;
        } else {
          return previous_sibling.getLastChild();
        }
      } else {
        return this.getParent();
      }
    }
  };

  Node.prototype.getParent = function() {
    if (!this.parent) {
      return null;
    } else if (!this.parent.parent) {
      return null;
    } else {
      return this.parent;
    }
  };

  Node.prototype.getLastChild = function() {
    var last_child;
    if (!this.hasChildren()) {
      return null;
    } else {
      last_child = this.children[this.children.length - 1];
      if (!last_child.hasChildren() || !last_child.is_open) {
        return last_child;
      } else {
        return last_child.getLastChild();
      }
    }
  };

  return Node;

})();

module.exports = {
  Node: Node,
  Position: Position
};

},{}],6:[function(require,module,exports){
var $, BorderDropHint, FolderElement, GhostDropHint, NodeElement, Position, node,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

node = require('./node');

Position = node.Position;

$ = jQuery;

NodeElement = (function() {
  function NodeElement(node, tree_widget) {
    this.init(node, tree_widget);
  }

  NodeElement.prototype.init = function(node, tree_widget) {
    this.node = node;
    this.tree_widget = tree_widget;
    if (!node.element) {
      node.element = this.tree_widget.element;
    }
    return this.$element = $(node.element);
  };

  NodeElement.prototype.getUl = function() {
    return this.$element.children('ul:first');
  };

  NodeElement.prototype.getSpan = function() {
    return this.$element.children('.jqtree-element').find('span.jqtree-title');
  };

  NodeElement.prototype.getLi = function() {
    return this.$element;
  };

  NodeElement.prototype.addDropHint = function(position) {
    if (position === Position.INSIDE) {
      return new BorderDropHint(this.$element);
    } else {
      return new GhostDropHint(this.node, this.$element, position);
    }
  };

  NodeElement.prototype.select = function() {
    var $li, $span;
    $li = this.getLi();
    $li.addClass('jqtree-selected');
    $li.attr('aria-selected', 'true');
    $span = this.getSpan();
    return $span.attr('tabindex', 0);
  };

  NodeElement.prototype.deselect = function() {
    var $li, $span;
    $li = this.getLi();
    $li.removeClass('jqtree-selected');
    $li.attr('aria-selected', 'false');
    $span = this.getSpan();
    return $span.attr('tabindex', -1);
  };

  return NodeElement;

})();

FolderElement = (function(superClass) {
  extend(FolderElement, superClass);

  function FolderElement() {
    return FolderElement.__super__.constructor.apply(this, arguments);
  }

  FolderElement.prototype.open = function(on_finished, slide) {
    var $button, doOpen;
    if (slide == null) {
      slide = true;
    }
    if (!this.node.is_open) {
      this.node.is_open = true;
      $button = this.getButton();
      $button.removeClass('jqtree-closed');
      $button.html('');
      $button.append(this.tree_widget.renderer.opened_icon_element.cloneNode(false));
      doOpen = (function(_this) {
        return function() {
          var $li, $span;
          $li = _this.getLi();
          $li.removeClass('jqtree-closed');
          $span = _this.getSpan();
          $span.attr('aria-expanded', 'true');
          if (on_finished) {
            on_finished();
          }
          return _this.tree_widget._triggerEvent('tree.open', {
            node: _this.node
          });
        };
      })(this);
      if (slide) {
        return this.getUl().slideDown('fast', doOpen);
      } else {
        this.getUl().show();
        return doOpen();
      }
    }
  };

  FolderElement.prototype.close = function(slide) {
    var $button, doClose;
    if (slide == null) {
      slide = true;
    }
    if (this.node.is_open) {
      this.node.is_open = false;
      $button = this.getButton();
      $button.addClass('jqtree-closed');
      $button.html('');
      $button.append(this.tree_widget.renderer.closed_icon_element.cloneNode(false));
      doClose = (function(_this) {
        return function() {
          var $li, $span;
          $li = _this.getLi();
          $li.addClass('jqtree-closed');
          $span = _this.getSpan();
          $span.attr('aria-expanded', 'false');
          return _this.tree_widget._triggerEvent('tree.close', {
            node: _this.node
          });
        };
      })(this);
      if (slide) {
        return this.getUl().slideUp('fast', doClose);
      } else {
        this.getUl().hide();
        return doClose();
      }
    }
  };

  FolderElement.prototype.getButton = function() {
    return this.$element.children('.jqtree-element').find('a.jqtree-toggler');
  };

  FolderElement.prototype.addDropHint = function(position) {
    if (!this.node.is_open && position === Position.INSIDE) {
      return new BorderDropHint(this.$element);
    } else {
      return new GhostDropHint(this.node, this.$element, position);
    }
  };

  return FolderElement;

})(NodeElement);

BorderDropHint = (function() {
  function BorderDropHint($element) {
    var $div, width;
    $div = $element.children('.jqtree-element');
    width = $element.width() - 4;
    this.$hint = $('<span class="jqtree-border"></span>');
    $div.append(this.$hint);
    this.$hint.css({
      width: width,
      height: $div.outerHeight() - 4
    });
  }

  BorderDropHint.prototype.remove = function() {
    return this.$hint.remove();
  };

  return BorderDropHint;

})();

GhostDropHint = (function() {
  function GhostDropHint(node, $element, position) {
    this.$element = $element;
    this.node = node;
    this.$ghost = $('<li class="jqtree_common jqtree-ghost"><span class="jqtree_common jqtree-circle"></span><span class="jqtree_common jqtree-line"></span></li>');
    if (position === Position.AFTER) {
      this.moveAfter();
    } else if (position === Position.BEFORE) {
      this.moveBefore();
    } else if (position === Position.INSIDE) {
      if (node.isFolder() && node.is_open) {
        this.moveInsideOpenFolder();
      } else {
        this.moveInside();
      }
    }
  }

  GhostDropHint.prototype.remove = function() {
    return this.$ghost.remove();
  };

  GhostDropHint.prototype.moveAfter = function() {
    return this.$element.after(this.$ghost);
  };

  GhostDropHint.prototype.moveBefore = function() {
    return this.$element.before(this.$ghost);
  };

  GhostDropHint.prototype.moveInsideOpenFolder = function() {
    return $(this.node.children[0].element).before(this.$ghost);
  };

  GhostDropHint.prototype.moveInside = function() {
    this.$element.after(this.$ghost);
    return this.$ghost.addClass('jqtree-inside');
  };

  return GhostDropHint;

})();

module.exports = {
  BorderDropHint: BorderDropHint,
  FolderElement: FolderElement,
  GhostDropHint: GhostDropHint,
  NodeElement: NodeElement
};

},{"./node":5}],7:[function(require,module,exports){
var $, SaveStateHandler, indexOf, isInt, util;

util = require('./util');

indexOf = util.indexOf;

isInt = util.isInt;

$ = jQuery;

SaveStateHandler = (function() {
  function SaveStateHandler(tree_widget) {
    this.tree_widget = tree_widget;
  }

  SaveStateHandler.prototype.saveState = function() {
    var state;
    state = JSON.stringify(this.getState());
    if (this.tree_widget.options.onSetStateFromStorage) {
      return this.tree_widget.options.onSetStateFromStorage(state);
    } else if (this.supportsLocalStorage()) {
      return localStorage.setItem(this.getCookieName(), state);
    } else if ($.cookie) {
      $.cookie.raw = true;
      return $.cookie(this.getCookieName(), state, {
        path: '/'
      });
    }
  };

  SaveStateHandler.prototype.getStateFromStorage = function() {
    var json_data;
    json_data = this._loadFromStorage();
    if (json_data) {
      return this._parseState(json_data);
    } else {
      return null;
    }
  };

  SaveStateHandler.prototype._parseState = function(json_data) {
    var state;
    state = $.parseJSON(json_data);
    if (state && state.selected_node && isInt(state.selected_node)) {
      state.selected_node = [state.selected_node];
    }
    return state;
  };

  SaveStateHandler.prototype._loadFromStorage = function() {
    if (this.tree_widget.options.onGetStateFromStorage) {
      return this.tree_widget.options.onGetStateFromStorage();
    } else if (this.supportsLocalStorage()) {
      return localStorage.getItem(this.getCookieName());
    } else if ($.cookie) {
      $.cookie.raw = true;
      return $.cookie(this.getCookieName());
    } else {
      return null;
    }
  };

  SaveStateHandler.prototype.getState = function() {
    var getOpenNodeIds, getSelectedNodeIds;
    getOpenNodeIds = (function(_this) {
      return function() {
        var open_nodes;
        open_nodes = [];
        _this.tree_widget.tree.iterate(function(node) {
          if (node.is_open && node.id && node.hasChildren()) {
            open_nodes.push(node.id);
          }
          return true;
        });
        return open_nodes;
      };
    })(this);
    getSelectedNodeIds = (function(_this) {
      return function() {
        var n;
        return (function() {
          var i, len, ref, results;
          ref = this.tree_widget.getSelectedNodes();
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            n = ref[i];
            results.push(n.id);
          }
          return results;
        }).call(_this);
      };
    })(this);
    return {
      open_nodes: getOpenNodeIds(),
      selected_node: getSelectedNodeIds()
    };
  };

  SaveStateHandler.prototype.setInitialState = function(state) {
    var must_load_on_demand;
    if (!state) {
      return false;
    } else {
      must_load_on_demand = this._openInitialNodes(state.open_nodes);
      this._selectInitialNodes(state.selected_node);
      return must_load_on_demand;
    }
  };

  SaveStateHandler.prototype._openInitialNodes = function(node_ids) {
    var i, len, must_load_on_demand, node, node_id;
    must_load_on_demand = false;
    for (i = 0, len = node_ids.length; i < len; i++) {
      node_id = node_ids[i];
      node = this.tree_widget.getNodeById(node_id);
      if (node) {
        if (!node.load_on_demand) {
          node.is_open = true;
        } else {
          must_load_on_demand = true;
        }
      }
    }
    return must_load_on_demand;
  };

  SaveStateHandler.prototype._selectInitialNodes = function(node_ids) {
    var i, len, node, node_id, select_count;
    select_count = 0;
    for (i = 0, len = node_ids.length; i < len; i++) {
      node_id = node_ids[i];
      node = this.tree_widget.getNodeById(node_id);
      if (node) {
        select_count += 1;
        this.tree_widget.select_node_handler.addToSelection(node);
      }
    }
    return select_count !== 0;
  };

  SaveStateHandler.prototype.setInitialStateOnDemand = function(state, cb_finished) {
    if (state) {
      return this._setInitialStateOnDemand(state.open_nodes, state.selected_node, cb_finished);
    } else {
      return cb_finished();
    }
  };

  SaveStateHandler.prototype._setInitialStateOnDemand = function(node_ids, selected_nodes, cb_finished) {
    var loadAndOpenNode, loading_count, openNodes;
    loading_count = 0;
    openNodes = (function(_this) {
      return function() {
        var i, len, new_nodes_ids, node, node_id;
        new_nodes_ids = [];
        for (i = 0, len = node_ids.length; i < len; i++) {
          node_id = node_ids[i];
          node = _this.tree_widget.getNodeById(node_id);
          if (!node) {
            new_nodes_ids.push(node_id);
          } else {
            if (!node.is_loading) {
              if (node.load_on_demand) {
                loadAndOpenNode(node);
              } else {
                _this.tree_widget._openNode(node, false);
              }
            }
          }
        }
        node_ids = new_nodes_ids;
        if (_this._selectInitialNodes(selected_nodes)) {
          _this.tree_widget._refreshElements();
        }
        if (loading_count === 0) {
          return cb_finished();
        }
      };
    })(this);
    loadAndOpenNode = (function(_this) {
      return function(node) {
        loading_count += 1;
        return _this.tree_widget._openNode(node, false, function() {
          loading_count -= 1;
          return openNodes();
        });
      };
    })(this);
    return openNodes();
  };

  SaveStateHandler.prototype.getCookieName = function() {
    if (typeof this.tree_widget.options.saveState === 'string') {
      return this.tree_widget.options.saveState;
    } else {
      return 'tree';
    }
  };

  SaveStateHandler.prototype.supportsLocalStorage = function() {
    var testSupport;
    testSupport = function() {
      var error, error1, key;
      if (typeof localStorage === "undefined" || localStorage === null) {
        return false;
      } else {
        try {
          key = '_storage_test';
          sessionStorage.setItem(key, true);
          sessionStorage.removeItem(key);
        } catch (error1) {
          error = error1;
          return false;
        }
        return true;
      }
    };
    if (this._supportsLocalStorage == null) {
      this._supportsLocalStorage = testSupport();
    }
    return this._supportsLocalStorage;
  };

  SaveStateHandler.prototype.getNodeIdToBeSelected = function() {
    var state;
    state = this.getStateFromStorage();
    if (state && state.selected_node) {
      return state.selected_node[0];
    } else {
      return null;
    }
  };

  return SaveStateHandler;

})();

module.exports = SaveStateHandler;

},{"./util":12}],8:[function(require,module,exports){
var $, ScrollHandler;

$ = jQuery;

ScrollHandler = (function() {
  function ScrollHandler(tree_widget) {
    this.tree_widget = tree_widget;
    this.previous_top = -1;
    this.is_initialized = false;
    this._initScrollParent();
  }

  ScrollHandler.prototype._initScrollParent = function() {
    var $scroll_parent, getParentWithOverflow, setDocumentAsScrollParent;
    getParentWithOverflow = (function(_this) {
      return function() {
        var css_values, el, hasOverFlow, i, len, ref;
        css_values = ['overflow', 'overflow-y'];
        hasOverFlow = function(el) {
          var css_value, i, len, ref;
          for (i = 0, len = css_values.length; i < len; i++) {
            css_value = css_values[i];
            if ((ref = $.css(el, css_value)) === 'auto' || ref === 'scroll') {
              return true;
            }
          }
          return false;
        };
        if (hasOverFlow(_this.tree_widget.$el[0])) {
          return _this.tree_widget.$el;
        }
        ref = _this.tree_widget.$el.parents();
        for (i = 0, len = ref.length; i < len; i++) {
          el = ref[i];
          if (hasOverFlow(el)) {
            return $(el);
          }
        }
        return null;
      };
    })(this);
    setDocumentAsScrollParent = (function(_this) {
      return function() {
        _this.scroll_parent_top = 0;
        return _this.$scroll_parent = null;
      };
    })(this);
    if (this.tree_widget.$el.css('position') === 'fixed') {
      setDocumentAsScrollParent();
    }
    $scroll_parent = getParentWithOverflow();
    if ($scroll_parent && $scroll_parent.length && $scroll_parent[0].tagName !== 'HTML') {
      this.$scroll_parent = $scroll_parent;
      this.scroll_parent_top = this.$scroll_parent.offset().top;
    } else {
      setDocumentAsScrollParent();
    }
    return this.is_initialized = true;
  };

  ScrollHandler.prototype._ensureInit = function() {
    if (!this.is_initialized) {
      return this._initScrollParent();
    }
  };

  ScrollHandler.prototype.checkScrolling = function() {
    var hovered_area;
    this._ensureInit();
    hovered_area = this.tree_widget.dnd_handler.hovered_area;
    if (hovered_area && hovered_area.top !== this.previous_top) {
      this.previous_top = hovered_area.top;
      if (this.$scroll_parent) {
        return this._handleScrollingWithScrollParent(hovered_area);
      } else {
        return this._handleScrollingWithDocument(hovered_area);
      }
    }
  };

  ScrollHandler.prototype._handleScrollingWithScrollParent = function(area) {
    var distance_bottom;
    distance_bottom = this.scroll_parent_top + this.$scroll_parent[0].offsetHeight - area.bottom;
    if (distance_bottom < 20) {
      this.$scroll_parent[0].scrollTop += 20;
      this.tree_widget.refreshHitAreas();
      return this.previous_top = -1;
    } else if ((area.top - this.scroll_parent_top) < 20) {
      this.$scroll_parent[0].scrollTop -= 20;
      this.tree_widget.refreshHitAreas();
      return this.previous_top = -1;
    }
  };

  ScrollHandler.prototype._handleScrollingWithDocument = function(area) {
    var distance_top;
    distance_top = area.top - $(document).scrollTop();
    if (distance_top < 20) {
      return $(document).scrollTop($(document).scrollTop() - 20);
    } else if ($(window).height() - (area.bottom - $(document).scrollTop()) < 20) {
      return $(document).scrollTop($(document).scrollTop() + 20);
    }
  };

  ScrollHandler.prototype.scrollTo = function(top) {
    var tree_top;
    this._ensureInit();
    if (this.$scroll_parent) {
      return this.$scroll_parent[0].scrollTop = top;
    } else {
      tree_top = this.tree_widget.$el.offset().top;
      return $(document).scrollTop(top + tree_top);
    }
  };

  ScrollHandler.prototype.isScrolledIntoView = function(element) {
    var $element, element_bottom, element_top, view_bottom, view_top;
    this._ensureInit();
    $element = $(element);
    if (this.$scroll_parent) {
      view_top = 0;
      view_bottom = this.$scroll_parent.height();
      element_top = $element.offset().top - this.scroll_parent_top;
      element_bottom = element_top + $element.height();
    } else {
      view_top = $(window).scrollTop();
      view_bottom = view_top + $(window).height();
      element_top = $element.offset().top;
      element_bottom = element_top + $element.height();
    }
    return (element_bottom <= view_bottom) && (element_top >= view_top);
  };

  return ScrollHandler;

})();

module.exports = ScrollHandler;

},{}],9:[function(require,module,exports){
var $, SelectNodeHandler;

$ = jQuery;

SelectNodeHandler = (function() {
  function SelectNodeHandler(tree_widget) {
    this.tree_widget = tree_widget;
    this.clear();
  }

  SelectNodeHandler.prototype.getSelectedNode = function() {
    var selected_nodes;
    selected_nodes = this.getSelectedNodes();
    if (selected_nodes.length) {
      return selected_nodes[0];
    } else {
      return false;
    }
  };

  SelectNodeHandler.prototype.getSelectedNodes = function() {
    var id, node, selected_nodes;
    if (this.selected_single_node) {
      return [this.selected_single_node];
    } else {
      selected_nodes = [];
      for (id in this.selected_nodes) {
        node = this.tree_widget.getNodeById(id);
        if (node) {
          selected_nodes.push(node);
        }
      }
      return selected_nodes;
    }
  };

  SelectNodeHandler.prototype.getSelectedNodesUnder = function(parent) {
    var id, node, selected_nodes;
    if (this.selected_single_node) {
      if (parent.isParentOf(this.selected_single_node)) {
        return [this.selected_single_node];
      } else {
        return [];
      }
    } else {
      selected_nodes = [];
      for (id in this.selected_nodes) {
        node = this.tree_widget.getNodeById(id);
        if (node && parent.isParentOf(node)) {
          selected_nodes.push(node);
        }
      }
      return selected_nodes;
    }
  };

  SelectNodeHandler.prototype.isNodeSelected = function(node) {
    if (node.id) {
      return this.selected_nodes[node.id];
    } else if (this.selected_single_node) {
      return this.selected_single_node.element === node.element;
    } else {
      return false;
    }
  };

  SelectNodeHandler.prototype.clear = function() {
    this.selected_nodes = {};
    return this.selected_single_node = null;
  };

  SelectNodeHandler.prototype.removeFromSelection = function(node, include_children) {
    if (include_children == null) {
      include_children = false;
    }
    if (!node.id) {
      if (this.selected_single_node && node.element === this.selected_single_node.element) {
        return this.selected_single_node = null;
      }
    } else {
      delete this.selected_nodes[node.id];
      if (include_children) {
        return node.iterate((function(_this) {
          return function(n) {
            delete _this.selected_nodes[node.id];
            return true;
          };
        })(this));
      }
    }
  };

  SelectNodeHandler.prototype.addToSelection = function(node) {
    if (node.id) {
      return this.selected_nodes[node.id] = true;
    } else {
      return this.selected_single_node = node;
    }
  };

  return SelectNodeHandler;

})();

module.exports = SelectNodeHandler;

},{}],10:[function(require,module,exports){

/*
Copyright 2013 Marco Braak

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
var $, SimpleWidget,
  slice = [].slice;

$ = jQuery;

SimpleWidget = (function() {
  SimpleWidget.prototype.defaults = {};

  function SimpleWidget(el, options) {
    this.$el = $(el);
    this.options = $.extend({}, this.defaults, options);
  }

  SimpleWidget.prototype.destroy = function() {
    return this._deinit();
  };

  SimpleWidget.prototype._init = function() {
    return null;
  };

  SimpleWidget.prototype._deinit = function() {
    return null;
  };

  SimpleWidget.register = function(widget_class, widget_name) {
    var callFunction, createWidget, destroyWidget, getDataKey, getWidgetData;
    getDataKey = function() {
      return "simple_widget_" + widget_name;
    };
    getWidgetData = function(el, data_key) {
      var widget;
      widget = $.data(el, data_key);
      if (widget && (widget instanceof SimpleWidget)) {
        return widget;
      } else {
        return null;
      }
    };
    createWidget = function($el, options) {
      var data_key, el, existing_widget, i, len, widget;
      data_key = getDataKey();
      for (i = 0, len = $el.length; i < len; i++) {
        el = $el[i];
        existing_widget = getWidgetData(el, data_key);
        if (!existing_widget) {
          widget = new widget_class(el, options);
          if (!$.data(el, data_key)) {
            $.data(el, data_key, widget);
          }
          widget._init();
        }
      }
      return $el;
    };
    destroyWidget = function($el) {
      var data_key, el, i, len, results, widget;
      data_key = getDataKey();
      results = [];
      for (i = 0, len = $el.length; i < len; i++) {
        el = $el[i];
        widget = getWidgetData(el, data_key);
        if (widget) {
          widget.destroy();
        }
        results.push($.removeData(el, data_key));
      }
      return results;
    };
    callFunction = function($el, function_name, args) {
      var el, i, len, result, widget, widget_function;
      result = null;
      for (i = 0, len = $el.length; i < len; i++) {
        el = $el[i];
        widget = $.data(el, getDataKey());
        if (widget && (widget instanceof SimpleWidget)) {
          widget_function = widget[function_name];
          if (widget_function && (typeof widget_function === 'function')) {
            result = widget_function.apply(widget, args);
          }
        }
      }
      return result;
    };
    return $.fn[widget_name] = function() {
      var $el, args, argument1, function_name, options;
      argument1 = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      $el = this;
      if (argument1 === void 0 || typeof argument1 === 'object') {
        options = argument1;
        return createWidget($el, options);
      } else if (typeof argument1 === 'string' && argument1[0] !== '_') {
        function_name = argument1;
        if (function_name === 'destroy') {
          return destroyWidget($el);
        } else if (function_name === 'get_widget_class') {
          return widget_class;
        } else {
          return callFunction($el, function_name, args);
        }
      }
    };
  };

  return SimpleWidget;

})();

module.exports = SimpleWidget;

},{}],11:[function(require,module,exports){
var $, BorderDropHint, DragAndDropHandler, DragElement, ElementsRenderer, FolderElement, GhostDropHint, HitAreasGenerator, JqTreeWidget, KeyHandler, MouseWidget, Node, NodeElement, Position, SaveStateHandler, ScrollHandler, SelectNodeHandler, SimpleWidget, __version__, node_module, ref, ref1, util_module,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

__version__ = require('./version');

ref = require('./drag_and_drop_handler'), DragAndDropHandler = ref.DragAndDropHandler, DragElement = ref.DragElement, HitAreasGenerator = ref.HitAreasGenerator;

ElementsRenderer = require('./elements_renderer');

KeyHandler = require('./key_handler');

MouseWidget = require('./mouse.widget');

SaveStateHandler = require('./save_state_handler');

ScrollHandler = require('./scroll_handler');

SelectNodeHandler = require('./select_node_handler');

SimpleWidget = require('./simple.widget');

node_module = require('./node');

Node = node_module.Node;

Position = node_module.Position;

util_module = require('./util');

ref1 = require('./node_element'), BorderDropHint = ref1.BorderDropHint, FolderElement = ref1.FolderElement, GhostDropHint = ref1.GhostDropHint, NodeElement = ref1.NodeElement;

$ = jQuery;

JqTreeWidget = (function(superClass) {
  extend(JqTreeWidget, superClass);

  function JqTreeWidget() {
    return JqTreeWidget.__super__.constructor.apply(this, arguments);
  }

  JqTreeWidget.prototype.BorderDropHint = BorderDropHint;

  JqTreeWidget.prototype.DragElement = DragElement;

  JqTreeWidget.prototype.DragAndDropHandler = DragAndDropHandler;

  JqTreeWidget.prototype.ElementsRenderer = ElementsRenderer;

  JqTreeWidget.prototype.GhostDropHint = GhostDropHint;

  JqTreeWidget.prototype.HitAreasGenerator = HitAreasGenerator;

  JqTreeWidget.prototype.Node = Node;

  JqTreeWidget.prototype.SaveStateHandler = SaveStateHandler;

  JqTreeWidget.prototype.ScrollHandler = ScrollHandler;

  JqTreeWidget.prototype.SelectNodeHandler = SelectNodeHandler;

  JqTreeWidget.prototype.defaults = {
    autoOpen: false,
    saveState: false,
    dragAndDrop: false,
    selectable: true,
    useContextMenu: true,
    onCanSelectNode: null,
    onSetStateFromStorage: null,
    onGetStateFromStorage: null,
    onCreateLi: null,
    onIsMoveHandle: null,
    onCanMove: null,
    onCanMoveTo: null,
    onLoadFailed: null,
    autoEscape: true,
    dataUrl: null,
    closedIcon: null,
    openedIcon: '&#x25bc;',
    slide: true,
    nodeClass: Node,
    dataFilter: null,
    keyboardSupport: true,
    openFolderDelay: 500,
    rtl: null,
    onDragMove: null,
    onDragStop: null,
    buttonLeft: true
  };

  JqTreeWidget.prototype.toggle = function(node, slide) {
    if (slide == null) {
      slide = null;
    }
    if (slide === null) {
      slide = this.options.slide;
    }
    if (node.is_open) {
      this.closeNode(node, slide);
    } else {
      this.openNode(node, slide);
    }
    return this.element;
  };

  JqTreeWidget.prototype.getTree = function() {
    return this.tree;
  };

  JqTreeWidget.prototype.selectNode = function(node) {
    this._selectNode(node, false);
    return this.element;
  };

  JqTreeWidget.prototype._selectNode = function(node, must_toggle) {
    var canSelect, deselected_node, openParents, saveState;
    if (must_toggle == null) {
      must_toggle = false;
    }
    if (!this.select_node_handler) {
      return;
    }
    canSelect = (function(_this) {
      return function() {
        if (_this.options.onCanSelectNode) {
          return _this.options.selectable && _this.options.onCanSelectNode(node);
        } else {
          return _this.options.selectable;
        }
      };
    })(this);
    openParents = (function(_this) {
      return function() {
        var parent;
        parent = node.parent;
        if (parent && parent.parent && !parent.is_open) {
          return _this.openNode(parent, false);
        }
      };
    })(this);
    saveState = (function(_this) {
      return function() {
        if (_this.options.saveState) {
          return _this.save_state_handler.saveState();
        }
      };
    })(this);
    if (!node) {
      this._deselectCurrentNode();
      saveState();
      return;
    }
    if (!canSelect()) {
      return;
    }
    if (this.select_node_handler.isNodeSelected(node)) {
      if (must_toggle) {
        this._deselectCurrentNode();
        this._triggerEvent('tree.select', {
          node: null,
          previous_node: node
        });
      }
    } else {
      deselected_node = this.getSelectedNode();
      this._deselectCurrentNode();
      this.addToSelection(node);
      this._triggerEvent('tree.select', {
        node: node,
        deselected_node: deselected_node
      });
      openParents();
    }
    return saveState();
  };

  JqTreeWidget.prototype.getSelectedNode = function() {
    if (this.select_node_handler) {
      return this.select_node_handler.getSelectedNode();
    } else {
      return null;
    }
  };

  JqTreeWidget.prototype.toJson = function() {
    return JSON.stringify(this.tree.getData());
  };

  JqTreeWidget.prototype.loadData = function(data, parent_node) {
    this._loadData(data, parent_node);
    return this.element;
  };


  /*
  signatures:
  - loadDataFromUrl(url, parent_node=null, on_finished=null)
      loadDataFromUrl('/my_data');
      loadDataFromUrl('/my_data', node1);
      loadDataFromUrl('/my_data', node1, function() { console.log('finished'); });
      loadDataFromUrl('/my_data', null, function() { console.log('finished'); });
  
  - loadDataFromUrl(parent_node=null, on_finished=null)
      loadDataFromUrl();
      loadDataFromUrl(node1);
      loadDataFromUrl(null, function() { console.log('finished'); });
      loadDataFromUrl(node1, function() { console.log('finished'); });
   */

  JqTreeWidget.prototype.loadDataFromUrl = function(param1, param2, param3) {
    if ($.type(param1) === 'string') {
      this._loadDataFromUrl(param1, param2, param3);
    } else {
      this._loadDataFromUrl(null, param1, param2);
    }
    return this.element;
  };

  JqTreeWidget.prototype.reload = function(on_finished) {
    this._loadDataFromUrl(null, null, on_finished);
    return this.element;
  };

  JqTreeWidget.prototype._loadDataFromUrl = function(url_info, parent_node, on_finished) {
    var $el, addLoadingClass, handeLoadData, loadDataFromUrlInfo, parseUrlInfo, removeLoadingClass;
    $el = null;
    addLoadingClass = (function(_this) {
      return function() {
        if (parent_node) {
          $el = $(parent_node.element);
        } else {
          $el = _this.element;
        }
        return $el.addClass('jqtree-loading');
      };
    })(this);
    removeLoadingClass = function() {
      if ($el) {
        return $el.removeClass('jqtree-loading');
      }
    };
    parseUrlInfo = function() {
      if ($.type(url_info) === 'string') {
        url_info = {
          url: url_info
        };
      }
      if (!url_info.method) {
        return url_info.method = 'get';
      }
    };
    handeLoadData = (function(_this) {
      return function(data) {
        removeLoadingClass();
        _this._loadData(data, parent_node);
        if (on_finished && $.isFunction(on_finished)) {
          return on_finished();
        }
      };
    })(this);
    loadDataFromUrlInfo = (function(_this) {
      return function() {
        parseUrlInfo();
        return $.ajax({
          url: url_info.url,
          data: url_info.data,
          type: url_info.method.toUpperCase(),
          cache: false,
          dataType: 'json',
          success: function(response) {
            var data;
            if ($.isArray(response) || typeof response === 'object') {
              data = response;
            } else {
              data = $.parseJSON(response);
            }
            if (_this.options.dataFilter) {
              data = _this.options.dataFilter(data);
            }
            return handeLoadData(data);
          },
          error: function(response) {
            removeLoadingClass();
            if (_this.options.onLoadFailed) {
              return _this.options.onLoadFailed(response);
            }
          }
        });
      };
    })(this);
    if (!url_info) {
      url_info = this._getDataUrlInfo(parent_node);
    }
    addLoadingClass();
    if (!url_info) {
      removeLoadingClass();
    } else if ($.isArray(url_info)) {
      handeLoadData(url_info);
    } else {
      loadDataFromUrlInfo();
    }
  };

  JqTreeWidget.prototype._loadData = function(data, parent_node) {
    var deselectNodes, loadSubtree;
    if (parent_node == null) {
      parent_node = null;
    }
    deselectNodes = (function(_this) {
      return function() {
        var i, len, n, selected_nodes_under_parent;
        if (_this.select_node_handler) {
          selected_nodes_under_parent = _this.select_node_handler.getSelectedNodesUnder(parent_node);
          for (i = 0, len = selected_nodes_under_parent.length; i < len; i++) {
            n = selected_nodes_under_parent[i];
            _this.select_node_handler.removeFromSelection(n);
          }
        }
        return null;
      };
    })(this);
    loadSubtree = (function(_this) {
      return function() {
        parent_node.loadFromData(data);
        parent_node.load_on_demand = false;
        parent_node.is_loading = false;
        return _this._refreshElements(parent_node);
      };
    })(this);
    if (!data) {
      return;
    }
    this._triggerEvent('tree.load_data', {
      tree_data: data
    });
    if (!parent_node) {
      this._initTree(data);
    } else {
      deselectNodes();
      loadSubtree();
    }
    if (this.isDragging()) {
      return this.dnd_handler.refresh();
    }
  };

  JqTreeWidget.prototype.getNodeById = function(node_id) {
    return this.tree.getNodeById(node_id);
  };

  JqTreeWidget.prototype.getNodeByName = function(name) {
    return this.tree.getNodeByName(name);
  };

  JqTreeWidget.prototype.getNodesByProperty = function(key, value) {
    return this.tree.getNodesByProperty(key, value);
  };

  JqTreeWidget.prototype.openNode = function(node, slide) {
    if (slide == null) {
      slide = null;
    }
    if (slide === null) {
      slide = this.options.slide;
    }
    this._openNode(node, slide);
    return this.element;
  };

  JqTreeWidget.prototype._openNode = function(node, slide, on_finished) {
    var doOpenNode, parent;
    if (slide == null) {
      slide = true;
    }
    doOpenNode = (function(_this) {
      return function(_node, _slide, _on_finished) {
        var folder_element;
        folder_element = new FolderElement(_node, _this);
        return folder_element.open(_on_finished, _slide);
      };
    })(this);
    if (node.isFolder()) {
      if (node.load_on_demand) {
        return this._loadFolderOnDemand(node, slide, on_finished);
      } else {
        parent = node.parent;
        while (parent) {
          if (parent.parent) {
            doOpenNode(parent, false, null);
          }
          parent = parent.parent;
        }
        doOpenNode(node, slide, on_finished);
        return this._saveState();
      }
    }
  };

  JqTreeWidget.prototype._loadFolderOnDemand = function(node, slide, on_finished) {
    if (slide == null) {
      slide = true;
    }
    node.is_loading = true;
    return this._loadDataFromUrl(null, node, (function(_this) {
      return function() {
        return _this._openNode(node, slide, on_finished);
      };
    })(this));
  };

  JqTreeWidget.prototype.closeNode = function(node, slide) {
    if (slide == null) {
      slide = null;
    }
    if (slide === null) {
      slide = this.options.slide;
    }
    if (node.isFolder()) {
      new FolderElement(node, this).close(slide);
      this._saveState();
    }
    return this.element;
  };

  JqTreeWidget.prototype.isDragging = function() {
    if (this.dnd_handler) {
      return this.dnd_handler.is_dragging;
    } else {
      return false;
    }
  };

  JqTreeWidget.prototype.refreshHitAreas = function() {
    this.dnd_handler.refresh();
    return this.element;
  };

  JqTreeWidget.prototype.addNodeAfter = function(new_node_info, existing_node) {
    var new_node;
    new_node = existing_node.addAfter(new_node_info);
    this._refreshElements(existing_node.parent);
    return new_node;
  };

  JqTreeWidget.prototype.addNodeBefore = function(new_node_info, existing_node) {
    var new_node;
    new_node = existing_node.addBefore(new_node_info);
    this._refreshElements(existing_node.parent);
    return new_node;
  };

  JqTreeWidget.prototype.addParentNode = function(new_node_info, existing_node) {
    var new_node;
    new_node = existing_node.addParent(new_node_info);
    this._refreshElements(new_node.parent);
    return new_node;
  };

  JqTreeWidget.prototype.removeNode = function(node) {
    var parent;
    parent = node.parent;
    if (parent) {
      this.select_node_handler.removeFromSelection(node, true);
      node.remove();
      this._refreshElements(parent);
    }
    return this.element;
  };

  JqTreeWidget.prototype.appendNode = function(new_node_info, parent_node) {
    var node;
    parent_node = parent_node || this.tree;
    node = parent_node.append(new_node_info);
    this._refreshElements(parent_node);
    return node;
  };

  JqTreeWidget.prototype.prependNode = function(new_node_info, parent_node) {
    var node;
    if (!parent_node) {
      parent_node = this.tree;
    }
    node = parent_node.prepend(new_node_info);
    this._refreshElements(parent_node);
    return node;
  };

  JqTreeWidget.prototype.updateNode = function(node, data) {
    var id_is_changed;
    id_is_changed = data.id && data.id !== node.id;
    if (id_is_changed) {
      this.tree.removeNodeFromIndex(node);
    }
    node.setData(data);
    if (id_is_changed) {
      this.tree.addNodeToIndex(node);
    }
    this.renderer.renderFromNode(node);
    this._selectCurrentNode();
    return this.element;
  };

  JqTreeWidget.prototype.moveNode = function(node, target_node, position) {
    var position_index;
    position_index = Position.nameToIndex(position);
    this.tree.moveNode(node, target_node, position_index);
    this._refreshElements();
    return this.element;
  };

  JqTreeWidget.prototype.getStateFromStorage = function() {
    return this.save_state_handler.getStateFromStorage();
  };

  JqTreeWidget.prototype.addToSelection = function(node) {
    if (node) {
      this.select_node_handler.addToSelection(node);
      this._getNodeElementForNode(node).select();
      this._saveState();
    }
    return this.element;
  };

  JqTreeWidget.prototype.getSelectedNodes = function() {
    return this.select_node_handler.getSelectedNodes();
  };

  JqTreeWidget.prototype.isNodeSelected = function(node) {
    return this.select_node_handler.isNodeSelected(node);
  };

  JqTreeWidget.prototype.removeFromSelection = function(node) {
    this.select_node_handler.removeFromSelection(node);
    this._getNodeElementForNode(node).deselect();
    this._saveState();
    return this.element;
  };

  JqTreeWidget.prototype.scrollToNode = function(node) {
    var $element, top;
    $element = $(node.element);
    top = $element.offset().top - this.$el.offset().top;
    this.scroll_handler.scrollTo(top);
    return this.element;
  };

  JqTreeWidget.prototype.getState = function() {
    return this.save_state_handler.getState();
  };

  JqTreeWidget.prototype.setState = function(state) {
    this.save_state_handler.setInitialState(state);
    this._refreshElements();
    return this.element;
  };

  JqTreeWidget.prototype.setOption = function(option, value) {
    this.options[option] = value;
    return this.element;
  };

  JqTreeWidget.prototype.moveDown = function() {
    if (this.key_handler) {
      this.key_handler.moveDown();
    }
    return this.element;
  };

  JqTreeWidget.prototype.moveUp = function() {
    if (this.key_handler) {
      this.key_handler.moveUp();
    }
    return this.element;
  };

  JqTreeWidget.prototype.getVersion = function() {
    return __version__;
  };

  JqTreeWidget.prototype._init = function() {
    JqTreeWidget.__super__._init.call(this);
    this.element = this.$el;
    this.mouse_delay = 300;
    this.is_initialized = false;
    this.options.rtl = this._getRtlOption();
    if (!this.options.closedIcon) {
      this.options.closedIcon = this._getDefaultClosedIcon();
    }
    this.renderer = new ElementsRenderer(this);
    if (SaveStateHandler != null) {
      this.save_state_handler = new SaveStateHandler(this);
    } else {
      this.options.saveState = false;
    }
    if (SelectNodeHandler != null) {
      this.select_node_handler = new SelectNodeHandler(this);
    }
    if (DragAndDropHandler != null) {
      this.dnd_handler = new DragAndDropHandler(this);
    } else {
      this.options.dragAndDrop = false;
    }
    if (ScrollHandler != null) {
      this.scroll_handler = new ScrollHandler(this);
    }
    if ((KeyHandler != null) && (SelectNodeHandler != null)) {
      this.key_handler = new KeyHandler(this);
    }
    this._initData();
    this.element.click($.proxy(this._click, this));
    this.element.dblclick($.proxy(this._dblclick, this));
    if (this.options.useContextMenu) {
      return this.element.bind('contextmenu', $.proxy(this._contextmenu, this));
    }
  };

  JqTreeWidget.prototype._deinit = function() {
    this.element.empty();
    this.element.unbind();
    if (this.key_handler) {
      this.key_handler.deinit();
    }
    this.tree = null;
    return JqTreeWidget.__super__._deinit.call(this);
  };

  JqTreeWidget.prototype._initData = function() {
    if (this.options.data) {
      return this._loadData(this.options.data);
    } else {
      return this._loadDataFromUrl(this._getDataUrlInfo());
    }
  };

  JqTreeWidget.prototype._getDataUrlInfo = function(node) {
    var data_url, getUrlFromString;
    data_url = this.options.dataUrl || this.element.data('url');
    getUrlFromString = (function(_this) {
      return function() {
        var data, selected_node_id, url_info;
        url_info = {
          url: data_url
        };
        if (node && node.id) {
          data = {
            node: node.id
          };
          url_info['data'] = data;
        } else {
          selected_node_id = _this._getNodeIdToBeSelected();
          if (selected_node_id) {
            data = {
              selected_node: selected_node_id
            };
            url_info['data'] = data;
          }
        }
        return url_info;
      };
    })(this);
    if ($.isFunction(data_url)) {
      return data_url(node);
    } else if ($.type(data_url) === 'string') {
      return getUrlFromString();
    } else {
      return data_url;
    }
  };

  JqTreeWidget.prototype._getNodeIdToBeSelected = function() {
    if (this.options.saveState) {
      return this.save_state_handler.getNodeIdToBeSelected();
    } else {
      return null;
    }
  };

  JqTreeWidget.prototype._initTree = function(data) {
    var doInit, must_load_on_demand;
    doInit = (function(_this) {
      return function() {
        if (!_this.is_initialized) {
          _this.is_initialized = true;
          return _this._triggerEvent('tree.init');
        }
      };
    })(this);
    this.tree = new this.options.nodeClass(null, true, this.options.nodeClass);
    if (this.select_node_handler) {
      this.select_node_handler.clear();
    }
    this.tree.loadFromData(data);
    must_load_on_demand = this._setInitialState();
    this._refreshElements();
    if (!must_load_on_demand) {
      return doInit();
    } else {
      return this._setInitialStateOnDemand(doInit);
    }
  };

  JqTreeWidget.prototype._setInitialState = function() {
    var autoOpenNodes, is_restored, must_load_on_demand, ref2, restoreState;
    restoreState = (function(_this) {
      return function() {
        var must_load_on_demand, state;
        if (!(_this.options.saveState && _this.save_state_handler)) {
          return [false, false];
        } else {
          state = _this.save_state_handler.getStateFromStorage();
          if (!state) {
            return [false, false];
          } else {
            must_load_on_demand = _this.save_state_handler.setInitialState(state);
            return [true, must_load_on_demand];
          }
        }
      };
    })(this);
    autoOpenNodes = (function(_this) {
      return function() {
        var max_level, must_load_on_demand;
        if (_this.options.autoOpen === false) {
          return false;
        }
        max_level = _this._getAutoOpenMaxLevel();
        must_load_on_demand = false;
        _this.tree.iterate(function(node, level) {
          if (node.load_on_demand) {
            must_load_on_demand = true;
            return false;
          } else if (!node.hasChildren()) {
            return false;
          } else {
            node.is_open = true;
            return level !== max_level;
          }
        });
        return must_load_on_demand;
      };
    })(this);
    ref2 = restoreState(), is_restored = ref2[0], must_load_on_demand = ref2[1];
    if (!is_restored) {
      must_load_on_demand = autoOpenNodes();
    }
    return must_load_on_demand;
  };

  JqTreeWidget.prototype._setInitialStateOnDemand = function(cb_finished) {
    var autoOpenNodes, restoreState;
    restoreState = (function(_this) {
      return function() {
        var state;
        if (!(_this.options.saveState && _this.save_state_handler)) {
          return false;
        } else {
          state = _this.save_state_handler.getStateFromStorage();
          if (!state) {
            return false;
          } else {
            _this.save_state_handler.setInitialStateOnDemand(state, cb_finished);
            return true;
          }
        }
      };
    })(this);
    autoOpenNodes = (function(_this) {
      return function() {
        var loadAndOpenNode, loading_count, max_level, openNodes;
        max_level = _this._getAutoOpenMaxLevel();
        loading_count = 0;
        loadAndOpenNode = function(node) {
          loading_count += 1;
          return _this._openNode(node, false, function() {
            loading_count -= 1;
            return openNodes();
          });
        };
        openNodes = function() {
          _this.tree.iterate(function(node, level) {
            if (node.load_on_demand) {
              if (!node.is_loading) {
                loadAndOpenNode(node);
              }
              return false;
            } else {
              _this._openNode(node, false);
              return level !== max_level;
            }
          });
          if (loading_count === 0) {
            return cb_finished();
          }
        };
        return openNodes();
      };
    })(this);
    if (!restoreState()) {
      return autoOpenNodes();
    }
  };

  JqTreeWidget.prototype._getAutoOpenMaxLevel = function() {
    if (this.options.autoOpen === true) {
      return -1;
    } else {
      return parseInt(this.options.autoOpen);
    }
  };


  /*
  Redraw the tree or part of the tree.
   * from_node: redraw this subtree
   */

  JqTreeWidget.prototype._refreshElements = function(from_node) {
    if (from_node == null) {
      from_node = null;
    }
    this.renderer.render(from_node);
    return this._triggerEvent('tree.refresh');
  };

  JqTreeWidget.prototype._click = function(e) {
    var click_target, event, node;
    click_target = this._getClickTarget(e.target);
    if (click_target) {
      if (click_target.type === 'button') {
        this.toggle(click_target.node, this.options.slide);
        e.preventDefault();
        return e.stopPropagation();
      } else if (click_target.type === 'label') {
        node = click_target.node;
        event = this._triggerEvent('tree.click', {
          node: node,
          click_event: e
        });
        if (!event.isDefaultPrevented()) {
          return this._selectNode(node, true);
        }
      }
    }
  };

  JqTreeWidget.prototype._dblclick = function(e) {
    var click_target;
    click_target = this._getClickTarget(e.target);
    if (click_target && click_target.type === 'label') {
      return this._triggerEvent('tree.dblclick', {
        node: click_target.node,
        click_event: e
      });
    }
  };

  JqTreeWidget.prototype._getClickTarget = function(element) {
    var $button, $el, $target, node;
    $target = $(element);
    $button = $target.closest('.jqtree-toggler');
    if ($button.length) {
      node = this._getNode($button);
      if (node) {
        return {
          type: 'button',
          node: node
        };
      }
    } else {
      $el = $target.closest('.jqtree-element');
      if ($el.length) {
        node = this._getNode($el);
        if (node) {
          return {
            type: 'label',
            node: node
          };
        }
      }
    }
    return null;
  };

  JqTreeWidget.prototype._getNode = function($element) {
    var $li;
    $li = $element.closest('li.jqtree_common');
    if ($li.length === 0) {
      return null;
    } else {
      return $li.data('node');
    }
  };

  JqTreeWidget.prototype._getNodeElementForNode = function(node) {
    if (node.isFolder()) {
      return new FolderElement(node, this);
    } else {
      return new NodeElement(node, this);
    }
  };

  JqTreeWidget.prototype._getNodeElement = function($element) {
    var node;
    node = this._getNode($element);
    if (node) {
      return this._getNodeElementForNode(node);
    } else {
      return null;
    }
  };

  JqTreeWidget.prototype._contextmenu = function(e) {
    var $div, node;
    $div = $(e.target).closest('ul.jqtree-tree .jqtree-element');
    if ($div.length) {
      node = this._getNode($div);
      if (node) {
        e.preventDefault();
        e.stopPropagation();
        this._triggerEvent('tree.contextmenu', {
          node: node,
          click_event: e
        });
        return false;
      }
    }
  };

  JqTreeWidget.prototype._saveState = function() {
    if (this.options.saveState) {
      return this.save_state_handler.saveState();
    }
  };

  JqTreeWidget.prototype._mouseCapture = function(position_info) {
    if (this.options.dragAndDrop) {
      return this.dnd_handler.mouseCapture(position_info);
    } else {
      return false;
    }
  };

  JqTreeWidget.prototype._mouseStart = function(position_info) {
    if (this.options.dragAndDrop) {
      return this.dnd_handler.mouseStart(position_info);
    } else {
      return false;
    }
  };

  JqTreeWidget.prototype._mouseDrag = function(position_info) {
    var result;
    if (this.options.dragAndDrop) {
      result = this.dnd_handler.mouseDrag(position_info);
      if (this.scroll_handler) {
        this.scroll_handler.checkScrolling();
      }
      return result;
    } else {
      return false;
    }
  };

  JqTreeWidget.prototype._mouseStop = function(position_info) {
    if (this.options.dragAndDrop) {
      return this.dnd_handler.mouseStop(position_info);
    } else {
      return false;
    }
  };

  JqTreeWidget.prototype._triggerEvent = function(event_name, values) {
    var event;
    event = $.Event(event_name);
    $.extend(event, values);
    this.element.trigger(event);
    return event;
  };

  JqTreeWidget.prototype.testGenerateHitAreas = function(moving_node) {
    this.dnd_handler.current_item = this._getNodeElementForNode(moving_node);
    this.dnd_handler.generateHitAreas();
    return this.dnd_handler.hit_areas;
  };

  JqTreeWidget.prototype._selectCurrentNode = function() {
    var node, node_element;
    node = this.getSelectedNode();
    if (node) {
      node_element = this._getNodeElementForNode(node);
      if (node_element) {
        return node_element.select();
      }
    }
  };

  JqTreeWidget.prototype._deselectCurrentNode = function() {
    var node;
    node = this.getSelectedNode();
    if (node) {
      return this.removeFromSelection(node);
    }
  };

  JqTreeWidget.prototype._getDefaultClosedIcon = function() {
    if (this.options.rtl) {
      return '&#x25c0;';
    } else {
      return '&#x25ba;';
    }
  };

  JqTreeWidget.prototype._getRtlOption = function() {
    var data_rtl;
    if (this.options.rtl !== null) {
      return this.options.rtl;
    } else {
      data_rtl = this.element.data('rtl');
      if ((data_rtl != null) && data_rtl !== false) {
        return true;
      } else {
        return false;
      }
    }
  };

  return JqTreeWidget;

})(MouseWidget);

JqTreeWidget.getModule = function(name) {
  var modules;
  modules = {
    'node': node_module,
    'util': util_module
  };
  return modules[name];
};

SimpleWidget.register(JqTreeWidget, 'tree');

},{"./drag_and_drop_handler":1,"./elements_renderer":2,"./key_handler":3,"./mouse.widget":4,"./node":5,"./node_element":6,"./save_state_handler":7,"./scroll_handler":8,"./select_node_handler":9,"./simple.widget":10,"./util":12,"./version":13}],12:[function(require,module,exports){
var _indexOf, getBoolString, html_escape, indexOf, isInt;

_indexOf = function(array, item) {
  var i, j, len, value;
  for (i = j = 0, len = array.length; j < len; i = ++j) {
    value = array[i];
    if (value === item) {
      return i;
    }
  }
  return -1;
};

indexOf = function(array, item) {
  if (array.indexOf) {
    return array.indexOf(item);
  } else {
    return _indexOf(array, item);
  }
};

isInt = function(n) {
  return typeof n === 'number' && n % 1 === 0;
};

html_escape = function(string) {
  return ('' + string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');
};

getBoolString = function(value) {
  if (value) {
    return 'true';
  } else {
    return 'false';
  }
};

module.exports = {
  _indexOf: _indexOf,
  getBoolString: getBoolString,
  html_escape: html_escape,
  indexOf: indexOf,
  isInt: isInt
};

},{}],13:[function(require,module,exports){
module.exports = '1.3.0';

},{}]},{},[11]);
