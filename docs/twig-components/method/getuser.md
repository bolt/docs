# getuser

`getuser(username = null, id = null, displayname = null, email = null)` is a Twig function to fetch a specific record based on the correct user. In cases like these, You'll need to be able to get the data for this user, and the user's id. For these occasions, the function getuser comes in handy.

To fetch a user, pass at least one of the arguments below:

|Argument name	|Explanation
|---|---|
|username	|Search by username
|id	|Search by id
|displayname	|Search by display name
|email	|Search by email

Example 1: Getting a user

```twig
    {{ getuser(username = 'admin') }} {# fetches the user with username 'admin'. If it does not exist, returns null #}
    {{ getuser(id = 1) }} {# fetches the user with id '1' #}
    {{ getuser(displayname = 'Administrator') }}
    {{ getuser(email = 'admin@example.org' }}

    {# Or even like this: #}
    {{ getuser(username = 'admin', id = 1) }}
```

Example 2: Using in setcontent

```twig
{% setcontent pages = "pages" where { ownerid: getuser('admin').id } %}
```
