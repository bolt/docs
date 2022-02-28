---
title: Twig Components
pages:
    - tags
    - functions
    - filters
    - variables
    - tests
    - extras
    - menu
    - fields
    - pagination
    - languageselect
    - method
---

Twig tags, functions & filters
==============================

As mentioned before, a template in Bolt can use all of the standard Twig tags,
function, filters, tests & operators, with a few additions that are specific to
working with Bolt. If you're not familiar with Twig yet, you should read
"[Twig for Template Designers][twig]", on the official Twig website.

## Function

### Twig (built-in)

- [asset_version(path, packageName = null)](twig-components/method/asset_version)  <small>(Twig)</small>
- [asset(path, packageName = null)](twig-components/method/asset)  <small>(Twig)</small>
- [attribute](twig-components/method/attribute)  <small>(Twig)</small>
- [block](twig-components/method/block)  <small>(Twig)</small>
- [constant](twig-components/method/constant)  <small>(Twig)</small>
- [constant(constant, object = null)](twig-components/method/constant)  <small>(Twig)</small>
- [country_timezones](twig-components/method/country_timezones)  <small>(Twig)</small>
- [country_timezones(country)](twig-components/method/country_timezones)  <small>(Twig)</small>
- [csrf_token(tokenId)](twig-components/method/csrf_token)  <small>(Twig)</small>
- [cycle](twig-components/method/cycle)  <small>(Twig)</small>
- [cycle(values, position)](twig-components/method/cycle)  <small>(Twig)</small>
- [date](twig-components/method/date)  <small>(Twig)</small>
- [date(date = null, timezone = null)](twig-components/method/date)  <small>(Twig)</small>
- [dump](twig-components/method/dump)  <small>(Twig)</small>
- [encore_entry_css_files(entryName, entrypointName = "_default")](twig-components/method/encore_entry_css_files)  <small>(Twig)</small>
- [encore_entry_js_files(entryName, entrypointName = "_default")](twig-components/method/encore_entry_js_files)  <small>(Twig)</small>
- [encore_entry_link_tags(entryName, packageName = null, entrypointName = "_default", attributes = [])](twig-components/method/encore_entry_link_tags)  <small>(Twig)</small>
- [encore_entry_script_tags(entryName, packageName = null, entrypointName = "_default", attributes = [])](twig-components/method/encore_entry_script_tags)  <small>(Twig)</small>
- [fragment_uri(controller, absolute = false, strict = true, sign = true)](twig-components/method/fragment_uri)  <small>(Twig)</small>
- [html_classes](twig-components/method/html_classes)  <small>(Twig)</small>
- [html_classes(args)](twig-components/method/html_classes)  <small>(Twig)</small>
- [impersonation_exit_path(exitTo = null)](twig-components/method/impersonation_exit_path)  <small>(Twig)</small>
- [impersonation_exit_url(exitTo = null)](twig-components/method/impersonation_exit_url)  <small>(Twig)</small>
- [include](twig-components/method/include)  <small>(Twig)</small>
- [include(template, variables = [], withContext = true, ignoreMissing = false, sandboxed = false)](twig-components/method/include)  <small>(Twig)</small>
- [is_granted(role, object = null, field = null)](twig-components/method/is_granted)  <small>(Twig)</small>
- [link(uri, rel, attributes = [])](twig-components/method/link)  <small>(Twig)</small>
- [logout_path(key = null)](twig-components/method/logout_path)  <small>(Twig)</small>
- [logout_url(key = null)](twig-components/method/logout_url)  <small>(Twig)</small>
- [max](twig-components/method/max)  <small>(Twig)</small>
- [max(args)](twig-components/method/max)  <small>(Twig)</small>
- [min(args)](twig-components/method/min)  <small>(Twig)</small>
- [parent](twig-components/method/parent)  <small>(Twig)</small>
- [random](twig-components/method/random)  <small>(Twig)</small>
- [range](twig-components/method/range)  <small>(Twig)</small>
- [source](twig-components/method/source)  <small>(Twig)</small>
- [template_from_string](twig-components/method/template_from_string)  <small>(Twig)</small>

