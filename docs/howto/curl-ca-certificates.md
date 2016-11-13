---
title: Setting Up cURL SSL/TLS Certificate Authority Certificates
level: advanced
---
Setting Up cURL SSL/TLS Certificate Authority Certificates
==========================================================

If your system is not correctly set up with SSL/TLS Certificate Authority (CA)
certificates, you might get the following error:

```
Curl (60) SSL Certificate Problem: Unable to get local issuer certificate
```

**Note:**
This is a system configuration problem, and not specific to either cURL or Bolt.
The information here is provided as a useful **starting point only**.

Installing Automatically Converted CA Certificates from mozilla.org
-------------------------------------------------------------------

1. Download [`cacert.pem`](http://curl.haxx.se/ca/cacert.pem)
2. Move the `cacert.pem` file to the affected computer, e.g.
  * /etc/pki/tls/cacert.pem
  * C:\php\extras\ssl\cacert.pem
3. Edit the php.ini file and change the `curl.cainfo` parameter, e.g.

```
curl.cainfo = "/etc/pki/tls/cacert.pem"
```

```
curl.cainfo = "C:\php\extras\ssl\cacert.pem"
```
