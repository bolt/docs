---
title: File Location & Layout
level: advanced
---
File Location & Layout
======================

As Bundles are just a part of your site project's code, their location is
relative to your site's root directory is flexible, and your decision on
location should be influenced by the necessary file type(s).


### Choosing a location

#### PHP only

If your Bundle contains only PHP file(s), and Twig and web assets are kept with
the site's theme, we recommend using the base namespace of your Bundle as a
sub-directory of `{site root}/src`,

For example, if your Bundle namespace was `Acme\BundleBaseNamespace`:

```
{site root}/src/BundleBaseNamespace
```


#### PHP with resources

If you want you Bundle to include non-PHP files, you're better off putting the
contents into a sub-directory of `extension/` with the pattern
`extension/{bundle name}`, for example:

| Directory  | Description                                                    |
| ---------- | -------------------------------------------------------------- |
| `extension/{bundle name}/src`       | Extension's PHP code
| `extension/{bundle name}/config`    | Configuration base files (`config.yml.dist`)
| `extension/{bundle name}/templates` | Twig templates. These should be kept separate from public assets