### Bolt

- [__(id, parameters = [], domain = null, locale = null)](twig-components/method/__)  <small>(Bolt)</small>
- [absolute_link(link)](twig-components/method/absolute_link)  <small>(Bolt)</small>
- [absolute_url(path)](twig-components/method/absolute_url)  <small>(Bolt)</small>
- [admin_menu_array()](twig-components/method/admin_menu_array)  <small>(Bolt)</small>
- [backtrace(options = 2, limit = 25)](twig-components/method/backtrace)  <small>(Bolt)</small>
- [canonical(route = null, params = [])](twig-components/method/canonical)  <small>(Bolt)</small>
- [countwidgets(target)](twig-components/method/countwidgets)  <small>(Bolt)</small>
- [dump()](twig-components/method/dump)  <small>(Bolt)</small>
- [excerpt(content, length = 280, includeTitle = false, focus = null, wrap = false)](twig-components/method/excerpt)  <small>(Bolt)</small>
- [extension_exists(name)](twig-components/method/extension_exists)  <small>(Bolt)</small>
- [extensions()](twig-components/method/extensions)  <small>(Bolt)</small>
- [field_factory(name, definition = null)](twig-components/method/field_factory)  <small>(Forms)</small>
- [find_translations(entity, locale = null)](twig-components/method/find_translations)  <small>(Bolt)</small>
- [first_related_content(content, name = null, publishedOnly = true)](twig-components/method/first_related_content)  <small>(Bolt)</small>
- [flag(localeCode)](twig-components/method/flag)  <small>(Bolt)</small>
- [getuser(username = null, id = null, displayname = null, email = null)](twig-components/method/getuser)  <small>(Bolt)</small>
- [haswidgets(target)](twig-components/method/haswidgets)  <small>(Bolt)</small>
- [htmllang()](twig-components/method/htmllang)  <small>(Bolt)</small>
- [icon(record = null, icon = "question-circle")](twig-components/method/icon)  <small>(Bolt)</small>
- [knp_menu_get_breadcrumbs_array(menu, subItem = null)](twig-components/method/knp_menu_get_breadcrumbs_array)  <small>(KNP Menu)</small>
- [knp_menu_get_current_item(menu)](twig-components/method/knp_menu_get_current_item)  <small>(KNP Menu)</small>
- [knp_menu_get(menu, path = [], options = [])](twig-components/method/knp_menu_get)  <small>(KNP Menu)</small>
- [knp_menu_render(menu, options = [], renderer = null)](twig-components/method/knp_menu_render)  <small>(KNP Menu)</small>
- [list_templates(field)](twig-components/method/list_templates)  <small>(Bolt)</small>
- [listwidgets(target)](twig-components/method/listwidgets)  <small>(Bolt)</small>
- [locale(localeCode)](twig-components/method/locale)  <small>(Bolt)</small>
- [locales(localeCodes = null, all = false)](twig-components/method/locales)  <small>(Bolt)</small>
- [markdown(content)](twig-components/method/markdown)  <small>(Bolt)</small>
- [media(unknown?)](twig-components/method/media)  <small>(Bolt)</small>
- [menu_array(name = null)](twig-components/method/menu_array)  <small>(Bolt)</small>
- [menu(name = null, template = "helpers\/_menu.html.twig", class = "", withsubmenus = true)](twig-components/method/menu)  <small>(Bolt)</small>
- [pager(records = null, template = "@bolt\/helpers\/_pager_basic.html.twig", class = "pagination", surround = 3)](twig-components/method/pager)  <small>(Bolt)</small>
- [path(name, parameters = [], relative = false)](twig-components/method/path)  <small>(Bolt)</small>
- [popup(image, width = 320, height = 240)](twig-components/method/popup)  <small>(Bolt)</small>
- [previous_record(content, byColumn = "id", sameContentType = true)](twig-components/method/previous_record)  <small>(Bolt)</small>
- [redirect(path)](twig-components/method/redirect)  <small>(Bolt)</small>
- [related_content_by_type(content, bidirectional = true, limit = null, publishedOnly = true)](twig-components/method/related_content_by_type)  <small>(Bolt)</small>
- [related_content(content, name = null, bidirectional = true, limit = null, publishedOnly = true)](twig-components/method/related_content)  <small>(Bolt)</small>
- [relative_path(path)](twig-components/method/relative_path)  <small>(Bolt)</small>
- [select_options(field)](twig-components/method/select_options)  <small>(Bolt)</small>
- [showimage(image, width = null, height = null)](twig-components/method/showimage)  <small>(Bolt)</small>
- [source(name, ignoreMissing = false)](twig-components/method/source)  <small>Twig</small>
- [thumbnail(image, width = null, height = null, location = null, path = null, fit = null)](twig-components/method/thumbnail)  <small>(Bolt)</small>
- [url(name, parameters = [], schemeRelative = false)](twig-components/method/url)  <small>(Bolt)</small>
- [widget(name, params = [])](twig-components/method/widget)  <small>(Bolt)</small>
- [widgets(target, params = [])](twig-components/method/widgets)  <small>(Bolt)</small>

