
require.config({
    //enforceDefine: true,    //an error will be thrown if a script loads that does not call define()
    paths: {
        jquery : "lib/jquery-1.10.2",
        backbone : "lib/backbone.1.1.2.min",
        underscore : "lib/underscore.1.6.0.min",
        templates: "../templates",
        jqueryui : "lib/jquery-ui-1.10.4.custom.min"
    },
    
    shim: {
        "underscore" : {
            deps: [],
            exports: "_"
        },
        "backbone" : {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },
        "jqueryui": {
            deps: ["jquery"],
            export: "$"
        },
    }
});

require(["app"], function (App) {
 
    App.initialize();
 
});