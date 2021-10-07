---
title: Locales
---
Locales
=======

In the `services.yaml` file  you can configure Bolt's locale settings.
A locale is a set of parameters that defines the used language, country 
and any special variant preferences that are used in Bolt's frontend.

The locale settings are used to:
* configure the allowed interface languages for the Bolt backend user

* configure the allowed languages for Content Types and fields

* configure the default language for fields

The default locale is configured in the `services.yaml` file like this:
```yaml
parameters:
    locale: 'en_US'
```

To allow backend users (editors) to choose a language for their interface,
and/or to add localizable fields and content types, you must ensure that
the locales you want to use are defined in the `services.yaml` file like this:
```yaml
parameters:
    # This parameter defines the codes of the locales (languages) enabled in the application
    app_locales: en|en_US|nl # This allows general English, US English and general Dutch
```


As you can see, the locale consists of two parts: The language part, and the
country part. In some cases the codes are the same, like `nl_NL` for
Dutch/Netherlands. In other cases they are different, like `en_US` for
English/United States. Which values are supported depends on your server
settings, so you might have to try which setting works best for you. Some
common options are:

```
Locale   Language             Country
en_US    English              United States                    en   US
en_GB    English              Great Britain                    en   GB
it_IT    Italian              Italy                            it   IT
es_ES    Spanish              Spain                            es   ES
da_DK    Danish               Denmark                          da   DK
de_DE    German               Germany                          de   DE
el_GR    Greek                Greece                           el   GR
fr_FR    French               France                           fr   FR
it_IT    Italian              Italy                            it   IT
nl_NL    Dutch                Netherlands                      nl   NL
nb_NO    Norwegian Bokmål     Norway                           nb   NO
pl_PL    Polish               Poland                           pl   PL
pt_PT    Portuguese           Portugal                         pt   PT
ru_RU    Russian              Russian Federation               ru   RU
sv_SE    Swedish              Sweden                           sv   SE
```

A much longer list of possible options can be found here:
[List of Locales, languages and countrycodes](https://github.com/bobdenotter/locales/blob/master/locales_list.txt).

Bolt's `localdate()` function and filter uses the setting from `services.yaml` to
set the language for the date formatting. For an overview of the options check our
documentation for [localdate()](../twig-components/filters#localdate).
