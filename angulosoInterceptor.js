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

    hide();
    $("#angulosoHider").click(function() {
        showHide();
    });

    PANDOX.CONSOLE.init();


});

function createAngulosoHTML(){
    return new Array(
    "<div id='angulosoHolder'>",
        "<div id='angulosoHider'><button id='angulosoHiderBtn' type='button' class='btn btn-primary btn-sm'>Anguloso &#9776;</button></div>",
        "<div id='angulosoConsoler'><button id='angulosoConsoleBtn' type='button' class='btn btn-danger btn-sm'>Console &#9776;</button></div>",
        "<div id='anguloso'></div>",
        "<div id='consoler'></div>",
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

    addExtra(id(responseError), responseError);

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
    addExtra(id(response), response);

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
        "<div class='col-lg-1 anExpandBtn' style='float:left;'>",
            "<button type='button' class='btn btn-success btn-xs'>",
            "<span class='glyphicon glyphicon-close'></span>&#9776;",
            "</button>",
        "</div>",
      "<div class='col-lg-10 anUrl' style='float:left;'>/api/login</div>",
      "<div class='col-lg-2 anStatus' style='float:left;'></div>",
      "<div class='col-lg-2 anMethod' style='float:left;'></div>",
      "<div class='col-lg-2 anTime' style='float:left;'></div>",
      "").join(" "));

    $("#" + id + " .anUrl").html(request.anguloso.url);
    $("#" + id + " .anMethod").html(request.anguloso.method);


    // Annimations
    $("#" + id + " .anClose").click(function() {
        close(id);
    });



    $("#" + id + " .anExpandBtn").click(function() {
        expand(id);
    });


}

function addExtra(id, request){
    var resultJSON = getPrettyJSON(request.data);
    $("#" + id).before("<div id='" + id + "_expand' class='col-lg-24 anExpand'><pre><code>" + resultJSON + "</code></pre></div>");
}

function getPrettyJSON(json){
    // http://jsfiddle.net/unLSJ/
    var library = {};

    library.json = {
        replacer: function(match, pIndent, pKey, pVal, pEnd) {
            var key = '<span class=json-key>';
            var val = '<span class=json-value>';
            var str = '<span class=json-string>';
            var r = pIndent || '';
            if (pKey)
             r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
            if (pVal)
             r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
            return r + (pEnd || '');
            },
        prettyPrint: function(obj) {
            var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
            return JSON.stringify(obj, null, 3)
            .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(jsonLine, library.json.replacer);
            }
    };

    return library.json.prettyPrint(json);

}

function expand(id){
    if($("#" + id + "_expand").is(":hidden")){
       $("#" + id + "_expand").slideDown();
   }
    else {
        $("#" + id + "_expand").slideUp();
    }
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
    $("#" + id + "_expand").fadeOut("fast");
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
