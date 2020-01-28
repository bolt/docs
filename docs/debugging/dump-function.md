---
title: Dumping
level: intermediate
---
Dumping functionality
=====================

If you're coding and you want to get a quick look at whatever variable or object
you're trying to manipulate, you can dump its contents to the browser. 

<p class="note"><strong>Note:</strong> Don't forget to set <code>APP_DEBUG=1</code>
in your <code>.env</code> file. Otherwise the
<code>dump()</code> will output nothing at all.</p>

### Twig

In templates, use the following:

```
    {{ dump(variable) }}
```


The `variable` can be a normal variable, a Record or multiple records of
Content, or other stuff.

<a href="/files/content-example3.png" class="popup"><img src="/files/content-example3.png" style="width: 400px"></a><br>

### PHP

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

Note that Bolt has built-in protection for when you're tyring to 'dump' 
Symfony objects like `$app` or a variable that's `\Bolt\Application`.

Since these would be too large to render because of internal references and
recursion, they are not expanded further.
