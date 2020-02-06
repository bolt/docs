---
title: Image field
---
Image field
===========

Simple image upload/select field.

## Basic Configuration:

```yaml
        cover:
            type: image
```

## Example usage in templates:

```twig
{{ record.cover|image() }}
```

or

```twig
{{ record.cover|thumbnail() }}
```

or

```twig
{{ record.cover|popup() }}
```

See [Bolt Template tags](../templating/twig-functionality) for more info.

## Options:

The field has a few options to change the appearance and functionality of the
field.

* `extensions` Allows you to restrict users to only be able to upload files with
  certain file extensions.
* `alt` Can be used to set to `true` to create a field for the image alt attribute.
* `upload` Allows you to upload files for this field into a specified directory
  so they remain grouped. This directory will be created in `{%web%}/files/`

```yaml
        cover:
            type: image
            alt: true
            extensions: [ gif, jpg, png ]
            upload: portfolio
```

You can call these in your templates by using `{{ record.cover.alt }}`
or `{{ record.cover.caption }}` and they will also be automatically used by
Bolt's image functions.

## Media attributes

For each uploaded image you can manage the associated Metadata, like "Title",
"Description", "Copyright" and more. You can edit these from the Content Edit
screen via the "Edit attributes", in the pull-down next to "Upload".
Alternatively, you can locate the image under "File Management" > "Uploaded
Files", where you can find all previously uploaded files.

You can access this Metadata in templates by using the `media` filter on an Image:

```twig
    {{ dump(record.image|media) }}
```

The ouput is a Media object, holding all the Metadata

```
Bolt\Entity\Media {#13211 ▼
  -id: 183
  -location: "files"
  -path: "stock2"
  -filename: "image_64619.jpg"
  -type: "jpg"
  -width: 1280
  -height: 1024
  -filesize: 158628
  -cropX: null
  -cropY: null
  -cropZoom: null
  -author: Proxies\__CG__\Bolt\Entity\User {#12559 ▶}
  -createdAt: DateTime @1564307887 {#13122 ▶}
  -modifiedAt: DateTime @1559370827 {#13123 ▶}
  -title: "Ullam earum quibusdam illum neque consequatur."
  -description: """
    Soluta quis ea corrupti iusto nisi earum quidem. Eum et eaque totam. Eaque aut saepe porro assumenda rem veniam cumque.
    """
  -originalFilename: null
  -copyright: "© Unsplash"
}
```

Another example:

```twig
    {% set media = record.image|media %}

    Copyright: {{ media.copyright }}
```

