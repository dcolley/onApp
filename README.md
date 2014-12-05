# onApp - OpenNMS Mobile Client

# Running as a Mobile App

*WIP... basically, install cordova and launch*
```
cordova platform add ios
cordova build ios
cordova emulate ios --target=iPad-Retina  # nice large screen ;)
```

# Running as a webapp
Hosting the www directory on a web server or running directly from index.html produces an error (viewable in the javascript console):

*Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://hostname/opennms/rest/nodes. This can be fixed by moving the resource to the same domain or enabling CORS.*

### Enable CORS on OpenNMS
The only way I have managed to do this is to run OpenNMS via Apache ProxyPass

### OpenNMS behind Apache Proxy
---------------------------

```
<Location "/opennms/">
  ProxyPass http://<internal_ip>:8980/opennms/
  ProxyPassReverse http://internal_ip:8980/opennms/
  Header always set Access-Control-Allow-Origin "*"
  Header always set Access-Control-Allow-Methods "POST, GET, OPTIONS, DELETE, PUT"
  Header always set Access-Control-Allow-Headers "x-requested-with, Content-Type, origin, authorization, accept, client-security-token"
  RewriteEngine On
  RewriteCond %{REQUEST_METHOD} OPTIONS
  RewriteRule ^(.*)$ $1 [R=200,L]
</Location>
```

# Roadmap

0.0.1

 * establish Angular $resource parity with OpenNMS API - started
 * basic lists of each object type: event, outage, node etc.

0.0.2

 * app navigation, responsive design etc.
 * css styling - similar look to OpenNMS
 * dynamic config for webapp or mobile app - currently manual at build time e.g.
   * www/index.html: cordova.js only required for mobile
   * www/index.html: base tag only required for webapp

0.0.n

 * push notifications to device

0.1 
