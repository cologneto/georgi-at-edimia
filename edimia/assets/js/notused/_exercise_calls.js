/* GETS DATA FROM ANSWERANALYZER IN BODEGA AND GETS/SENDS DATA TO INIT IN THE CURRENT EXERCISE */
function onLoad() {
    $.getJSON(currentUrl + "getData", function (e) {
        successCounter = parseInt(e.successCounter);
        totalTries = parseInt(e.tries);
        maxTries = parseInt(e.maxTries);
        currentTries = parseInt(e.currentTries);
        currentEx = parseInt(e.currentEx);
        typeof type != "undefined" && (oldType = type);
        console.log("success:", successCounter, " total tries:", totalTries, " max tries:", maxTries, " current tries:", currentTries, " current exercise:", currentEx);
        currentTries == maxTries && walk()
    })
}

function onCheck() {
    currentTries++;
    totalTries++;
    var e = checkAnswer();
    $.post(currentUrl + "saveData", {
        currentTries: currentTries,
        tries: totalTries
    }, function (t) {
        if (e)
            if (currentTries < maxTries) {
                result = "error";
                setTimeout(function () {
                    enableBtn();
                    clearNotifications()
                }, 2e3)
            } else {
                result = "over";
                setTimeout(function () {
                    enableBtn();
                    clearNotifications()
                }, 5e3);
                showAnswers()
            } else {
            result = "correct";
            successCounter++;
            setTimeout(walk, 2e3)
        }
        showNotification(result)
    })
}

function walk() {
    currentTries = 0;
    result = "";
    currentEx++;
    var e = exSave();
    $.post(currentUrl + "walk", {
        exindex: currentEx,
        data: e,
        tries: totalTries,
        success_counter: successCounter,
        currentTries: currentTries
    }, function (e) {
        wizardSteps();
        if (currentEx == totalEx) {
            successRate = Math.floor(successCounter / totalTries * 100);
            console.log("Du fick ", successRate, "% rÃ¤tt. Success - ", successCounter, "tries - ", totalTries);
            $.post(currentUrl + "saveSuccess", {
                success: successRate
            }, function (e) {
                window.location.href = currentUrl + "results"
            })
        } else {
            result = "";
            enableBtn();
            clearNotifications();
            exInit();
            typeof type != "undefined" && oldType != type && $(".instructions").removeClass("animated bounceInRight").addClass("animated bounce").one("webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd", function () {})
        }
    })
}

function onClick() {
    $(".exercise-btn-next").click(function () {
        disableBtn();
        result != "over" ? onCheck() : walk()
    });
    $("body").delegate(".teacher-widget-btn", "click", function () {
        var e = currentUrl.substring(0, currentUrl.length - 2);
        e = e.substring(0, e.lastIndexOf("/"));
        console.log(e);
        var t = {
            debug: !1,
            form: !0,
            onload: function () {
                disableDropAreas()
            },
            onsuccess: function (e) {},
            hideonsuccess: !0
        };
        $("#myModal").hookumodal(e + "/intro/teacherwidget/", t).modal("show")
    });
    $("#myModal").on("hidden.bs.modal", function () {
        $(this).empty();
        enableDropAreas();
        console.log("tabort allt i modal")
    })
}

function disableDropAreas() {
    $(".drop_area").each(function () {
        $(this).droppable("option", "disabled", !0)
    })
}

function enableDropAreas() {
    $(".drop_area").each(function () {
        $(this).droppable("option", "disabled", !1)
    })
}

function wizardSteps() {
    $(".wizard-steps li.active").removeClass("active").next().addClass("active");
    $(".wizard-steps li").hasClass("complete") == 0 ? $(".wizard-steps li:first-child").addClass("complete") : $(".wizard-steps li.complete").next().addClass("complete")
}

function array_shuffle1(e) {
    for (var t = e.length - 1; t > 0; t--) {
        var n = Math.floor(Math.random() * (t + 1)),
            r = e[t];
        e[t] = e[n];
        e[n] = r
    }
    return e
}

function disableBtn() {
    $(".exercise-btn-next").addClass("disabled").css("opacity", .5)
}

function enableBtn() {
    $(".exercise-btn-next").removeClass("disabled").css("opacity", 1)
}

function clearNotifications() {
    $(".exercise_notification").removeClass("open")
}

function showNotification(e) {
    $(".exercise_notification." + e).addClass("open")
}

function showAnswers() {
    $(".draggable").each(function () {
        $(this).css("pointer-events", "none");
        $(this).animate({
            opacity: 1
        }, Math.random() * 1e3, function () {
            $(this).animate({
                opacity: 0
            }, 1e3)
        })
    });
    $(".clone").each(function () {
        $(this).css("pointer-events", "none");
        $(this).animate({
            opacity: 1
        }, Math.random() * 1e3, function () {
            $(this).animate({
                opacity: 0
            }, 1e3)
        })
    });
    $(".fadable").each(function () {
        $(this).css("pointer-events", "none");
        $(this).animate({
            opacity: 1
        }, Math.random() * 1e3, function () {
            $(this).animate({
                opacity: 0
            }, 1e3)
        })
    });
    $(".facit").each(function () {
        $(this).stop().animate({
            opacity: 0
        }, 2e3, function () {
            $(this).stop().animate({
                opacity: 1
            }, 2e3)
        })
    });
    $(".unfadable").each(function () {
        $(this).stop()
    })
}

function lockExercise() {
    $(".draggable").each(function () {
        $(this).css("pointer-events", "none")
    });
    $(".clone").each(function () {
        $(this).css("pointer-events", "none")
    });
    $("input").each(function () {
        $(this).css("pointer-events", "none")
    })
}

function clearExercise() {
    $(".centerpiece").empty();
    $(".draggable").remove();
    $(".cloneable").remove();
    $(".clone").remove();
    $(".viewholder").empty();
    $(".viewholder").find("div").each(function () {
        $(this).hasClass("centerpiece") || $(this).remove()
    })
}
var oldType, currentUrl = window.location.pathname,
    successCounter, successRate, totalTries, maxTries, currentTries, currentEx, totalEx = $(".wizard-steps li").length,
    result, challenge = !1;
$(document).ready(function () {
    onLoad();
    onClick()
});