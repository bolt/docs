---
title: Geolocation
---
Geolocation
=========

A set of fields for easy selection of a geographic location. You can use the
given address, the latitude, longitude, and the reverse geocoded address. To
see the values that are stored, use `{{ dump(page.geolocation) }}`.

<p class="tip"><strong>Tip:</strong> This field requires a `google_api_key` key
 to be set in the main config.</p>

### Basic Configuration:

```
        location:
            type: geolocation
```

### Example usage in templates:

To insert a simple map from Google with a marker at the given location, use:

```
<img src="http://maps.googleapis.com/maps/api/staticmap?center={{ record.location.latitude }},{{ record.location.longitude }}&zoom=14&size=617x300&sensor=false&markers={{ record.location.latitude }},{{ record.location.longitude }}">
```

More info about these static maps, can be found at [Static Maps API V2 Developer Guide][1].
Of course, you can use the geolocations with any mapping service you like, since
latitude and longitude is a common geographic coordinate system used by many
services.
