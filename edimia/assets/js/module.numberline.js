var numberline = {
    
    params: {
        min: 0,
        max: 5,
        step: 1,
        value: 0,
        divwidth: 0,
        markFirst: false,
        show: {
            handle: true,
            arches: true
        },
        selector: "#slider",    // (!) reflect changes in css
        containerSelector: ".slider-container",
        divisionWidth: 4,    // border width
        
        repeatimage: {
            height: 90,
            left: 44,
            right: 66,
            scale: 0.75
        }
    },
    
    init: function() {
        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                numberline.params[k] = v;
            });
        }
        
        var bCSSPresent = false;
        $('head').find("link[rel='stylesheet']").each(function() {
            if ($(this).attr("href").match('numberline\.css') != null) {
                bCSSPresent = true;
            }
        });
        if (!bCSSPresent) {
            $('head').append('<link rel="stylesheet" href="assets/css/numberline.css" />');
        }
        
//        this.render();
    },
    
    render: function() {
        
        if (this.params.show.handle) {
            $(numberline.params.selector).slider({
                value: numberline.params.value,
                min: numberline.params.min,
                max: numberline.params.max,
                step: numberline.params.step,
                slide: numberline.updateArches
            });
        }

        var width = 100 / (numberline.params.max - numberline.params.min);
        
        this.params.divwidth = ($( this.params.selector ).width() * width) / 100;
        
        var iter = 0;
        for (var i = numberline.params.min; i < numberline.params.max; i++) {
            if (this.params.show.arches) {
                $( numberline.params.containerSelector + " .slider-arches").append( numberline.li(false, width * iter, width) );
            }
            $( numberline.params.containerSelector + " .slider-divisions").append( numberline.li(false, width * iter, width) );
            
            $( numberline.params.containerSelector + " .slider-labels").append( numberline.li(i, width * iter, width) );
            iter++;
        }
        $( numberline.params.containerSelector + " .slider-labels").append( numberline.li(i, width * iter, width) );
        if (this.params.show.arches) {
            $( numberline.params.containerSelector + " .slider-arches > li").height( $( numberline.params.containerSelector + " .slider-arches > li:first-child").width() / 2 );
        }

//        $( numberline.params.containerSelector + " .slider-divisions li:last-child").width( $( numberline.params.containerSelector + " .slider-divisions li:last-child").width() - 2 * numberline.params.divisionWidth);

    },
    
    li: function(number, left, width) {
        if (number === false) {
            number = '&nbsp;';
        }
        console.log(numberline.params.markFirst);
        var classname = (numberline.params.markFirst && (exercise.generated_numbers[0] == number)) ? "selected" : "";
        number = '<span>'+number+'</span>';
        return $('<li class="'+classname+'" style="position: absolute; left: ' + left + '%; width: ' + width + '%;">'+number+'</li>');
    },
            
    updateArches: function(event, ui, value) {
        if (!numberline.params.show.arches) {
            return;
        }
        if (ui === false) {
            ui = {};
            ui.value = value;
            $(numberline.params.selector).slider("option", "value", value);
            numberline.params.value = value;
        }

        $( numberline.params.containerSelector ).attr("data-value",  ui.value );
        $( numberline.params.containerSelector + " .slider-arches li").hide();
        if (ui.value < numberline.params.value) {
            for (var i = ui.value; i < numberline.params.value; i++) {
                $( numberline.params.containerSelector + " .slider-arches li").eq(i).show();
            }
        }
        else if (ui.value > numberline.params.value) {
            for (var i = numberline.params.value; i < ui.value; i++) {
                $( numberline.params.containerSelector + " .slider-arches li").eq(i).show();
            }
        }
    },
    
    val: function(value) {
        this.params.value = value;
    },
    
    showRepeatImages: function(options) {
        $(".repeat-image-container").html('');
        $.each(options, function(k, v) {
            $(".repeat-image-container").append(
                twig({ref: "repeatimage"}).render({
                    imageclass: v.className, 
                    height: (numberline.params.repeatimage.height * numberline.params.repeatimage.scale),
                    left: (numberline.params.repeatimage.left * numberline.params.repeatimage.scale),
                    middle: ( v.number * numberline.params.divwidth - ((numberline.params.repeatimage.right + numberline.params.repeatimage.left) * numberline.params.repeatimage.scale) ),
                    right: (numberline.params.repeatimage.right * numberline.params.repeatimage.scale)
                }) 
            ).show();
        });
    }
}