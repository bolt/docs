---
title: Debug Bar
level: intermediate
---
Debug Bar
=========

If your environment is [set to dev][dev-environment], you'll see the
Symfony profiler bar at the bottom of all pages of both the frontend and the
backend of the Bolt website.

<a href="/files/toolbar.png" class="popup"><img src="/files/toolbar.png" style="width: 100%"></a><br>

This profiler bar contains a lot of useful information to see what's going on
behind the scenes. Click the different tabs to see information about the current
request, used templates, matched routes, used queries, server variables and a
lot more.

<p class="note"><strong>Note:</strong> The information available in the profiler bar
will depend on the current <a href="/debugging#environment-setting">environment setting</a>
. When set to dev, the profiler bar will also show debug information.</p>


[dev-environment]: ../debugging#environment-setting