---
title: Geolocation
---
Geolocation
=========

A set of fields for easy selection of a geolocation (latitude/longitude) with
an address. This field requires a google maps api key to be set in the main
config.

### Basic Configuration:

```
name:
    type: geolocation
```

### Example usage in templates:

To print out a simple map from google maps:

```
<img src="http://maps.googleapis.com/maps/api/staticmap?center={{ name.latitude }},{{ name.longitude }}&amp;zoom=14&amp;size=617x300&amp;sensor=false&amp;markers={{ name.latitude }},{{ name.longitude }}">
```