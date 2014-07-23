'use strict';
var anguloso = angular.module('anguloso', []);

anguloso.config(
    function($provide) {
        $provide.factory('angulosoInterceptor',

            function() {

                return {
                    responseError: function(responseError) {
                        callResponseError(responseError);
                        return responseError;

                    },

                    response: function(response) {
                        callResponse(response);
                        return response;
                    },

                    request: function(request) {
                        callRequest(request);
                        return request;
                    }
                };
            } 
        );
    }
);
anguloso.run(function(){
    $("<div id='anguloso'></div>").appendTo("body");
});



function callResponseError(responseError){
    var seconds = ((new Date() - responseError.config.anguloso.requestTime)/1000)%60;
    $("#" + id(responseError) + " .anTime").html(seconds + "s");
    $("#" + id(responseError) + " .anStatus").html(responseError.status)
    $("#" + id(responseError)).addClass('anError');
    $("#" + id(responseError)).addClass('anError');
    var resultJSON = JSON.stringify(responseError.data, null , '\t');
    $("#" + id(responseError)).attr('title',resultJSON);
}

function callResponse(response){
    var seconds = ((new Date() - response.config.anguloso.requestTime)/1000)%60;
    $("#" + id(response) + " .anTime").html(seconds + "s");
    $("#" + id(response) + " .anStatus").html(response.status)
    $("#" + id(response)).delay(3000).addClass('anSuccess', {duration: 1000});

    var resultJSON = JSON.stringify(response.data, null , '\t');
    $("#" + id(response)).attr('title',resultJSON);

}

function callRequest(request){
    var id = makeid();
    request.anguloso = {
      "id": id,
      "url": request.url,
      "method": request.method,
      "requestTime": new Date()

    };
    $("#anguloso").append(new Array(
      "<div class='col-lg-24 anRequest' id='" + id + "'>",
      "<div class='col-lg-10 anUrl' style='float:left;'>/api/login</div>",
      "<div class='col-lg-2 anStatus' style='float:left;'></div>",
      "<div class='col-lg-2 anMethod' style='float:left;'>GET</div>",
      "<div class='col-lg-2 anTime' style='float:left;'></div>",
      "<div class='col-lg-2 anClose' style='float:left;'>CLOSE</div>",
      "</div>"
      ).join(" "));
    $("#" + id + " .anUrl").html(request.anguloso.url);
    $("#" + id + " .anMethod").html(request.anguloso.method);

    $("#" + id + " .anClose").click(function() {
        close(id);
    });

}

function close(id){
    $("#" + id).fadeOut(1000);
}

function id(response){
    return response.config.anguloso.id;
};

function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};
