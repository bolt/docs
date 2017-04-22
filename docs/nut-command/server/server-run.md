---
title: server:run
level: intermediate
---
server:run
==========

Nut's `server:run` command runs PHP's built-in web server for your site testing
and basic development.

<p class="warning"><strong>Note:</strong> Do not use this to run production
web sites, it is for development and testing only.</p>


## Usage

```bash
    php ./app/nut server:run [options] [--] [<address>]
```


## Arguments

| Argument | Description |
|----------|-------------|
| address  | Address:port [default: "0.0.0.0"]


## Options

| Option | Description |
|--------|-------------|
| -p, --port=PORT | Address port number [default: "8000"]


## Examples

### Default


```bash
$ php ./app/nut server:run


 [OK] Server running on http://0.0.0.0:8000


 // Quit the server with CONTROL-C.
```



### Specifying host name and port


```bash
$ php ./app/nut server:run example.com --port=8888


 [OK] Server running on http://example.com:8888


 // Quit the server with CONTROL-C.
```

