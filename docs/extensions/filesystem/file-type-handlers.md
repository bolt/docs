---
title: Using file type handlers
level: advanced
---
Using file type handlers
========================

## Getting a file with an image handler 

```php
    /** @var \Bolt\Filesystem\Handler\ImageInterface $file */
    $file = $filesystem->getImage($path);
```

Where:

| Variable | Type | Description 
| -------- | ---- | -----------
| `$path`  | `string` | Relative path to the file

## Specific file type handler

To use a specific `HandlerInterface` for the object returned by get, you can
pass in an instance of a `\Bolt\Filesystem\Handler\HandlerInterface` class.

e.g. Someone gave you a JSON file called `special.xyz`, and you wish for it to
be handled natively as a JSON file:


```php
    /** @var \Bolt\Filesystem\Handler\HandlerInterface $handler */
    $handler = \Bolt\Filesystem\Handler\JsonFile();
    
    $object = $filesystem->get('relative/path/special.xyz', $handler);
    
    // As $object is a JSON handled file, we can parse it to PHP.
    $data = $object->parse();
    
    $data['updated'] = time();
    
    // We can also dump the updated PHP array back to a JSON file.
    $object->dump($data);
    
```
