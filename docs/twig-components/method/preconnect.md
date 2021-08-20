# preconnect

`preconnect(uri, attributes = [])` is a Twig function to indicate an origin (
e.g. `https://www.google-analytics.com`) that will be used to fetch required resources. Initiating an early connection,
which includes the DNS lookup, TCP handshake, and optional TLS negotiation, allows the user agent to mask the high
latency costs of establishing a connection.

Source: [Symfony](https://symfony.com/doc/current/web_link.html#resource-hints)