### Symfony

- [controller(controller, attributes = [], query = [])](twig-components/method/controller)  <small>(Symfony)</small>
- [dns_prefetch(uri, attributes = [])](twig-components/method/dns_prefetch)  <small>(Symfony)</small>
- [form_end(form_view, variables)](twig-components/method/form_end)  <small>(Symfony)</small>
- [form_errors(form_view)](twig-components/method/form_errors)  <small>(Symfony)</small>
- [form_help(form_view)](twig-components/method/form_help)  <small>(Symfony)</small>
- [form_label(form_view, label, variables)](twig-components/method/form_label)  <small>(Symfony)</small>
- [form_parent(form_view)](twig-components/method/form_parent)  <small>(Symfony)</small>
- [form_rest(form_view, variables)](twig-components/method/form_rest)  <small>(Symfony)</small>
- [form_row(form_view, variables)](twig-components/method/form_row)  <small>(Symfony)</small>
- [form_start(form_view, variables)](twig-components/method/form_start)  <small>(Symfony)</small>
- [form_widget(form_view, variables)](twig-components/method/form_widget)  <small>(Symfony)</small>
- [form(form_view, variables)](twig-components/method/form)  <small>(Symfony)</small>
- [preconnect(uri, attributes = [])](twig-components/method/preconnect)  <small>(Symfony)</small>
- [prefetch(uri, attributes = [])](twig-components/method/prefetch)  <small>(Symfony)</small>
- [preload(uri, attributes = [])](twig-components/method/preload)  <small>(Symfony)</small>
- [prerender(uri, attributes = [])](twig-components/method/prerender)  <small>(Symfony)</small>
- [render(uri, options = [])](twig-components/method/render)  <small>(Symfony)</small>
- [t(message, parameters = [], domain = null)](twig-components/method/t)  <small>(Symfony)</small>

## Filter

### Twig(built-in)

