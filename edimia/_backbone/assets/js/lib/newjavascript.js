var number_image_generator = {
    new_number_image: function (m, l, K, G, a, z, g, D, F, o, p, h) {
        var u = K;
        var e, I;
        if (D != null) {
            e = D
        } else {
            e = false
        } if (F != null) {
            I = F
        } else {
            cloneeable = false
        }
        var v;
        if (p != null) {
            v = p
        }
        var E = m;
        var s = l;
        var d = G;
        var b = document.createElement("div");
        var H = a / 2;
        var t;
        var r;
        if (g == null) {
            t = "left";
            r = "top"
        } else {
            t = g.split("_")[0];
            r = g.split("_")[1]
        }
        var A;
        if (z == null) {
            A = "top"
        } else {
            A = z
        }
        $(b).addClass("number_image_holder").prop("value", u);
        var j = document.createElement("div");
        if (D == true) {
            $(j).addClass("drag_item_bgdiv").appendTo(b).css({
                position: "absolute"
            })
        }
        var f = String(u).split("");
        var c = 0;
        var k = 0;
        if (d == "number") {
            $(b).css({
                position: "absolute",
                width: v.width,
                height: v.size
            });
            var w = document.createElement("div");
            $(w).appendTo(b);
            $(w).css({
                color: v.color,
                "font-size": v.size,
                "font-family": v.family,
                cursor: "default",
                position: "absolute",
                width: "100%",
                height: "100%",
                let: 0,
                top: 0,
                "pointer-events": "none"
            });
            $(w).text(String(K));
            $(j).css({
                width: $(b).width(),
                height: $(b).height() + 20
            });
            $(j).css({
                left: $(b).width() / 2 - $(j).width() / 2,
                top: 0
            });
            if ($(b).prop("placed") == true) {} else {
                $(b).css({
                    left: E,
                    top: s,
                })
            } if (v.spacing != null) {
                $(w).css({
                    "letter-spacing": v.spacing + "px"
                })
            }
            if (e) {
                if ($(b).prop("placed") == true) {} else {
                    $(b).css("right", E).prop("startX", E);
                    $(b).css("top", s).prop("startY", s)
                }
            }
            if (I) {
                $(b).css("top", s);
                $(b).css("right", E)
            }
        } else {
            if (d == "single_image") {
                console.log("generating single image,", h);
                $(b).css({
                    position: "absolute"
                });
                var J = new Image();
                $(J).attr("src", h);
                $(J).addClass("number_image_content").appendTo(b).css("opacity", 0);
                $(J).imagesLoaded().progress(function (L, y) {
                    console.log("ball image loaded");
                    var x = y.img;
                    $(x).css({
                        opacity: 1,
                        position: "absolute",
                        left: 0,
                        top: 0
                    });
                    var i = y.isLoaded ? "loaded" : "broken";
                    n = $(x).width() * H;
                    C = $(x).height() * H;
                    if (C > c) {
                        c = C
                    }
                    $(b).css({
                        width: n,
                        height: c,
                        padding: 0
                    });
                    $(x).css({
                        width: n,
                        height: C,
                        left: 0,
                        top: 0,
                        margin: 0
                    });
                    if ($(b).prop("placed") == true) {
                        $(b).css({
                            left: $($(b).parent()).width() / 2 - $(b).width() / 2,
                            top: $($(b).parent()).height() / 2 - $(b).height() / 2
                        });
                        $(b).prop("startY", $(b).prop("startY") - (s));
                        $(j).addClass("hidden");
                        if ($(b).hasClass("clone")) {
                            $(b).css({
                                left: E,
                                top: s
                            })
                        }
                    }
                    $(j).css({
                        display: "none"
                    })
                });
                if (I) {
                    $(b).css("top", s);
                    $(b).css("right", E)
                }
            }
        }
        for (var B = 0; B < f.length; B++) {
            var J = new Image();
            var q = "number-image-";
            var n;
            var C;
            $(J).hide();
            switch (d) {
            case "block":
                q += "block-" + f[B] * Math.pow(10, f.length - B - 1);
                if (f.length - B - 1 == 0) {
                    q += "-red"
                } else {
                    if (f.length - B - 1 == 1) {
                        q += "-blue"
                    }
                }
                break;
            case "kr":
                q += "kr-" + f[B] * Math.pow(10, f.length - B - 1);
                break;
            case "kr-true":
                q += "kr-" + f[B] * Math.pow(10, f.length - B - 1);
                if (f[B] * Math.pow(10, f.length - B - 1) < 10) {
                    q += "-true"
                }
                break
            }
            if (d != "number" && d != "single_image") {
                $(J).attr({
                    src: "/assets/images/" + q + ".png",
                }).prop("disabled", true);
                $(J).addClass("number_image_content").appendTo(b);
                $(J).imagesLoaded().progress(function (N, M) {
                    var L = M.img;
                    $(L).show();
                    var i = M.isLoaded ? "loaded" : "broken";
                    n = $(L).width() * H;
                    C = $(L).height() * H;
                    if (C > c) {
                        c = C
                    }
                    k += n + 10;
                    $(b).css("width", k);
                    $(L).css({
                        width: n,
                        height: C
                    });
                    var y;
                    var x;
                    $(b).find("img").each(function () {
                        switch (A) {
                        case "bottom":
                            $(this).css("margin-top", c - $(this).height());
                            break;
                        case "center":
                            $(this).css("margin-top", (c - $(this).height()) / 2);
                            break
                        }
                        switch (r) {
                        case "top":
                            x = s;
                            break;
                        case "center":
                            x = s - c / 2;
                            break;
                        case "bottom":
                            x = s - c;
                            break
                        }
                        if ($(b).prop("placed") == true) {} else {
                            $(b).css("top", x)
                        }
                        switch (t) {
                        case "left":
                            y = E;
                            break;
                        case "center":
                            y = E - $(b).width() / 2;
                            break;
                        case "right":
                            y = E - $(b).width();
                            break
                        }
                        if ($(b).prop("placed") == true) {} else {
                            $(b).css("top", x)
                        } if (e || I) {} else {
                            $(b).css("top", x);
                            $(b).css("left", y)
                        }
                    });
                    if ($(b).prop("placed") == true) {
                        $(b).css({
                            left: $($(b).parent()).width() / 2 - $(b).width() / 2,
                            top: $($(b).parent()).height() / 2 - $(b).height() / 2
                        });
                        $(b).prop("startY", $(b).prop("startY") - (s));
                        $(j).addClass("hidden");
                        if ($(b).hasClass("clone")) {
                            $(b).css({
                                left: E,
                                top: s
                            })
                        }
                    } else {
                        $(b).prop("startY", $(b).offset().top);
                        $(b).prop("startX", $(window).width() - $(b).offset().left - $(b).width())
                    }
                    $(j).css({
                        width: $(b).width() + 20,
                        height: $(b).height() + 20
                    });
                    $(j).css({
                        left: $(b).width() / 2 - $(j).width() / 2 + 5,
                        top: $(b).height() / 2 - $(j).height() / 2
                    })
                })
            }
        }
        if (o == null) {
            $(b).appendTo($(".viewholder"))
        } else {
            $(b).appendTo($(o))
        } if (e) {
            $(b).addClass("draggable").prop("id", "number_image" + String(Math.random() * 10000000000000000000) + "_" + String(l)).addClass("stackable").css({
                right: E,
                left: "auto",
                top: s,
                bottom: "auto"
            })
        } else {
            if (I) {
                $(b).addClass("cloneable").prop("id", "number_image" + String(Math.random() * 10000000000000000000) + "_" + String(m)).addClass("stackable");
                $(b).css({
                    top: s,
                    bottom: "auto"
                });
                $(b).css({
                    right: E,
                    left: "auto"
                })
            } else {}
        }
        return (b)
    }
};

