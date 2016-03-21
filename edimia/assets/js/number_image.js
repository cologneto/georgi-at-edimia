function number_image() {
    
    this.collections = {
        animal: ["cat", "dog", "falcon", "hare"],
        fruit: ["apple", "pear", "banana", "lemon", "orange"],
        marble: ["blue", "green", "orange", "pink"],
        robot: ["blue", "orange", "purple"]
    };
    
    this.params = {
        collection: null,
        category: null,
        type: null,
        subtype: null,
        ext: "png",
        excludeType: null,
        pricetag: false
    };
    
    var self = this;

    if (arguments.length > 0) {
        $.each(arguments[0], function(k, v) {
            self.params[k] = v;
        });
    }
    
    this.render = function(value) {
        
        var dir = "assets/image/" + this.params.category + "/";
        
        var filename = this.params.category;
        if ( this.params.collection != null) {
            filename += "_" + this.params.collection;
        }
        filename += "_" + this.params.type;
        if ( this.params.subtype != null ) {
            filename += "_" + this.params.subtype;
        }
        filename +=  "_" + value + "." + this.params.ext;
        
        return dir + filename;
        
    },
    
    this.html = function(value, className, pricevalue) {
        if (typeof(className) == "undefined") {
            className = "";
        }
        var filename = this.render(value);
        return twig({ref: "numberimage"}).render({
            filename: filename, 
            type: this.params.type,
            subtype: this.params.subtype,
            value: value,
            className: className
        }) + 
            this.appendPricetag(pricevalue);
    }

    this.appendPricetag = function(value) {
        return (typeof(self.params.pricetag) != "undefined" && self.params.pricetag === true) ? 
                '<div class="pricetag">' + value + 'kr</div>' : 
                "";
    }
    
    this.resetType = function() {
        if ( typeof(this.params.collection) == "object" ) {
            this.params.collection = this.params.collection[ _helper.rangeRandom(0, this.params.collection.length - 1) ];
        }
        this.params.type = this.collections[ this.params.collection ][ _helper.rangeRandom(0, this.collections[ this.params.collection ].length - 1) ];
    }


    if (this.params.collection != null && this.params.type == null) {
        if ( typeof( this.collections[ this.params.collection ] ) == "undedfined" ) {
            alert("ERROR: Image collection '" + this.params.collection + "' is not defined.");
        }
        else {
            this.resetType();
        }
    }
}

var process_image = {
    
    html: function(num1, num2) {
        if (exercise.params.operationSign == "-") {
            return process_image.subtraction( num1, num2 );
        }
        else {
            return process_image.addition( num1, num2 );
        }
    },
    
    subtraction: function(num1, num2) {
        var imgstr = "";
        oImg1 = new number_image({
            collection: "fruit",
            category: "still"
        });
        oImg2 = new number_image({
            collection: "fruit",
            category: "still",
            type: oImg1.params.type,
            subtype: "minus"
        });
        for (var m = 0; m < num1 - num2; m++) {
            imgstr += oImg1.html(1, "still no-float");
        }
        for (m = 0; m < num2; m++) {
            imgstr += oImg2.html(1, "still no-float");
        }
        return imgstr;
    },
    
    addition: function(num1, num2) {
        var imgstr = "";
        oImg1 = new number_image({
            collection: "animal",
            category: "still"
        });
        oImg2 = new number_image({
            collection: "animal",
            category: "motion",
            type: oImg1.params.type
        });
        for (var m = 0; m < num1; m++) {
            imgstr += oImg1.html(1, "still");
        }
        for (m = 0; m < num2; m++) {
            imgstr += oImg2.html(1, "motion");
        }
        return imgstr
    }
};