- [abbr_class](twig-components/method/abbr_class)  <small>(Twig)</small>
- [abbr_method](twig-components/method/abbr_method)  <small>(Twig)</small>
- [abs](twig-components/method/abs)  <small>(Twig)</small>
- [batch(size, fill = null, preserveKeys = true)](twig-components/method/batch)  <small>(Twig)</small>
- [capitalize](twig-components/method/capitalize)  <small>(Twig)</small>
- [column(name, index = null)](twig-components/method/column)  <small>(Twig)</small>
- [convert_encoding(to, from)](twig-components/method/convert_encoding)  <small>(Twig)</small>
- [country_name(locale = null)](twig-components/method/country_name)  <small>(Twig)</small>
- [currency_name(locale = null)](twig-components/method/currency_name)  <small>(Twig)</small>
- [currency_symbol(locale = null)](twig-components/method/currency_symbol)  <small>(Twig)</small>
- [data_uri(mime = null, parameters = [])](twig-components/method/data_uri)  <small>(Twig)</small>
- [date_modify(modifier)](twig-components/method/date_modify)  <small>(Twig)</small>
- [default(default = "")](twig-components/method/default)  <small>(Twig)</small>
- [e(strategy = "html", charset = null, autoescape = false)](twig-components/method/e)  <small>(Twig)</small>
- [escape(strategy = "html", charset = null, autoescape = false)](twig-components/method/escape)  <small>(Twig)</small>
- [feature](twig-components/method/feature)  <small>(Twig)</small>
- [filter(arrow)](twig-components/method/filter)  <small>(Twig)</small>
- [first](twig-components/method/first)  <small>(Twig)</small>
- [format_args](twig-components/method/format_args)  <small>(Twig)</small>
- [format_args_as_text](twig-components/method/format_args_as_text)  <small>(Twig)</small>
- [format_bytes(precision = 2)](twig-components/method/format_bytes)  <small>(Twig)</small>
- [format_currency(currency, attrs = [], locale = null)](twig-components/method/format_currency)  <small>(Twig)</small>
- [format_date(dateFormat = "medium", pattern = "", timezone = null, calendar = "gregorian", locale = null)](twig-components/method/format_date)  <small>(Twig)</small>
- [format_datetime(dateFormat = "medium", timeFormat = "medium", pattern = "", timezone = null, calendar = "gregorian", locale = null)](twig-components/method/format_datetime)  <small>(Twig)</small>
- [format_file_from_text](twig-components/method/format_file_from_text)  <small>(Twig)</small>
- [format_file(line, text = null)](twig-components/method/format_file)  <small>(Twig)</small>
- [format_number(attrs = [], style = "decimal", type = "default", locale = null)](twig-components/method/format_number)  <small>(Twig)</small>
- [format_time(timeFormat = "medium", pattern = "", timezone = null, calendar = "gregorian", locale = null)](twig-components/method/format_time)  <small>(Twig)</small>
- [format(args)](twig-components/method/format)  <small>(Twig)</small>
- [humanize](twig-components/method/humanize)  <small>(Twig)</small>
- [join(glue = "", and = null)](twig-components/method/join)  <small>(Twig)</small>
- [json_encode(options, depth)](twig-components/method/json_encode)  <small>(Twig)</small>
- [keys](twig-components/method/keys)  <small>(Twig)</small>
- [language_name(locale = null)](twig-components/method/language_name)  <small>(Twig)</small>
- [last](twig-components/method/last)  <small>(Twig)</small>
- [length](twig-components/method/length)  <small>(Twig)</small>
- [lower](twig-components/method/lower)  <small>(Twig)</small>
- [map(arrow)](twig-components/method/map)  <small>(Twig)</small>
- [merge(arr2)](twig-components/method/merge)  <small>(Twig)</small>
- [nl2br(is_xhtml)](twig-components/method/nl2br)  <small>(Twig)</small>
- [number_format(decimal = null, decimalPoint = null, thousandSep = null)](twig-components/method/number_format)  <small>(Twig)</small>
- [order(on = "-publishedAt", onSecondary = null, locale = null)](twig-components/method/order)  <small>(Twig)</small>
- [replace(from)](twig-components/method/replace)  <small>(Twig)</small>
- [reverse(preserveKeys = false)](twig-components/method/reverse)  <small>(Twig)</small>
- [round(precision = 0, method = "common")](twig-components/method/round)  <small>(Twig)</small>
- [serialize(format = "json", context = [])](twig-components/method/serialize)  <small>(Twig)</small>
- [shuffle](twig-components/method/shuffle)  <small>(Twig)</small>
- [slice(start, length = null, preserveKeys = false)](twig-components/method/slice)  <small>(Twig)</small>
- [sort(arrow = null)](twig-components/method/sort)  <small>(Twig)</small>
- [spaceless](twig-components/method/spaceless)  <small>(Twig)</small>
- [split(delimiter, limit = null)](twig-components/method/split)  <small>(Twig)</small>
- [timezone_name(locale = null)](twig-components/method/timezone_name)  <small>(Twig)</small>
- [upper](twig-components/method/upper)  <small>(Twig)</small>
- [yaml_dump(inline = 0, dumpObjects = 0)](twig-components/method/yaml_dump)  <small>(Twig)</small>
- [yaml_encode(inline = 0, dumpObjects = 0)](twig-components/method/yaml_encode)  <small>(Twig)</small>