function activate_drag(a) {
    $(".draggable").draggable({
        containment: ".viewholder",
        start: function () {},
        stop: function (b, c) {},
        revert: function (c, d) {
            var b;
            if ($(this).offset() == undefined) {
                b = $(this).css("right")
            } else {
                b = $(".viewholder").width() - $(this).offset().left - $(this).width()
            } if (c == false) {
                $(this).css({
                    left: "auto",
                    right: b
                })
            }
            $(this).data("uiDraggable").originalPosition = {
                top: $(this).prop("startY"),
                right: $(this).prop("startX")
            };
            return !c
        },
        stack: ".stackable"
    }).each(function () {
        if ($(this).prop("placed") != true) {
            $(this).prop("locked", false)
        }
    });
    $(".ui-draggable").mousedown(function () {
        var d = $(this);
        var c = $(d).offset().left;
        var b = $(d).offset().top;
        $(this).find(".drag_item_bgdiv").each(function () {
            $(this).removeClass("hidden")
        });
        if (!$(d).hasClass("clone")) {
            $(d).css({
                top: b,
                left: c,
                right: "auto"
            });
            $(d).detach().appendTo(".viewholder");
            $(d).prop("locked", false);
            $(".drop_area.ui-droppable").each(function () {
                $(this).addClass("active");
                var e = $(this).prop("contents");
                var g = $(d).attr("id");
                if ($.inArray(g, e) > -1) {
                    e.splice(e.indexOf(g), 1);
                    $(this).prop("contents", e)
                }
                if (a != false) {
                    var f = drop_area;
                    f.check("lift")
                }
            })
        }
    });
    $(".ui-draggable").mouseup(function () {
        $(".drop_area.ui-droppable").each(function () {
            $(this).removeClass("active")
        })
    });
    $(".cloneable").each(function () {
        var c;
        var b;
        $(this).draggable({
            helper: "clone",
            containment: ".viewholder",
            stack: ".stackable",
            start: function (d, e) {
                $(this).css("z-index", "0");
                b = "set_item" + String(Math.random() * 10000000000000000000);
                $(this).attr("id", b + "clone");
                $(".ui-droppable").addClass("active")
            },
            stop: function (d, e) {
                $(this).after(c = $(e.helper).clone().draggable({
                    containment: "html",
                    stack: ".stackable"
                }).css("z-index", "99").attr("id", b + "clone").prop("value", $(this).prop("value")).addClass("clone").prop("droparea", $(this).prop("droparea")));
                $(this).attr("id", String(Math.random() * 10000000000000000000));
                $(".ui-droppable").removeClass("active");
                activateClone(c, a)
            }
        })
    })
}

