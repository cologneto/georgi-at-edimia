var numberimage = {
    
    params: {
        type: null,
        subtype: null,
        ext: "png"
    },
            
    init: function() {
        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }
    },
            
    render: function(value) {
        var filename = "number_image_" + this.params.type;
        if ( this.params.subtype != null ) {
            filename += "_" + this.params.subtype;
        }
        filename +=  "_" + value + "." + this.params.ext;
        
        return filename;
    }
    
}