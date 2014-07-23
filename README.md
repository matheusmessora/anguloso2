#Anguloso
========

Anguloso is a HTTPInterceptor for AngularJS. It renders basic information about ajax requests.



========

##How Anguloso works

It intercepts every request and response from Angular $http service. Then, using jQuery, it renders lines for usefull debugging.  

##I want to use it!!

1. Anguloso can be used like a bower_component. So, first of all you need to declare it as a component in **bower.json**
> { "dependencies": {"anguloso2" : "master"} }

2. Insert Anguloso as a module of your AngularAPP.
> var yourApp = angular.module('yourApp', ['anguloso']);

##Depends on

* AngularJS
* jQuery