### Bolt

- [allow_twig(unknown?)](twig-components/method/allow_twig)  <small>(Bolt)</small>
- [current](twig-components/method/current)  <small>(Bolt)</small>
- [date(format = null, timezone = null)](twig-components/method/date)  <small>(Bolt)</small>
- [edit_link](twig-components/method/edit_link)  <small>(Bolt)</small>
- [excerpt(length = 280, includeTitle = false, focus = null, wrap = false)](twig-components/method/excerpt)  <small>(Bolt)</small>
- [has_path(path)](twig-components/method/has_path)  <small>(Bolt)</small>
- [image(onlyValues = false)](twig-components/method/image)  <small>(Bolt)</small>
- [json_decode(assoc = false, depth = 512, options = 0)](twig-components/method/json_decode)  <small>(Bolt)</small>
- [json_records(includeDefinition = true, options = 0, locale = "")](twig-components/method/json_records)  <small>(Bolt)</small>
- [knp_menu_as_string(separator = " > ")](twig-components/method/knp_menu_as_string)  <small>(KNP Menu)</small>
- [label](twig-components/method/label)  <small>(Bolt)</small>
- [link(canonical = false, locale = null)](twig-components/method/link)  <small>(Bolt)</small>
- [localdate(format = null, locale = null, timezone = null)](twig-components/method/localdate)  <small>(Bolt)</small>
- [locale_name(locale = null)](twig-components/method/locale_name)  <small>(Bolt)</small>
- [markdown](twig-components/method/markdown)  <small>(Bolt)</small>
- [media](twig-components/method/media)  <small>(Bolt)</small>
- [next(byColumn = "id", sameContentType = true)](twig-components/method/next)  <small>(Bolt)</small>
- [next_record(content, byColumn = "id", sameContentType = true)](twig-components/method/next_record)  <small>(Bolt)</small>
- [normalize_records(locale = "")](twig-components/method/normalize_records)  <small>(Bolt)</small>
- [placeholders(replacements = [])](twig-components/method/placeholders)  <small>(Bolt)</small>
- [plaintext](twig-components/method/plaintext)  <small>(Bolt)</small>
- [popup(width = 320, height = 240)](twig-components/method/popup)  <small>(Bolt)</small>
- [previous(byColumn = "id", sameContentType = true)](twig-components/method/previous)  <small>(Bolt)</small>
- [related_by_type(bidirectional = true, limit = null, publishedOnly = true)](twig-components/method/related_by_type)  <small>(Bolt)</small>
- [related_first(name = null, publishedOnly = true)](twig-components/method/related_first)  <small>(Bolt)</small>
- [related(name = null, bidirectional = true, limit = null, publishedOnly = true)](twig-components/method/related)  <small>(Bolt)</small>
- [safestring(strict = false, extrachars = "")](twig-components/method/safestring)  <small>(Bolt)</small>
- [sanitise](twig-components/method/sanitise)  <small>(Bolt)</small>
- [selected(returnsingle = false, returnarray = false)](twig-components/method/selected)  <small>(Bolt)</small>
- [showimage(width = null, height = null)](twig-components/method/showimage)  <small>(Bolt)</small>
- [shy](twig-components/method/shy)  <small>(Bolt)</small>
- [slug](twig-components/method/slug)  <small>(Bolt)</small>
- [striptags(allowable_tags)](twig-components/method/striptags)  <small>(Bolt)</small>
- [svg](twig-components/method/svg)  <small>(Bolt)</small>
- [taxonomies](twig-components/method/taxonomies)  <small>(Bolt)</small>
- [thumbnail(width = null, height = null, location = null, path = null, fit = null)](twig-components/method/thumbnail)  <small>(Bolt)</small>
- [title_case](twig-components/method/title_case)  <small>(Bolt)</small>
- [title(locale = "", length = 120)](twig-components/method/title)  <small>(Bolt)</small>
- [trans(arguments = [], domain = null, locale = null, count = null)](twig-components/method/trans)  <small>(Bolt)</small>
- [translate(locale)](twig-components/method/translate)  <small>(Bolt)</small>
- [trim(characterMask = null, side = "both")](twig-components/method/trim)  <small>(Bolt)</small>
- [ucwords(delimiters = "")](twig-components/method/ucwords)  <small>(Bolt)</small>
- [url_decode](twig-components/method/url_decode)  <small>(Bolt)</small>
- [url_encode](twig-components/method/url_encode)  <small>(Bolt)</small>

