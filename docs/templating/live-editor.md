---
title: Templates for the Live Editor
---
Templates for the Live Editor
======================================

Bolt comes with built-in support for editing records as they'll appear on your
website. It requires a little bit of set up, but once it's ready, the experience
will look something like this:

<a href="/files/live-editor-demo.gif" class="popup">
<img src="/files/live-editor-demo.gif" alt="The Live Editor" width="500" />
</a>

<p class="note"><strong>Note:</strong> This feature is marked "Experimental":
This means that it will basically work, but complex use-cases are not supported.
Live Editing does not work with TemplateFields or Repeaters, for example.</p>

In any record that has a corresponding page (which means `viewless: false` - the
default for the ContentType), you can make any *HTML*, *text* or *textarea*
field editable. When it is editable, clicking on the "live edit" button while
editing that record will open an inline, live editor. Any field that is editable
will have a yellow outline around it. After making changes, an editor can click
"close editor" at the top right and those changes will propagate to their
relevant fields in the regular editor.

<p class="tip"> <strong>Tip:</strong> the default Bolt-2016 theme is live-editor
enabled. If you're unsure about how this all works, take a look at its source
code in your Bolt installation.</p>

To enable a field to be editble, Bolt has to know what field to map it to. It
requires a very small and easy change to your theme code. For the live editor to
work, **the field must be the only contents of the element it is in**. Then, you
just add a `data-bolt-field` attribute set to the name of the field. For
example, if you have a title field set up in your templates like this:

```twig
<h1>{{ record.title }}</h1>
```

This is how you would set it up for live editing:

```twig
<h1 data-bolt-field="title">{{ record.title }}</h1>
```

Simple!

To enable this for [template fields](./template-specific-fields), you need to
make a reference with the text `templatefields` followed by the name of the
field in square brackets. For example:

```twig
<section data-bolt-field="templatefields[section_1]">{{ record.templatefields.section_1 }}</section>
```

<p class="note"> <strong>Note:</strong> To disable the live editor across your
<strong>entire Bolt installation</strong>, set <code>liveeditor: false</code> in
your <code>config.yml</code>.</p>

<p class="note"> <strong>Note:</strong>To disable the live editor for a
ContentType, set <code>liveeditor: false</code> in your
<code>contentypes.yml</code>. However, the global setting in
<code>config.yml</code> must remain set to <code>true</code></p>
