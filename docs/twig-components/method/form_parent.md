# form_parent

`form_parent(form_view)` is a Twig function to return the parent form view or null if the form view already is the root
form. Using this function should be preferred over accessing the parent form using form.parent. The latter way will
produce different results when a child form is named parent.

Source: [Forms](https://symfony.com/doc/current/form/form_customization.html#form-parent-form-view)