### Symfony

- [file_excerpt(line, srcContext = 3)](twig-components/method/file_excerpt)  <small>Symfony</small>
- [file_link(line)](twig-components/method/file_link)  <small>(Symfony)</small>
- [file_relative](twig-components/method/file_relative)  <small>(Symfony)</small>
- [raw](twig-components/method/raw)  <small>(Symfony)</small>
- [record](twig-components/method/record)  <small>(Symfony)</small>
- [reduce(arrow, initial = null)](twig-components/method/reduce)  <small>(Symfony)</small>

### Jasny

- [as_array](twig-components/method/as_array)  <small>(Jasny)</small>
- [html_attr](twig-components/method/html_attr)  <small>(Jasny)</small>
- [less(replace = "...", break = "<!-- pagebreak -->")](twig-components/method/less)  <small>(Jasny)</small>
- [line(line = 1)](twig-components/method/line)  <small>(Jasny)</small>
- [linkify(protocols = ["http","mail"], attributes = [], mode = "normal")](twig-components/method/linkify)  <small>(Jasny)</small>
- [paragraph](twig-components/method/paragraph)  <small>(Jasny)</small>
- [preg_filter(pattern, replacement = "", limit = -1)](twig-components/method/preg_filter)  <small>(Jasny)</small>
- [preg_get_all(pattern, group = 0)](twig-components/method/preg_get_all)  <small>(Jasny)</small>
- [preg_get(pattern, group = 0)](twig-components/method/preg_get)  <small>(Jasny)</small>
- [preg_grep(pattern, flags = "")](twig-components/method/preg_grep)  <small>(Jasny)</small>
- [preg_match(pattern)](twig-components/method/preg_match)  <small>(Jasny)</small>
- [preg_quote(delimiter = "\/")](twig-components/method/preg_quote)  <small>(Jasny)</small>
- [preg_replace(pattern, replacement = "", limit = -1)](twig-components/method/preg_replace)  <small>(Jasny)</small>
- [preg_split(pattern)](twig-components/method/preg_split)  <small>(Jasny)</small>
- [product](twig-components/method/product)  <small>(Jasny)</small>
- [sum](twig-components/method/sum)  <small>(Jasny)</small>
- [truncate(length, replace = "...")](twig-components/method/truncate)  <small>(Jasny)</small>
- [values](twig-components/method/values)  <small>(Jasny)</small>

### Squirrelphp

- [boolval](twig-components/method/boolval)  <small>(Squirrelphp)</small>
- [floatval](twig-components/method/floatval)  <small>(Squirrelphp)</small>
- [intval](twig-components/method/intval)  <small>(Squirrelphp)</small>
- [strtotime(now)](twig-components/method/strtotime)  <small>(Squirrelphp)</small>
- [strval](twig-components/method/strval)  <small>(Squirrelphp)</small>

## Global

### Bolt

- [app = object(Symfony\Bridge\Twig\AppVariable)](twig-components/method/app)  <small>(Bolt)</small>
- [config = object(Bolt\Configuration\Config)](twig-components/method/config)  <small>(Bolt)</small>
- [defaultLocale = "en"](twig-components/method/defaultLocale)  <small>(Bolt)</small>

## Tag

### Twig (built-in)

