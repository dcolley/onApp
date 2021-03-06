# onApp - OpenNMS Mobile Client

It's based on AngularJS webapp running inside Cordova

# Dependencies

 * Git
 * Bower
 * AngularJS (and various modules)
 * ui-router (https://github.com/angular-ui/ui-router)
 * mobile-angular-ui (http://mobileangularui.com/)
 * cordova

# Getting started

```
git clone https://github.com/dcolley/onApp
cd www
bower install            # installs the js libraries
```

# Running as a Mobile App

*basically, install cordova platform and launch*

## iOS

```
cordova platform add ios
cordova build ios
cordova emulate ios --target=iPad-Retina  # nice large screen ;)
```

## Android

```
cordova platform add android
cordova build android
cordova emulate android [--target=nameoftarget]
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
 * config single account with credentials 

0.0.2

 * app navigation, responsive design etc.
   * consider http://onsen.io as a framework instead of http://mobileangularui.com
   * css styling - similar look to OpenNMS
 * dynamic config for webapp or mobile app - currently manual at build time e.g.
   * www/index.html: cordova.js only required for mobile
   * www/index.html: base tag only required for webapp

0.0.n

 * notifications on device icon
   * push notifications
   * IOS: Background App Refresh
 * config multiple account with credentials 
   * similar to email
   * allow user to switch between
     * how will this affect push notifications?

0.1 
