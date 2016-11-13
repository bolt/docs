---
title: dump() Twig tag
level: intermediate
---
dump() Twig tag
===============

If you're coding and you want to get a quick look at whatever variable or object
you're trying to manipulate, you can dump its contents to the browser. In
templates, use the following:

```
    {{ dump(variable) }}
```

<p class="note"><strong>Note:</strong> Don't forget to set <code>debug:
true</code> in your <code>config.yml</code> file. Otherwise the
<code>dump()</code> will output nothing at all.</p>


The `variable` can be a normal variable, a Record or multiple records of
Content, or other stuff.

<a href="/files/content-example3.png" class="popup"><img src="/files/content-example3.png" style="width: 400px"></a><br>

In your code you can also dump variables and objects, like this:

```
    use Symfony\Component\VarDumper\VarDumper;

    VarDumper::dump($variable);
```

Or, using the (global) shortcut:


```
    dump($variable);
```

Like above, the `$variable` can be a normal variable, an object or whatever.

Note that Bolt has built-in protection for when you're tyring to 'dump' Silex or
Symfony objects like `$app` or a variable that's `\Bolt\Application`.

Since these would be too large to render because of internal references and
recursion, they are not expanded further.
