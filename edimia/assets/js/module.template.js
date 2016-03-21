var templates = {
    ids: [],
    init: function(aTemplates, callback) {

        $.when(
            $.each(aTemplates, function(k,v) {
                if ( $.inArray(v.id, templates.ids) < 0 ) {
                    twig({
                        id: v.id,
                        href: "templates/"+v.file+".twig",
                        async: false
                    });
                    templates.ids.push( v.id );
                }
            })
        ).done(function() {
           if (typeof(callback != "undefined")) {
               callback();
           }
        });
    }
}

//twig({
//    id: "numberimage",
//    href: "templates/numberimage.twig",
//    async: false
//});
//twig({
//    id: "answerrow",
//    href: "templates/answerrow.twig",
//    async: false
//});
//twig({
//    id: "dragitem",
//    href: "templates/dragitem.twig",
//    async: false
//});