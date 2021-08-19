# select_options

`select_options(field)` is a Twig function to return an array of all options of the select field. Each array contains 
the key, value and a selected flag for the select option. Note the select_options() function should only be called with 
instances of select fields.

Example output of select_options(field)

```twig
array:3 [▼
    0 => array:3 [▶
        "key" => "milk"
        "value" => "Milk"
        "selected" => false
    ]
    1 => array:3 [▶
        "key" => "cake"
        "value" => "Cake"
        "selected" => true
    ]
    2 => array:3 [▶
        "key" => "egg"
        "value" => "Egg"
        "selected" => false
    ]
]
```

For more select fields, check out the [Select field](https://docs.bolt.cm/5.0/fields/select) page.
