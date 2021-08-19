# prerender

`prerender(uri, attributes = [])` is a Twig function to identify a resource that might be required by the next
navigation, and that the user agent should fetch and execute, such that the user agent can deliver a faster response
once the resource is requested later.

Source: [Symfony](https://symfony.com/doc/current/web_link.html#resource-hints)