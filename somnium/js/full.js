var change_speed = 750;
var release_times, times;
function moving_sections(navindex, length){
    $(".quick").animate({marginTop: $(".quick").height()/2 - ($(".quick li").outerHeight(true) * navindex)}, change_speed);
    $(".quick li").removeClass("on").eq(navindex).addClass("on");
    $(".header ul.nav li a").removeClass("on").eq(navindex).addClass("on");
    moving_underbar(navindex);
    $(".fullpage").stop().animate({"top": -length + "px"}, change_speed, "easeInOutQuint");
    $(".pagination b").text(navindex+1);
    if($(".fullsections").eq(navindex).find(".inner").length > 0){
        $(".inner").addClass("on");
    }else{
        $(".inner").removeClass("on");
    }
    if(navindex == 1 || navindex == 4 || navindex == 5){
        setTimeout(function(){
            $(".header").addClass("dark");
            if(navindex == 1){
                if($(".full3 .room_01").hasClass("wait_scroll")){
                   setTimeout(function(){
                        $("#exhibition.full2 .mark_01").addClass("wc");
                    }, 2000);
                    setTimeout(function(){
                        $("#exhibition.full2 .mark_01").removeClass("wc");
                    }, 2800);
                   }
            }else{
                $(".btn.btn_h, .quick, .inner").addClass("dark");
            }
        }, change_speed/2);
    }else{
        $(".header").removeClass("dark");
        $(".btn.btn_h, .quick, .inner").removeClass("dark");
    }
    $(".fullsections").eq(navindex).removeClass("wait_scroll");
    if(navindex == 2){
        $(".full3 .room_01").removeClass("wait_scroll");
    }else if(navindex == 5){
        $(".full6 .docent").removeClass("wait_scroll");
    }
    
    $("body").addClass("locked");
    setTimeout(function(){
        $("body").removeClass("locked");
    }, change_speed);
    
    var subcounter = $(".fullsections").eq(navindex).find(".full_sub_con").attr("data-index");
    slide_lock(subcounter);
    del_inner();
    create_inner(navindex, subcounter);
}

function moving_underbar(a){
    var current_section = $(".header ul.nav li").eq(a).width();
    var underbar_position = 0;
    for(i = 0; i < a; i++){
        underbar_position += $(".header ul.nav li").eq(i).width();
    }
    underbar_position += a*40;
    $(".header ul.nav li.under_bar").css({width: current_section, left: 40+underbar_position});
}

function create_inner(a, b){
    var page_section = $(".full"+(a+1)).find(".full_sub");
    for(i = 0; i < page_section.length; i++){
        $(".full"+(a+1)+" .inner ul").append("<li></li>");
    }
    $(".full"+(a+1)+" .inner ul li").eq(b-1).addClass("on");
    $(".full"+(a+1)+" .inner").css({marginRight: 24 * (b-1)});
}
function del_inner(){
    $(".fullsections").each(function(){
        $(this).find(".inner ul li").remove();
    });
}

function moving_pages(a, b){
    var c = $(".quick li.on").index();
    $(".full"+(c+1)+" .inner li").removeClass("on").eq(a-1).addClass("on");
    $(".full"+(c+1)+" .full_sub").eq(a-1).removeClass("wait_scroll");
    if(c == 2){
        setTimeout(function(){
            $(".full3 .full_sub").removeClass("on");
            $(".full3 .full_sub").eq(a-1).addClass("on");
        }, change_speed/2);
    }
    $(".full"+(c+1)+" .full_sub_con").stop().animate({left: -b}, change_speed).attr("data-index", (a));
    $(".full"+(c+1)+" .inner").stop().animate({marginRight: 24 * (a-1)}, change_speed);
    slide_lock(a);
    
    if(c == 4){
        var page_width = $("#museum.full5 .full_sub_con .full_sub").width();
        $("#museum.full5 .full_sub_con .shadow").stop().animate({left: -page_width + b}, change_speed);
    }
}

function slide_lock(a){
    $(".slide_btn_left, .slide_btn_right").removeClass("disabled");
    if(a == 1){
        $(".slide_btn_left").addClass("disabled");
    }else if(a == 3){
        $(".full3 .slide_btn_right, .full6 .slide_btn_right").addClass("disabled");
    }else if(a == 6){
        $(".full5 .slide_btn_right").addClass("disabled");
    }else{
        $(".slide_btn_left, .slide_btn_right").removeClass("disabled");
    }
}