function activate_drag2() {
    $(".draggable").draggable({
        containment: ".viewholder",
        start: function () {},
        stop: function (a, b) {},
        stack: ".stackable"
    })
}

function activateClone(b, a) {
    console.log("activating clone");
    $(b).css({
        left: $(b).offset().left - $(".centerpiece").offset().left
    });
    $(b).detach().appendTo(".centerpiece");
    $(b).draggable({
        containment: ".viewholder",
        stack: ".stackable"
    }).each(function () {
        $(this).prop("locked", false)
    });
    $(b).mousedown(function () {
        var c = $(this);
        var d = parseInt($(this).css("top").split("px")[0]);
        $(c).prop("locked", false);
        $(".drop_area.ui-droppable").each(function () {
            $(this).addClass("active");
            var e = $(this).prop("contents");
            var g = $(c).attr("id");
            if ($.inArray(g, e) > -1) {
                e.splice(e.indexOf(g), 1);
                $(this).prop("contents", e)
            }
            if (a != false) {
                var f = drop_area;
                f.check("lift")
            }
        })
    });
    $(b).mouseup(function () {
        $(".drop_area.ui-droppable").each(function () {
            $(this).removeClass("active")
        })
    })
}
var drop_area = {
    new_drop_area: function (m, l, n, f, d, j, a, p) {
        var g = m;
        var e = l;
        var c = n;
        var o = f;
        var b = document.createElement("div");
        var i = document.createElement("div");
        $(i).appendTo(b).addClass("drop_area_bgdiv");
        var k;
        if (p == true) {
            k = document.createElement("div");
            $(k).appendTo(b)
        }
        if (a == null) {
            $(b).appendTo($(".viewholder"))
        } else {
            $(b).appendTo(a)
        }
        $(b).addClass("drop_area").attr("id", "drop_area" + String(d)).css("left", g).css("top", e).css("width", c).css("height", o);
        $(b).prop("contents", new Array());
        $(b).prop("single_answer", NaN);
        $(b).prop("type", j);
        $(b).droppable({
            greedy: "false",
            accept: function () {
                return true
            },
            drop: function (h, x) {
                var u = $(this).prop("contents");
                u.push($($(x.draggable).context).attr("id"));
                var r = $(x.draggable).context;
                $(r).prop("locked", true);
                $(r).prop("droparea", $(this).attr("id"));
                if ($(r).hasClass("clonable")) {}
                $(r).find(".drag_item_bgdiv").each(function () {
                    $(this).addClass("hidden")
                });
                if (!$(r).hasClass("cloneable") && !$(r).hasClass("clone")) {
                    var z = $(r).offset().left - $(this).offset().left;
                    var y = $(r).offset().top - $(this).offset().top;
                    $(r).css({
                        top: y,
                        left: z,
                        right: "auto"
                    });
                    $(r).detach().appendTo($(this));
                    $(r).stop().animate({
                        left: $(this).width() / 2 - $(r).width() / 2,
                        top: $(this).height() / 2 - $(r).height() / 2
                    }, 300)
                }
                if (p == true) {
                    console.log("!!!!!!!", $(r).find("img").attr("src"));
                    $("#" + $(b).prop("current_single")).remove();
                    var w = $(r).html();
                    var s = $(k).find("img");
                    $(s).css({
                        position: "absolute"
                    });
                    $(k).css({
                        position: "absolute",
                        width: $(s).width(),
                        height: $(s).height(),
                        left: $(this).width() / 2 - $(s).width() / 2,
                        top: $(this).height() / 2 - $(s).height() / 2,
                        "pointer-events": "none"
                    });
                    var t = $(r).find("img").attr("src");
                    $(b).prop("single_answer", $($(x.draggable).context).prop("value"));
                    console.log($(this).prop("single_answer"));
                    var q = $($(x.helper).context).attr("id");
                    var v = q.match("clone");
                    setTimeout(function () {
                        var C = $("#" + q);
                        $(b).prop("current_single", q);
                        var B = $(b).offset().left + $(b).width() / 2 - $(C).width() / 2 - $(".centerpiece").offset().left;
                        var A = $(b).offset().top + $(b).height() / 2 - $(C).height() / 2 - $(".centerpiece").offset().top;
                        console.log("moving to:", B, A);
                        $(C).stop().animate({
                            left: B,
                            top: A
                        }, 300);
                        $(C).mousedown(function () {
                            $(b).prop("current_single", "");
                            $(b).prop("single_answer", NaN)
                        })
                    }, 10);
                    console.log("lksdfjslkfjslkfdjslkfdj", $(b).prop("single_answer"))
                }
                $(this).prop("contents", u);
                drop_area.reset($(this))
            }
        });
        $(document).keyup(function (h) {
            if (h.keyCode == 32) {}
        });
        return (b)
    },
    reset: function (a) {
        var b = a;
        $(b).removeClass("correct")
    },
    clear: function (a) {
        var b = a;
        $(b).prop("contents", new Array())
    },
    check: function (b) {
        var c;
        if (b == null) {
            c = "drop"
        } else {
            c = b
        }
        var a = new Array();
        $(".drop_area").each(function () {
            var d = $(this).prop("type");
            switch (d) {
            case "same":
                a.push(drop_area.check_matching_set($(this), c));
                break;
            case "sum":
                a.push(drop_area.check_sum_of_set($(this), c));
                break;
            case "sum_clones":
                a.push(drop_area.check_sum_of_clones($(this), c));
                break
            }
        });
        if (c == "drop") {
            return (a)
        }
    },
    unlock_contents: function (b) {
        var a = $(b).prop("contents");
        $.each(a, function () {
            var c = $("#" + this);
            $(c).prop("locked", false)
        })
    },
    send_back_contents: function () {
        $(".draggable").each(function () {
            var f = this;
            if ($(f).prop("locked") == false) {
                var d = $(f).offset().left;
                var b = $(f).offset().top;
                $(f).css({
                    top: b,
                    left: d,
                    right: "auto"
                });
                $(f).detach().appendTo(".viewholder");
                var c = $(f).prop("startX");
                var a = $(f).prop("startY");
                var e = parseInt($(f).css("left").replace("px", ""));
                $(f).css({
                    left: "auto",
                    right: $(".viewholder").width() - e - $(f).width()
                });
                $(f).stop().animate({
                    right: c,
                    top: a
                }, 300);
                $(f).find(".drag_item_bgdiv").each(function () {
                    $(this).removeClass("hidden")
                })
            }
        })
    },
    send_back_contents0: function (b) {
        var a = $(b).prop("contents");
        $.each(a, function () {
            var f = $("#" + this);
            var d = $(f).prop("startX");
            var c = $(f).prop("startY");
            var e = parseInt($(f).css("left").replace("px", ""));
            $(f).css({
                left: "auto",
                right: $(".viewholder").width() - e - $(f).width()
            });
            $(f).stop().animate({
                right: d,
                top: c
            }, 300)
        })
    },
    check_matching_set: function (c, d) {
        var a;
        var k = c;
        $(k).removeClass("correct");
        var j = new Array();
        var f = new Array();
        var g = $(k).prop("contents");
        for (var e = 0; e < g.length; e++) {
            var l = $("#" + String(g[e]));
            f.push(l);
            j.push($(l).prop("value"))
        }
        if (j.length > 1) {
            var m = 0;
            for (var b = 0; b < j.length; b++) {
                for (var h = 0; h < j.length; h++) {
                    if (j[b] != j[h]) {
                        m += 1
                    } else {}
                }
            }
            if (m == 0) {
                if (d == "drop") {
                    $(k).addClass("correct");
                    a = true
                }
            } else {
                if (d == "drop") {
                    drop_area.unlock_contents(k);
                    drop_area.send_back_contents();
                    drop_area.clear(c);
                    a = false
                }
            }
        }
        return (a)
    },
    check_sum_of_set: function (c, d) {
        var a;
        var k = c;
        $(k).removeClass("correct");
        var j = new Array();
        var f = new Array();
        var g = $(k).prop("contents");
        for (var e = 0; e < g.length; e++) {
            var l = $("#" + String(g[e]));
            f.push(l);
            j.push($(l).prop("value"))
        }
        var h = 0;
        for (var b = 0; b < j.length; b++) {
            h += parseInt(j[b])
        }
        console.log("checking sum of set", String(h), String($(k).prop("value")));
        if (String($(k).prop("value")) == String(h)) {
            if (d == "drop") {
                $(k).addClass("correct");
                for (e = 0; e < g.length; e++) {
                    l = $("#" + String(g[e]));
                    $(l).prop("locked", true);
                    a = true
                }
            }
        } else {
            if (d == "drop") {
                drop_area.unlock_contents(k);
                drop_area.send_back_contents();
                drop_area.clear(c);
                a = false
            }
        }
        f = [];
        return (a)
    },
    check_sum_of_clones: function (c, d) {
        console.log("checking sum of clones", String($(k).prop("value")));
        var a;
        var k = c;
        $(k).removeClass("correct");
        var j = new Array();
        var f = new Array();
        var g = $(k).prop("contents");
        for (var e = 0; e < g.length; e++) {
            var l = $("#" + String(g[e]));
            f.push(l);
            j.push($(l).prop("value"))
        }
        var h = 0;
        for (var b = 0; b < j.length; b++) {
            h += parseInt(j[b])
        }
        console.log("checking sum of clones", String(h), String($(k).prop("value")));
        if (String($(k).prop("value")) == String(h)) {
            if (d == "drop") {
                $(k).addClass("correct");
                for (e = 0; e < g.length; e++) {
                    l = $("#" + String(g[e]));
                    $(l).prop("locked", true);
                    a = true
                }
            }
        } else {
            if (d == "drop") {
                a = false
            }
        }
        return (a)
    }
};
var answer_analyser = {
    check_for_error: function (a) {
        var b = false;
        $.each(a, function (c) {
            if (this == false) {
                b = true
            }
        });
        return (b)
    }
};