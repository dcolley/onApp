onApp
=====

OpenNMS Mobile Client


OpenNMS behind Apache Proxy

<Location "/opennms/">
  ProxyPass http://192.168.1.25:8980/opennms/
  ProxyPassReverse http://192.168.1.25:8980/opennms/
  Header always set Access-Control-Allow-Origin "*"
  Header always set Access-Control-Allow-Methods "POST, GET, OPTIONS, DELETE, PUT"
  Header always set Access-Control-Allow-Headers "x-requested-with, Content-Type, origin, authorization, accept, client-security-token"
  RewriteEngine On
  RewriteCond %{REQUEST_METHOD} OPTIONS
  RewriteRule ^(.*)$ $1 [R=200,L]
</Location>
