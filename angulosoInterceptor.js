'use strict';
var anguloso = angular.module('anguloso', []);

anguloso.config(
    function($provide) {
        $provide.factory('angulosoInterceptor',

            function() {

                return {
                    responseError: function(responseError) {
                        console.debug("responseError", responseError);

                        var seconds = ((new Date() - responseError.config.anguloso.requestTime)/1000)%60;
                        $("#" + responseError.config.anguloso.id + " .time").html(seconds + "s");
                        $("#" + responseError.config.anguloso.id + " .status").html(responseError.status)
                        $("#" + responseError.config.anguloso.id).delay(3000).addClass('error', {duration: 1000});
                        $("#" + responseError.config.anguloso.id).delay(3000).addClass('error', {duration: 1000});
                        var resultJSON = JSON.stringify(responseError.data, null , '\t');
                        $("#" + responseError.config.anguloso.id).attr('title',resultJSON);

                    },
                    response: function(response) {
                        console.debug("response", response);

                        var seconds = ((new Date() - response.config.anguloso.requestTime)/1000)%60;
                        $("#" + response.config.anguloso.id + " .time").html(seconds + "s");
                        $("#" + response.config.anguloso.id + " .status").html(response.status)
                        $("#" + response.config.anguloso.id).delay(3000).addClass('active', {duration: 1000});

                        var resultJSON = JSON.stringify(response.data, null , '\t');
                        $("#" + response.config.anguloso.id).attr('title',resultJSON);

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
                          "<div class='col-lg-24' id='" + id + "'>",
                          "<div class='col-lg-10 url' style='float:left;'>/api/login</div>",
                          "<div class='col-lg-4 status' style='float:left;'></div>",
                          "<div class='col-lg-4 method' style='float:left;'>GET</div>",
                          "<div class='col-lg-4 time' style='float:left;'></div>",
                          "</div>"
                          ).join(" "));
                        $("#" + id + " .url").html(request.anguloso.url);
                        $("#" + id + " .method").html(request.anguloso.method);


                        console.debug("request", request);
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

                
            } 
        );
    }
);