- [apply](twig-components/method/apply)  <small>(Twig)</small>
- [autoescape](twig-components/method/autoescape)  <small>(Twig)</small>
- [block](twig-components/method/block)  <small>(Twig)</small>
- [cache](twig-components/method/cache)  <small>(Twig)</small>
- [deprecated](twig-components/method/deprecated)  <small>(Twig)</small>
- [do](twig-components/method/do)  <small>(Twig)</small>
- [embed](twig-components/method/embed)  <small>(Twig)</small>
- [extends](twig-components/method/extends)  <small>(Twig)</small>
- [flush](twig-components/method/flush)  <small>(Twig)</small>
- [for](twig-components/method/for)  <small>(Twig)</small>
- [from](twig-components/method/from)  <small>(Twig)</small>
- [if](twig-components/method/if)  <small>(Twig)</small>
- [import](twig-components/method/import)  <small>(Twig)</small>
- [include](twig-components/method/include)  <small>(Twig)</small>
- [macro](twig-components/method/macro)  <small>(Twig)</small>
- [sandbox](twig-components/method/sandbox)  <small>(Twig)</small>
- [set](twig-components/method/set)  <small>(Twig)</small>
- [verbatim](twig-components/method/verbatim)  <small>(Twig)</small>
- [with](twig-components/method/with)  <small>(Twig)</small>
- [use](twig-components/method/use)  <small>(Twig)</small>

### Bolt

- [setcontent](twig-components/method/setcontent)  <small>(Bolt)</small>

### Squirrelphp

- [break](twig-components/method/break)  <small>(Squirrelphp)</small>
- [continue](twig-components/method/continue)  <small>(Squirrelphp)</small>
- [foreach](twig-components/method/foreach)  <small>(Squirrelphp)</small>

## Test

### Twig (built-in)

- [constant](twig-components/method/constant)  <small>(Twig)</small>
- [defined](twig-components/method/defined)  <small>(Twig)</small>
- [divisible by](twig-components/method/divisible)  <small>(Twig)</small>
- [empty](twig-components/method/empty)  <small>(Twig)</small>
- [even](twig-components/method/even)  <small>(Twig)</small>
- [iterable](twig-components/method/iterable)  <small>(Twig)</small>
- [none](twig-components/method/none)  <small>(Twig)</small>
- [null](twig-components/method/null)  <small>(Twig)</small>
- [odd](twig-components/method/odd)  <small>(Twig)</small>
- [same as](twig-components/method/same_as)  <small>(Twig)</small>

### Bolt

- [extension](twig-components/method/extension)  <small>(Bolt)</small>

### Symfony

- [rootform](twig-components/method/rootform)  <small>(Symfony)</small>
- [selectedchoice](twig-components/method/selectedchoice)  <small>(Symfony)</small>

### Squirrelphp

- [array](twig-components/method/array)  <small>(Squirrelphp)</small>
- [bool](twig-components/method/bool)  <small>(Squirrelphp)</small>
- [boolean](twig-components/method/boolean)  <small>(Squirrelphp)</small>
- [callable](twig-components/method/callable)  <small>(Squirrelphp)</small>
- [false](twig-components/method/false)  <small>(Squirrelphp)</small>
- [float](twig-components/method/float)  <small>(Squirrelphp)</small>
- [int](twig-components/method/int)  <small>(Squirrelphp)</small>
- [integer](twig-components/method/integer)  <small>(Squirrelphp)</small>
- [object](twig-components/method/object)  <small>(Squirrelphp)</small>
- [scalar](twig-components/method/scalar)  <small>(Squirrelphp)</small>
- [string](twig-components/method/string)  <small>(Squirrelphp)</small>
- [true](twig-components/method/true)  <small>(Squirrelphp)</small>

### KNP

- [knp_menu_ancestor](twig-components/method/knp_menu_ancestor)  <small>(KNP Menu)</small>
- [knp_menu_current](twig-components/method/knp_menu_current)  <small>(KNP Menu)</small>

[twig]: http://twig.symfony.com/doc/templates.html
