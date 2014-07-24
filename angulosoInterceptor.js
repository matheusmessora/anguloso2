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
    $(createAngulosoHTML()).appendTo("body");
    // $("<div id='anguloso'></div>").appendTo("#angulosoHolder");
    // $(hider()).appendTo("#angulosoHolder");

    $("#angulosoHider").click(function() {
        showHide();
    });
});

function createAngulosoHTML(){
    return new Array(
    "<div id='angulosoHolder'>",
        "<div id='angulosoHider'><button id='angulosoHiderBtn' type='button' class='btn btn-primary btn-sm'>Anguloso &#9776;</button></div>",
        "<div id='anguloso'></div>",
    "</div>",

    "").join(" ");
}

function callResponseError(responseError){
    var seconds = ((new Date() - responseError.config.anguloso.requestTime)/1000)%60;
    $("#" + id(responseError) + " .anTime").html(seconds + "s");
    $("#" + id(responseError) + " .anStatus").html(responseError.status)
    $("#" + id(responseError)).addClass('anError');
    $("#" + id(responseError)).addClass('anError');
    var resultJSON = JSON.stringify(responseError.data, null , '\t');
    $("#" + id(responseError)).attr('title',resultJSON);

    console.log(responseError);
    show();
}

function callResponse(response){
    var seconds = ((new Date() - response.config.anguloso.requestTime)/1000)%60;
    $("#" + id(response) + " .anTime").html(seconds + "s");
    $("#" + id(response) + " .anStatus").html(response.status)
    $("#" + id(response)).delay(3000).addClass('anSuccess', {duration: 1000});

    var resultJSON = JSON.stringify(response.data, null , '\t');
    $("#" + id(response) + " .anUrl").attr('title',resultJSON);

    console.log(response);

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
        "<div class='col-lg-1 anClose' style='float:left;'>",
            "<button type='button' class='btn btn-danger btn-xs'>",
            "<span class='glyphicon glyphicon-close'></span>X",
            "</button>",
        "</div>",
      "<div class='col-lg-10 anUrl' style='float:left;'>/api/login</div>",
      "<div class='col-lg-2 anStatus' style='float:left;'></div>",
      "<div class='col-lg-2 anMethod' style='float:left;'>GET</div>",
      "<div class='col-lg-2 anTime' style='float:left;'></div>",
      "").join(" "));

    $("#" + id + " .anUrl").html(request.anguloso.url);
    $("#" + id + " .anMethod").html(request.anguloso.method);


    // Annimations
    $("#" + id + " .anClose").click(function() {
        close(id);
    });



}

function showHide(){
    if($("#anguloso").is(":hidden")){
        show();
    }else {
        hide();
    }
}

function show(){
    $("#anguloso").slideDown();
    $("#angulosoHiderBtn").html("Anguloso &#9776;");
}

function hide(){
    $("#anguloso").slideUp();
    $("#angulosoHiderBtn").html("&#9776;");
}

function close(id){
    $("#" + id).fadeOut("fast");
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
