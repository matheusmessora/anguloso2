//var LOGGER = LOGGER || {};


/*=====================================================================================================
 * LOGGER Module
 *======================================================================================================*/
LOGGER = function () {

    var init = function () {
        console.log("LOGGER.init");

        $("#consolerHolder").html('<div class="col-lg-24" id="consoler"></div>');
        
        $("#angulosoConsoler").click(function () {
            showHide();
        });
        log("LOGGER.init.success");
    };
    
    function log(message){
        appendLog("info", message);
    };
    
    function error(message){
        appendLog("error", message);
    };
    
    var appendLog = function(level, message){
        $("#consoler").append('<div class="row"><div class="col-lg-24 ' +getCssClassFromLogLevel(level)+ '">' + message + '</div></div>');
    };
    
    var getCssClassFromLogLevel = function(level){
        if(level === "info"){
            return "text-primary";   
        }
        if(level === "error"){
            return "text-danger";   
        }
    }
                              

    var showHide = function () {
        if ($("#consolerHolder").is(":hidden")) {
            show();
        } else {
           hide();
        }
    };

    var show = function () {
        $("#consolerHolder").slideDown();
        $("#angulosoConsoleBtn").html("Console &#10687;");
    }

    var hide = function () {
        $("#consolerHolder").slideUp();
        $("#angulosoConsoleBtn").html("&#10687;");
    }

    return {
        init: init,
        log: log,
        error: error
    }
}();