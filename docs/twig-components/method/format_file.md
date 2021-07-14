# format_file

`format_file(line, text = null)` is a Twig filter to generate the file path inside an `<a>` element. If the path is
inside the kernel root directory, the kernel root directory path is replaced by `kernel.project_dir` (showing the full
path in a tooltip on hover).

`file`<br>
type: `string`

`line`<br>
type: `integer`

`text` *(optional)*

type: `string` default: `null`

Source: [Twig](https://symfony.com/doc/current/reference/twig_reference.html#format-file)