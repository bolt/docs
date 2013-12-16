Locales
=======

In the `config.yml`-file you can set the Locale to be used by Bolt. A locale is
a set of parameters that defines the used language, country and any special
variant preferences that are used in Bolt's frontend.

Currently, the locale settings are only used for date formatting on the Frontend
and Backend of your site, but we're looking into adding localization features
for other parts of the Frontend and the Backend as well.

The Locale setting is defined in the `config.yml`-file like this:

<pre class="brush:plain">
locale: en_GB
</pre>

As you can see, the locale consists of two parts: The language part, and the
country part. In some cases the codes are the same, like `nl_NL` for
Dutch/Netherlands. In other cases they are different, like `en_US` for
English/United States. Which values are supported depends on your server
settings, so you might have to try which setting works best for you. Some common
options are:

<pre class="brush:plain">
    Locale   Language             Country  
    en_US    English              United States                              en   US  
    en_GB    English              Great Britain                              en   GB  
    it_IT    Italian              Italy                                      it   IT  
    es_ES    Spanish              Spain                                      es   ES  
    da_DK    Danish               Denmark                                    da   DK  
    de_DE    German               Germany                                    de   DE  
    el_GR    Greek                Greece                                     el   GR  
    fr_FR    French               France                                     fr   FR  
    it_IT    Italian              Italy                                      it   IT  
    nl_NL    Dutch                Netherlands                                nl   NL  
    nb_NO    Norwegian Bokmål     Norway                                     nb   NO  
    pl_PL    Polish               Poland                                     pl   PL  
    pt_PT    Portuguese           Portugal                                   pt   PT  
    ru_RU    Russian              Russian Federation                         ru   RU  
    sv_SE    Swedish              Sweden                                     sv   SE  
</pre>

A much longer list of possible options can be found here: 
[List of Locales, languages and countrycodes](https://github.com/bobdenotter/locales/blob/master/locales_list.txt).

Bolt's `localdate()` function and filter uses the setting from `config.yml` to
set the language for the date formatting. For an overview of the options, see
php.net's [strftime page](http://php.net/strftime), and the documentation
section on [localdate()](/templatetags#filter-localdate).
