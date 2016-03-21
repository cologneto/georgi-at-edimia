function number_image() {

    this.set = function() {
        var self = this;
        $.each(arguments[0], function(k, v) {
            self[k] = v;
        });
        return this;
    }

    this.render = function(type, appendToSelector) {

        var l = Math.floor(this.number / 10) * 10;
        var r = Math.floor(this.number % 10);

        var img1 = img2 = new Image();

//        $(img1).attr("src", "http://dev.edimia.se/assets/images/number-image-kr-"+l+".png").css({width: "25px"}).appendTo( $(appendToSelector) );
//        $(img2).attr("src", "http://dev.edimia.se/assets/images/number-image-block-"+r+"-red.png").css({width: "80px"}).appendTo( $(appendToSelector) );

        var lstr = "http://edimia.voksnet.com/assets/image/number-image-" + type + "-" + l;
        var rstr = "http://edimia.voksnet.com/assets/image/number-image-" + type + "-" + r;
        var lh = 40;
        var rh = 80;

        if (type == "block") {
            lstr += "-blue";
            rstr += "-red";
            lh = 140;
            rh = 80;
        }
        lstr += ".png";
        rstr += ".png";

        $(appendToSelector)
                .append($("<img>").attr("src", lstr).css({height: "140px"}).addClass("number_image_content"))
                .append($("<img>").attr("src", rstr).css({height: "140px"}).addClass("number_image_content")).show();

//        $(".number_image_holder.bounceInLeft").toggleClass("bounceInLeft fuck");
//        window.setTimeout(function() {
//            $(".number_image_holder.fuck").toggleClass("bounceInLeft fuck");
//        }, 1);
    }



}