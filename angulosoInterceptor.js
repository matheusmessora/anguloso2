'use strict';
var anguloso = angular.module('anguloso', []);

anguloso.config(
    function($provide) {
        $provide.factory('angulosoInterceptor',

            function() {

                return {
                    responseError: function(responseError) {

                        var seconds = ((new Date() - responseError.config.anguloso.requestTime)/1000)%60;
                        $("#" + id(responseError) + " .time").html(seconds + "s");
                        $("#" + id(responseError) + " .status").html(responseError.status)
                        $("#" + id(responseError)).addClass('error');
                        $("#" + id(responseError)).addClass('error');
                        var resultJSON = JSON.stringify(responseError.data, null , '\t');
                        $("#" + id(responseError)).attr('title',resultJSON);

                        return responseError;

                    },
                    response: function(response) {

                        var seconds = ((new Date() - response.config.anguloso.requestTime)/1000)%60;
                        $("#" + id(response) + " .time").html(seconds + "s");
                        $("#" + id(response) + " .status").html(response.status)
                        $("#" + id(response)).delay(3000).addClass('success', {duration: 1000});

                        var resultJSON = JSON.stringify(response.data, null , '\t');
                        $("#" + id(response)).attr('title',resultJSON);

                        return response;
                    },
                    request: function(request) {
                        request.timeout = 2000;
                        var id = makeid();
                        request.anguloso = {
                          "id": id,
                          "url": request.url,
                          "method": request.method,
                          "requestTime": new Date()

                        };
                        $("#anguloso").append(new Array(
                          "<div class='col-lg-24 request' id='" + id + "'>",
                          "<div class='col-lg-10 url' style='float:left;'>/api/login</div>",
                          "<div class='col-lg-4 status' style='float:left;'></div>",
                          "<div class='col-lg-4 method' style='float:left;'>GET</div>",
                          "<div class='col-lg-4 time' style='float:left;'></div>",
                          "</div>"
                          ).join(" "));
                        $("#" + id + " .url").html(request.anguloso.url);
                        $("#" + id + " .method").html(request.anguloso.method);


                        return request;
                    }
                } 
                function makeid(){
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                    for( var i=0; i < 5; i++ )
                        text += possible.charAt(Math.floor(Math.random() * possible.length));

                    return text;
                }

                function id(response){
                    return response.config.anguloso.id;
                }

                
            } 
        );
    }
);
