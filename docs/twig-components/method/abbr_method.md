# abbr_method

`abbr_method` is a Twig filter to generate an <abbr> element using the FQCN::method() syntax. If method is Closure,
Closure will be used instead and if method doesn’t have a class name, it’s shown as a function (method()).

`{{ method|abbr_method }}
`

Source: [Twig](https://twig.symfony.com/abbr_method)