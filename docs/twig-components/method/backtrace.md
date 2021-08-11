# backtrace

`backtrace(options = 2, limit = 25)` is a Twig function to get the array of a backtrace through the code to the current
point in the execution. Useful for when you're debugging something, and you're not quite sure how you got here to begin
with.

### Twig

In your templates, use the following:

```twig
{{ dump(backtrace()) }}
```

The optional parameters denote the options and maximum depth of the output of the backtrace. See the page on php.net:
[debug-backtrace.php()](http://php.net/manual/en/function.debug-backtrace.php). The Twig filter defaults to using
`DEBUG_BACKTRACE_IGNORE_ARGS`, to use considerably less memory.

### PHP

In your code you can also use backtrace, like this:

```twig
use Symfony\Component\VarDumper\VarDumper;

VarDumper::dump(debug_backtrace());
```


Or, using the (global) shortcut:

```twig
dump(debug_backtrace());
```
