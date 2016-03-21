var exercise = {
    iSolveDelay: 300,   //ms
    init: function() {

        if (arguments.length > 0) {
            $.each(arguments[0], function(k, v) {
                exercise.params[k] = v;
            });
        }

        answer_analyser.init({
            type: "match",
            selectors: [".exe-container-header", ".click-button-holder > div.checked"]
        });

        var aConfigClasses = ["c0-10-E11", "c0-5-E11 show-question clickbuttons-two image-content-limit-100pc img-motion-float-right"];
        exercise._init(function() {
            $("#exercise-content").html(twig({ref: "layout"}).render());
            $("#page-wrapper-inner").addClass( aConfigClasses.join(" ") );
            exercise.getData(function() {
                exercise.set();
                if (exercise.params.callback) {
                    exercise.params.callback();
                }
            });
        });
    },
    set: function() {
        exercise_global.clear_canvas();

exercise.getOperation();

_helper.randomPair();

$(".exe-container-header").data("value", exercise.generated_numbers[0] + "" + exercise.params.operationSign + "" + exercise.generated_numbers[1]);

equations = [];
var vas = exercise.params.operation;
equations.push(exercise.generated_numbers[0] + "" + exercise.params.operationSign + "" + exercise.generated_numbers[1]);
if (exercise.params.operationSign == "+")
{
    equations.push(exercise.generated_numbers[0] + "" + "-" + "" + exercise.generated_numbers[1]);

} else {
    equations.push(exercise.generated_numbers[0] + "" + "+" + "" + exercise.generated_numbers[1]);
}

var oImg1 = null;
var oImg2 = null;
var i = 0;
if (exercise.params.operationSign == "-") {
    oImg1 = new number_image({
        collection: "coin",
        category: "still",
        type: "kr"
    });
    oImg2 = new number_image({
        collection: "fruit",
        category: "still",
        pricetag: true
    });

    $(".exe-container-header").html(
            twig({ref: "imageholder"}).render({classname: "half-width img-contain-small position-coins has-label label-youhave"}) +
            twig({ref: "imageholder"}).render({classname: "add-pricetag half-width text-center has-label label-tobuy"})
            );
    $(".number-image-holder:first").addClass("value" + exercise.generated_numbers[0]);
    var i = 0;
    for (i = 0; i < exercise.generated_numbers[0]; i++) {
        $(".number-image-holder:first").append(oImg1.html(1, "small"));
    }

    $(".number-image-holder:last").append(oImg2.html(1, "big no-float", exercise.generated_numbers[1]));

    $(".exe-container-question").html(twig({ref: "instruction"}).render({text: "Hur mycket ska du betala?/Hur mycket kostar de tillsammans?", classname: "animated bounceInRight"}));


} else {

    oImg1 = new number_image({
        collection: "fruit",
        category: "still",
        pricetag: true
    });

    oImg2 = new number_image({
        collection: "fruit",
        category: "still",
        pricetag: true
    });
    
    $(".exe-container-header").html(
            twig({ref: "imageholder"}).render({classname: "add-pricetag half-width text-center has-label label-tobuy"}) +
            twig({ref: "imageholder"}).render({classname: "add-pricetag half-width text-center"})
            );
    $(".number-image-holder:first").append( oImg1.html(1, "no-float", exercise.generated_numbers[0]) );
    $(".number-image-holder:last").append( oImg2.html(1, "no-float", exercise.generated_numbers[1]) );
    
    $(".exe-container-question").html(twig({ref: "instruction"}).render({text: "Hur mycket ska du betala?/Hur mycket kostar de tillsammans?", classname: "animated bounceInRight"}));

}

equations = _helper.array_shuffle(equations);

$(".exe-container-answer")
        .append($(twig({ref: "button"}).render({value: equations[0], intvalue: eval(equations[0])})).data("value", equations[0]))
        .append($(twig({ref: "button"}).render({value: equations[1], intvalue: eval(equations[1])})).data("value", equations[1]));
    },
    solve: function() {
        var correct = eval($(answer_analyser.params.selectors[0]).data("value"));
$(".click-button-holder[data-value='" + correct + "'] > div").addClass("correct");    },
    mark_correct: function() {
        $(answer_analyser.params.selectors[1]).addClass("correct");    },
    mark_wrong: function() {
        $(answer_analyser.params.selectors[1]).addClass("wrong");    },
    revert_wrong: function(bForceSolve) {
        $(".click-button-holder > div.checked.wrong").removeClass("wrong correct");    },
    
};

for (var sAttributeName in exercise_global) {
    if (exercise[sAttributeName]) {
        alert("Exercise object already has '" + sAttributeName + "' implemented.\n\nPlease consider rewriting that code");
    }
    else {
        exercise[sAttributeName] = exercise_global[sAttributeName];
    }
}