function quick_click(){
    $(".quick li, .header ul.nav li").click(function(){
        var navindex = $(this).index();
        var length = 0;
        for(var i = 1; i < (navindex+1); i++){
            length += $(".full"+i).height();
        }
        moving_sections(navindex, length);
        return false;
    });
}

function inner_click(){
    $(document).on("click", ".inner ul li", function(){
        var sub_index = $(this).index();
        var sub_width = 0;
        for(var i = 1; i < (sub_index+1); i++){
            sub_width += $(".full_sub").width();
        }
        moving_pages((sub_index+1), sub_width);
    })
}

function full_set(){
    var page_index = $(".fullsections").length;
    $(".pagination span").text(page_index);
    for(var i = 1; i <= page_index; i++){
        $(".fullpage .quick ul").append("<li></li>");
    }
    $(".quick").css({marginTop: $(".quick").height()/2});
    $(".fullpage .quick ul li:first-child").addClass("on");
    
    $(window).on("mousewheel DOMMouseScroll", function(event){
        clearTimeout(times);
        times = setTimeout(function(){
            $("body").removeClass("locked");
        }, change_speed);
        event.preventDefault();
        if(!$("body").hasClass("locked")){
            $("body").addClass("locked");
            var page = $(".quick li.on");
            if($("body").find(".fullpage:animated").length >= 1){
                return false;
            }
            if(event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0){
                var prev = page.index();
                var length = 0;
                for(var i = 1; i < prev; i++){
                    length += $(".full"+i).height();
                }
                if(page.index() > 0){
                    page = page.index()-1;
                    moving_sections(page, length);
                }else{
                    //첫번째 섹션일 땐 동작안함
                }
            }else{
                var next = page.index()+1;
                var last_num = $(".quick li").length;
                if(next < last_num){
                    var length = 0;
                    for(var i = 1; i < next+1; i++){
                        length += $(".full"+i).height();
                    }
                    moving_sections(next, length);
                }else{
                    //마지막 섹션일 땐 동작안함
                    $("body").removeClass("locked");
                }
            }
        }else{
            return false;
        }
        clearTimeout(release_times);
        release_times = setTimeout(function(){
            $("body").removeClass("locked");
        }, change_speed);
    });
    $(window).resize(function(){
        var resize_index = $(".quick li.on").index();
        var legnth = 0;
        for(var i = 1; i < (resize_index+1); i++){
            legnth += $(".full"+i).height();
        }
        $(".fullpage").stop().animate({"top": -legnth + "px"}, 0);
        sub_resize();
    });
}
var prnts_w, prnts_h;
function sub_resize(){
    $(".full_sub").each(function(){
            prnts_w = $(this).parents(".fullsections").width();
            prnts_h = $(this).parents(".fullsections").height();
            $(this).css({width: prnts_w, height: prnts_h});
        });
        $(".full_sub_con").each(function(){
            $(this).width(prnts_w * $(this).find(".full_sub").length);
        });
    $(".shadow").css({height: prnts_h});
    var $led = $("#gallery.full3 .full_sub_con .full_sub.room_01 .full_con.side_top .led"),
        led_counter = $led.length,
        led_margin = (prnts_w - ($led.width() * led_counter)) / (led_counter * 2);
    $("#gallery.full3 .full_sub_con .full_sub .full_con.side_top .led, .reflect").css({margin: "0 "+(led_margin)+"px"});
}


function full_sub_sizing(){
    sub_resize();
    $(".slide_btn_left, .slide_btn_right").each(function(){
        $(this).click(function(){
            var sub_counter = parseInt($(this).parents(".fullsections").find(".full_sub_con").attr("data-index"));
            var move_w = prnts_w;
            if($(this).hasClass("slide_btn_left")){
                if(sub_counter > 1){
                    sub_counter -=1;
                }else{
                    //첫번째 페이지일 땐 작동안함
                }
            }else{
                if(sub_counter < $(this).parents(".fullsections").find(".full_sub").length){
                    sub_counter +=1;
                }else{
                    // 마지막 페이지일 땐 작동안함
                }
            }
            move_w = move_w * (sub_counter-1);
            moving_pages(sub_counter, move_w);
        });
    });
}

