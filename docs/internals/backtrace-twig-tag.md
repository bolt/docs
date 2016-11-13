---
title: backtrace() Twig tag
level: advanced
---
backtrace() Twig tag
====================

Using this function you can get a backtrace throught the code to the current
point in the execution. Useful for when you're debugging something, and you're
not quite sure how you got here to begin with. In your templates, use the
following:

```
    {{ backtrace() }}
```

In your code you can also use backtrace, like this:

```
    use Symfony\Component\VarDumper\VarDumper;

    VarDumper::dump(debug_backtrace());
```

Or, using the (global) shortcut:


```
    dump(debug_backtrace());
```

The optional parameters denotes the options and maximum depth of the output of
the backtrace. See the page on php.net: [debug-backtrace.php()][back].

[back]: http://php.net/manual/en/function.debug-backtrace.php