function moving_drag(){
    $(".full_sub_con").each(function(){
        $(this).draggable({
            axis:"x",
            stop: function(){
                var page_counter = $(this).attr("data-index");
                var move_w = prnts_w,
                    a = $(this).offset().left,
                    page_w = prnts_w * page_counter,
                    b = page_w + a;
                if(b > move_w){
                    if(page_counter > 1){
                        page_counter--;
                    }else{
                        
                    }
                }else{
                    if(page_counter < $(this).find(".full_sub").length){
                        page_counter++;
                    }else{
                        
                    }
                }
                move_w = move_w * (page_counter - 1);
                moving_pages(page_counter, move_w);
            }
        },100);
    });
}

function moving_key(){
    $(document).keydown(function(event){
        if(!$("body").hasClass("locked")){
            var key = event.keyCode;
            var page = $(".quick li.on");
            var a = page.index();
            var page_ct = parseInt($(".full"+(a+1)+" .full_sub_con").attr("data-index"));
            var move_w = prnts_w;
            if(key == 38){ //키보드 위 화살표
                var prev = page.index();
                var length = 0;
                for(var i = 1; i < prev; i++){
                    length += $(".full"+i).height();
                }
                if(page.index() > 0){
                    page = page.index()-1;
                    moving_sections(page, length);
                }else{
                    //첫번째 섹션일 땐 동작안함
                }
            }else if(key == 40){ //키보드 아래 화살표
                var next = page.index()+1;
                var last_num = $(".quick li").length;
                if(next < last_num){
                    var length = 0;
                    for(var i = 1; i < next+1; i++){
                        length += $(".full"+i).height();
                    }
                    moving_sections(next, length);
                }else{
                    //마지막 섹션일 땐 동작안함
                }
            }else if(key == 37 || key == 39){
                if(a == 2 || a == 4 || a == 5){
                    if(key == 37){ //왼쪽 화살표
                        if(page_ct <= 1){
                            
                        }else{
                            page_ct--;
                            move_w = move_w * (page_ct-1);
                            moving_pages(page_ct, move_w);
                        }
                    }else{ //key가 39 (오른쪽 화살표)
                        var length = $(".full"+(a+1)+" .full_sub").length;
                        if(page_ct >= length){
                            
                        }else{
                            move_w = move_w * (page_ct);
                            moving_pages((page_ct+1), move_w);
                            page_ct++;
                        }
                    }
                }
            }else if(key == 71){
                $(".guide_line").toggleClass("on");
            }
        }
    });
}

function loading(){
    $(".loading_cover .person, .loading_cover .light, .loading_cover .loading_title").addClass("on");
    $("body").addClass("locked");
    setTimeout(function(){
        $(".loading_cover").fadeOut(1000, function(){
            $(this).remove();
            $("body").removeClass("locked");
        });
        $("#home.full1 img").addClass("on");
        $("#home.full1").removeClass("wait_scroll");
    }, 2000);
}

$(window).load(function(){
    $("#exhibition.full2 .bookmark").each(function(){
        $(this).click(function(){
            var mark = $(this).index();
            $("#exhibition.full2 .bookmark, .close").removeClass("on");
            $(this).addClass("on");
            $(".close").addClass("on");
            setTimeout(function(){
                $("#exhibition.full2 .full_con").css({display: "none"});
            }, 500);
            if(mark == 1){
                $(".header ul.nav li a.on").addClass("white");
            }else{
                $(".header ul.nav li a.on").removeClass("white");
            }
        });
    });
    $("#exhibition.full2 .close").click(function(){
        $("#exhibition.full2 .bookmark, .close").removeClass("on");
        $("#exhibition.full2 .full_con").css({display: "block"});
        $(".header ul.nav li a.on").removeClass("white");
    });
    
    $("#gallery").mousemove(function(event){
        var x = event.pageX,
            c_x = $(window).width(),
            y = event.pageY,
            c_y = $(window).height();
        var m_x = (x-(c_x/2))/c_x*6;
        var m_y = (y-c_y/2)/c_y*2;
        $("#gallery.full3 .full_sub_con").css({transform: "rotate3d(1, 0, 0, "+m_y/2+"deg) rotate3d(0, 1, 0, "+m_x/2+"deg) rotate3d(0, 0, 1, 0deg)"});
    });
    loading();
    inner_click();
});

$(function(){
    full_set();
    quick_click();
    full_sub_sizing();
    moving_drag();
    moving_key();
    moving_underbar();
});