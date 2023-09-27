$.fn.preload = function(){
    this.each(function(){
        $('<img/>')[0].src = this;
    });
}
$(["img/img_favicon.png",
   "img/ratio_1_1.png",
   "img/ratio_2_3.png",
   "img/ratio_3_2.png",
   "img/ratio_4_3.png",
   "img/ratio_16_9.png",
   "img/about/img_about_01.jpg",
   "img/about/img_about_02.jpg",
   "img/about/img_about_03.jpg",
   "img/collaboration/img_collabo_01.jpg",
   "img/collaboration/type370/img_collabo_02.jpg",
   "img/collaboration/type370/img_collabo_03.jpg",
   "img/collaboration/type370/img_collabo_04.jpg",
   "img/collaboration/type390/img_collabo_05.jpg",
   "img/collaboration/type390/img_collabo_06.jpg",
   "img/collaboration/type390/img_collabo_07.jpg",
   "img/collaboration/popup/type370/img_collabo_popup_01.jpg",
   "img/collaboration/popup/type370/img_collabo_popup_02.jpg",
   "img/collaboration/popup/type370/img_collabo_popup_03.jpg",
   "img/collaboration/popup/type370/img_collabo_popup_04.jpg",
   "img/collaboration/popup/type390/img_collabo_popup_05.jpg",
   "img/collaboration/popup/type390/img_collabo_popup_06.jpg",
   "img/collaboration/popup/type390/img_collabo_popup_07.jpg",
   "img/collaboration/popup/type390/img_collabo_popup_08.jpg",
   "img/collaboration/popup/img_collabo_popup_bg_01.jpg",
   "img/collaboration/popup/img_collabo_popup_bg_02.jpg",
   "img/collection/tondaPF/img_collection_01.jpg",
   "img/collection/tondaPF/img_collection_02.jpg",
   "img/collection/tondaPF/img_collection_03.jpg",
   "img/collection/tondaPF/img_collection_04.jpg",
   "img/collection/tondaPF/img_collection_05.jpg",
   "img/collection/tondaGT/img_collection_06.jpg",
   "img/collection/tondaGT/img_collection_07.jpg",
   "img/collection/tondaGT/img_collection_08.jpg",
   "img/collection/tondaGT/img_collection_09.jpg",
   "img/collection/tondaGT/img_collection_10.jpg",
   "img/expertise/img_expertise_01.jpg",
   "img/expertise/img_expertise_02.jpg",
   "img/expertise/img_expertise_03.jpg",
   "img/expertise/img_expertise_04.jpg",
   "img/expertise/img_expertise_05.jpg",
   "img/expertise/img_expertise_06.jpg",
   "img/expertise/img_expertise_07.jpg",
   "img/expertise/img_expertise_08.jpg",
   "img/footer/img_footer_01.png",
   "img/footer/img_footer_02.png",
   "img/header/img_header_01.png",
   "img/header/img_header_02.png",
   "img/header/img_header_mobile_logo.png",
   "img/heritage/img_heritage_1976.jpg",
   "img/heritage/img_heritage_1996.jpg",
   "img/heritage/img_heritage_2000.jpg",
   "img/heritage/img_heritage_2004.jpg",
   "img/heritage/img_heritage_2011.jpg",
   "img/heritage/img_heritage_2020.jpg",
   "img/loading_cover/img_loading_cover.png",
   "img/loading_cover/img_loading_cover_02.png",
   "img/loading_cover/img_loading_cover_03.png",
   "img/loading_cover/img_loading_cover_04.png",
   "img/loading_cover/img_loading_cover_05.png",
   "img/loading_cover/img_loading_cover_06.png",
   "img/loading_cover/img_loading_cover_07.png",
   "img/loading_cover/img_loading_cover_08.png",
   "img/loading_cover/img_loading_cover_09.png",
   "img/loading_cover/img_loading_cover_10.png",
   "img/material/img_material_01.jpg",
   "img/material/img_material_02.jpg",
   "img/material/img_material_03.jpg",
   "img/material/img_material_04.jpg",
   "img/service/img_service_01.jpg",
   "img/service/img_service_02.jpg",
   "img/service/img_service_03.jpg",
   "img/service/img_service_04.jpg",
   "img/service/img_service_05.jpg",
   "img/service/img_service_06.jpg",
   "img/service/img_service_07.jpg",
   "img/service/img_service_08.jpg",
   "img/service/img_service_09.jpg",
   "img/service/img_service_10.jpg",
   "img/signature/img_sig_01.png",
   "img/signature/img_sig_02.png",
   "img/signature/img_sig_03.png",
   "img/signature/img_sig_04.png",
   "img/signature/img_sig_bg.jpg",
   "img/signature/img_sig_hover_01.png",
   "img/signature/img_sig_hover_02.png",
   "img/signature/img_sig_hover_03.png",
   "img/signature/img_sig_hover_04.png",
   "img/signature/img_sig_no_hover_01.png",
   "img/signature/img_sig_no_hover_02.png",
   "img/signature/img_sig_no_hover_03.png",
   "img/signature/img_sig_no_hover_04.png",
   "img/visual/watch_niddle/img_visual_date.png",
   "img/visual/watch_niddle/img_visual_date_shadow.png",
   "img/visual/watch_niddle/img_visual_date_ratio.png",
   "img/visual/watch_niddle/img_visual_hour.png",
   "img/visual/watch_niddle/img_visual_hour_shadow.png",
   "img/visual/watch_niddle/img_visual_hour_ratio.png",
   "img/visual/watch_niddle/img_visual_minute.png",
   "img/visual/watch_niddle/img_visual_minute_shadow.png",
   "img/visual/watch_niddle/img_visual_minute_ratio.png",
   "img/visual/watch_niddle/img_visual_month.png",
   "img/visual/watch_niddle/img_visual_month_shadow.png",
   "img/visual/watch_niddle/img_visual_month_ratio.png",
   "img/visual/watch_niddle/img_visual_moon.png",
   "img/visual/watch_niddle/img_visual_moon_ratio.png",
   "img/visual/watch_niddle/img_visual_moon_bg.png",
   "img/visual/watch_niddle/img_visual_moon_bg_ratio.png",
   "img/visual/watch_niddle/img_visual_second.png",
   "img/visual/watch_niddle/img_visual_second_shadow.png",
   "img/visual/watch_niddle/img_visual_second_ratio.png",
   "img/visual/watch_niddle/img_visual_day.png",
   "img/visual/watch_niddle/img_visual_day_shadow.png",
   "img/visual/watch_niddle/img_visual_day_ratio.png",
   "img/visual/img_visual_01.png",
   "img/visual/img_visual_02.png",
   "img/visual/ratio_visual_01.png",
   "img/visual/ratio_watch.png",
   "img/visual/img_watch.png",
   "img/ww/img_ww_01.jpg",
   "img/ww/img_ww_02.jpg",
   "img/ww/img_ww_03.jpg",
   "img/ww/img_ww_04.jpg",
   "img/ww/img_ww_05.png",
   "img/ww/img_ww_06.png"]).preload();

var all_w = $(window).width();

var random_no;
var loading_percent_no = 0;
var rolling_no = 0;

function loading(){
    random_no = Math.random();
    random_no = String(random_no);
    random_no = random_no.substring(2,3);
    random_no = Number(random_no);
 }

function loading_start(){
    var $loading_cover = $(".loading_cover");
    var gradient_deg = 340;
    var repeat = setInterval(function(){
        if(loading_percent_no >= 250){
            $loading_cover.fadeOut(500, function(){
                $(this).remove();
                $("body").removeClass("scroll_lock");
            });
            clearInterval(repeat);
            setTimeout(function(){
                $("body").removeClass("load");
            }, 3500);
            }
        else{
            loading();
            gradient_deg -= 2;
            $(".loading_cover .lights").addClass("on").css({background: "linear-gradient("+(gradient_deg)+"deg, #f4d28b 3%, #222 100%)"});
            $(".loading_cover .stars").css({transform: "rotate("+(-rolling_no / 5)+"deg)"});
            $(".loading_cover .center .center_01").css({transform: "rotate("+(-rolling_no / 3)+"deg)"});
            $(".loading_cover .center .center_03").addClass("on");
            $(".loading_cover .left_roll .left_01").css({transform: "rotate("+(rolling_no)+"deg)"});
            $(".loading_cover .left_roll .left_02").css({transform: "rotate("+(-rolling_no * 1.5)+"deg)"});
            $(".loading_cover .right_roll .right_01").css({transform: "rotate("+(rolling_no / 2)+"deg)"});
            $(".loading_cover .right_roll .right_02").css({transform: "rotate("+(-rolling_no * 4)+"deg)"});
            $(".loading_cover .right_roll .right_03").css({transform: "rotate("+(rolling_no * 2)+"deg)"});
            $(".loading_cover .right_roll .right_04").css({transform: "rotate("+(rolling_no)+"deg)"});
            $(".loading_cover .bottom_roll .bottom_01").css({transform: "rotate("+(rolling_no / 1.5)+"deg)"});
            $(".loading_cover .bottom_roll .bottom_02").css({transform: "rotate("+(rolling_no * 1.5)+"deg)"});
            $(".loading_cover .top_roll .top_01").css({transform: "rotate("+(-rolling_no * 1.5)+"deg)"});
            $(".loading_cover .top_roll .top_02").css({transform: "rotate("+(rolling_no * 3)+"deg)"});
            $(".loading_cover .top_roll .top_03").css({transform: "rotate("+(-rolling_no * 3)+"deg)"});
        }
        loading_percent_no += random_no;
        rolling_no += 5;
    }, 50);
}
function moving_color(move){
    $("#header.section_01 .width_con .nav_con ul.nav li a").removeClass("on").eq(move).addClass("on");
}
function scrollevents(scrollPos){
    if(scrollPos+130 >=       section_h[10]){
        moving_color(7);
    }else if(scrollPos+130 >= section_h[8]){
        moving_color(6);
    }else if(scrollPos+130 >= section_h[7]){
        moving_color(5);
    }else if(scrollPos+130 >= section_h[5]){
        moving_color(4);
    }else if(scrollPos+130 >= section_h[3]){
        moving_color(3);
    }else if(scrollPos+130 >= section_h[2]){
        moving_color(2);
    }else if(scrollPos+130 >= section_h[1]){
        moving_color(1);
    }else{
        moving_color(0); 
    }
}
document.addEventListener('scroll', function(e){
    window.requestAnimationFrame(function(){
        scrollevents(window.scrollY);
    });
});

function put_height(){
    $(".width_con ul.v_con li, #collaboration.section_04 .width_con .main_img").each(function(){
        $(this).find("p").attr("style", "height:"+$(this).find("p").height()+"px; line-height: 1.15em");
        $(this).hover(function(){
            $(this).find("p").removeClass("hide");
        },function(){
            $(this).find("p").addClass("hide");
        });
    });
}

function resize(){
    all_w = $(window).width();
    $("body").removeClass("open_nav");
    if(all_w > 1449){
        $(".width_con ul.v_con li .img_text p, #collaboration.section_04 .width_con .main_img .img_text p").each(function(){
            $(this).addClass("hide");
        });
    }else{
        $(".width_con ul.v_con li .img_text p, #collaboration.section_04 .width_con .main_img .img_text p").each(function(){
            $(this).removeClass("hide");
        });
    }
    if(all_w < 850){
        $("#expertise.section_07 .width_con .exper_section .exper_text").css({overflow: "scroll"});
    }else{
        $("#expertise.section_07 .width_con .exper_section .exper_text").css({overflow: "hidden"});
    }
    put_sections();
}

history.scrollRestoration = "manual";

function tictoc(){
    var currentNewDate = new Date();
    var currentHours = currentNewDate.getHours();
    var currentMinutes = currentNewDate.getMinutes();
    var currentSeconds = currentNewDate.getSeconds();
    var currentMillisecond = currentNewDate.getMilliseconds();
    var currentMonth = currentNewDate.getMonth();
    var currentDay = currentNewDate.getDay();
    var currentDate = currentNewDate.getDate();
    var current_moon = currentNewDate.getDate();
    
    var moon_deg = 90;
    if(current_moon == 8){
        current_moon = 15;
    }else if(current_moon == 23){
        current_moon = 30;
    }else if(current_moon > 8 && current_moon < 23){
        current_moon += 8;
    }else if(current_moon > 23){
        current_moon -= 23
    }else{
        current_moon += 7
    }
    
    moon_deg += (current_moon * 6);
    $("#visual.section_02 .width_con .watch_con .moon").css({transform: "rotate("+moon_deg+"deg)"});
    
    var day_deg; //화면에서 첫 각도는 0
    if(currentDay == 1){ //월요일
        day_deg = 0; //각도 월요일로 맞춰줌
    }else if(currentDay == 0){ //일요일
        currentDay = 6; //각도 일요일로 맞춰줌
        day_deg = currentDay * 51.4; //360을 7로 나누면 51.428571....
    }else{
        currentDay -= 1; //1씩 빼서 일월화수목금토 순서를 월화수목금토일 순서로 바꿔줌
        day_deg = currentDay * 51.4;
    }
    $("#visual.section_02 .width_con .watch_con .day").css({transform: "rotate("+day_deg+"deg)"});
    
    var month_deg = (currentMonth * 30);
    $("#visual.section_02 .width_con .watch_con .month").css({transform: "rotate("+month_deg+"deg)"});
    
    var date_deg = 247; //날짜침 기본각도
    for (i = 1; i < currentDate; i++){ //일 수만큼 각도를 더해주기 위함
        if(i % 2 == 0){
            date_deg += 7; //짝수 날에는 7도 더함
        }else{
            date_deg += 8; //홀수 날에는 8도 더함
        }
    }
    $("#visual.section_02 .width_con .watch_con .date").css({transform: "rotate("+date_deg+"deg)"});
    
    var s_deg = (currentSeconds+(currentMillisecond/1000)) * 6;
    $("#visual.section_02 .width_con .watch_con .second").css({transform: "rotate("+s_deg+"deg)"});

    var m_deg = (currentMinutes * 6) + (s_deg / 60); //분 갯수로 초침 각도를 나눠줌
    $("#visual.section_02 .width_con .watch_con .min").css({transform: "rotate("+m_deg+"deg)"});

    var h_deg = (currentHours * 30) + (m_deg / 12); //시간 갯수로 분침 각도를 나눠줌
    $("#visual.section_02 .width_con .watch_con .hour").css({transform: "rotate("+h_deg+"deg)"});
}

var star_deg = 0;
function spinning_stars(){
    star_deg += 0.1;
    $("#visual.section_02 .stars").css({transform: "rotate("+star_deg / 2+"deg)"});
}

var color_arr = ['d6daee', 'e0eef2', 'f8f8f8', 'f4efd1', 'f5ebb7', 'f3c891', 'fdc7c7'];
var no_color,
    pos_top,
    pos_left;
function random_color(min, max){
    no_color = Math.floor(Math.random()*(max-min+1)) + min;
    return no_color;
}
function random_top(min, max){
    pos_top = Math.floor(Math.random()*(max-min+1)) + min;
    return pos_top;
}
function random_left(min, max){
    pos_left = Math.floor(Math.random()*(max-min+1)) + min;
    return pos_left;
}
function choose_pos(){
    random_top(20, 80);
    random_left(20, 80);
    random_color(1, 7);
    no_color = color_arr[no_color];
}

var section_h = new Array();
function put_sections(){
    section_h = new Array();
    section_h.push(0);
    for(i=1; i <= $(".sections").length; i++ ){
        section_h.push(section_h[i-1] + $(".sections").eq(i).height());
    }
}

$(window).load(function(){
    put_sections();
    
    for(i = 0; i < 6; i++){
        choose_pos();
        $("#visual.section_02 .twinkling").eq(i).attr("style", "top:"+pos_top+"%; left: "+pos_left+"%; background: #"+no_color+";").addClass("on");
    }
    setTimeout(function(){
        $("#visual.section_02 .twinkling").removeClass("on");
    },4000)
    setInterval(function(){
        setTimeout(function(){
            $("#visual.section_02 .twinkling.s_01").removeClass("on");
            choose_pos();
            $("#visual.section_02 .twinkling.s_02").attr("style", "top:"+pos_top+"%; left: "+pos_left+"%; background: #"+no_color+";").addClass("on");
        },2000);
        setTimeout(function(){
            $("#visual.section_02 .twinkling.s_02").removeClass("on");
            choose_pos();
            $("#visual.section_02 .twinkling.s_03").attr("style", "top:"+pos_top+"%; left: "+pos_left+"%; background: #"+no_color+";").addClass("on");
        },1000);
        setTimeout(function(){
            $("#visual.section_02 .twinkling.s_03").removeClass("on");
            choose_pos();
            $("#visual.section_02 .twinkling.s_04").attr("style", "top:"+pos_top+"%; left: "+pos_left+"%; background: #"+no_color+";").addClass("on");
        },2500);
        setTimeout(function(){
            $("#visual.section_02 .twinkling.s_04").removeClass("on");
            choose_pos();
            $("#visual.section_02 .twinkling.s_05").attr("style", "top:"+pos_top+"%; left: "+pos_left+"%; background: #"+no_color+";").addClass("on");
        },2000);
        setTimeout(function(){
            $("#visual.section_02 .twinkling.s_05").removeClass("on");
            choose_pos();
            $("#visual.section_02 .twinkling.s_06").attr("style", "top:"+pos_top+"%; left: "+pos_left+"%; background: #"+no_color+";").addClass("on");
        },3000);
        setTimeout(function(){
            $("#visual.section_02 .twinkling.s_06").removeClass("on");
            choose_pos();
            $("#visual.section_02 .twinkling.s_01").attr("style", "top:"+pos_top+"%; left: "+pos_left+"%; background: #"+no_color+";").addClass("on");
        },2500);
    },5000);
    
    
    $("#heritage.section_11 .width_con ul.v_con li.content .year_desc ul.year li").each(function(){
        $(this).click(function(){
            $("#heritage.section_11 .width_con ul.v_con li.content .year_desc ul.year li").removeClass("selected");
            $(this).addClass("selected");
            var key = $(this).text();
            $("#heritage.section_11 .width_con ul.v_con li.content .year_desc .desc").fadeOut(450, function(){
                for(i = 0; i < $("#heritage.section_11 .width_con ul.v_con li.content .year_desc ul.year li").length; i++){
                    if(key == heritage_array[i][0]){
                        $("#heritage.section_11 .width_con ul.v_con li.content .year_desc .desc h5").html(heritage_array[i][1]);
                        $("#heritage.section_11 .width_con ul.v_con li.content .year_desc .desc p").html(heritage_array[i][2]);
                        $("#heritage.section_11 .width_con ul.v_con li.content .year_desc .desc").fadeIn(450);
                        $("#heritage.section_11 .width_con ul.v_con li.content .year_desc ul.year").css({transform: "translateY(-"+(i*35)+"px)"});
                        $("#heritage.section_11 .width_con ul.v_con li img").attr("style", "background: url(img/heritage/img_heritage_"+heritage_array[i][0]+".jpg) 50% no-repeat; background-size: cover;");
                    }
                }
            });
        });
    });
    
    $("#collaboration.section_04 .width_con ul.type_370 li").each(function(){
        $(this).click(function(){
            $("#collaboration.section_04 .width_con .popup .main_img img").attr("style", "background: url(img/collaboration/popup/type370/img_collabo_popup_01.jpg) 50% no-repeat; background-size: cover;");
            for(i = 0; i < 4; i++){
                $("#collaboration.section_04 .width_con .popup .v_con.four_con li img").eq(i).attr("style", "background: url(img/collaboration/popup/type370/img_collabo_popup_0"+(i+1)+".jpg) 50% no-repeat; background-size: cover;");
            }
            $("#collaboration.section_04 .width_con .close, #collaboration.section_04 .width_con .popup").addClass("on");
            $("body").addClass("load");
            $("#collaboration.section_04 .width_con .popup .v_con.four_con li").each(function(){
                $(this).click(function(){
                    var current_idx = $(this).index();
                    $("#collaboration.section_04 .width_con .popup .main_img img").attr("style", "background: url(img/collaboration/popup/type370/img_collabo_popup_0"+(current_idx+1)+".jpg) 50% no-repeat; background-size: cover;");
                });
            });
        });
    });
    $("#collaboration.section_04 .width_con ul.type_390 li").each(function(){
        $(this).click(function(){
            $("#collaboration.section_04 .width_con .popup .main_img img").attr("style", "background: url(img/collaboration/popup/type390/img_collabo_popup_05.jpg) 50% no-repeat; background-size: cover;");
            for(i = 0; i < 4; i++){
                $("#collaboration.section_04 .width_con .popup .v_con.four_con li img").eq(i).attr("style", "background: url(img/collaboration/popup/type390/img_collabo_popup_0"+(i+5)+".jpg) 50% no-repeat; background-size: cover;");
            }
            $("#collaboration.section_04 .width_con .close, #collaboration.section_04 .width_con .popup").addClass("on");
            $("body").addClass("load");
            $("#collaboration.section_04 .width_con .popup .v_con.four_con li").each(function(){
                $(this).click(function(){
                    var current_idx = $(this).index();
                    $("#collaboration.section_04 .width_con .popup .main_img img").attr("style", "background: url(img/collaboration/popup/type390/img_collabo_popup_0"+(current_idx+5)+".jpg) 50% no-repeat; background-size: cover;");
                });
            });
        });
    });
    $("#collaboration.section_04 .width_con .close, #collaboration.section_04 .width_con .popup .btn_close").click(function(){
        $("#collaboration.section_04 .width_con .close, #collaboration.section_04 .width_con .popup").removeClass("on");
        $("body").removeClass("load");
    });
    
    var $roll = $("#signature.section_06 .width_con .rolling_con");
    var roll_deg = 0;
    var next_roll_deg = 0;
    var prev_index = 0;
    var next_index,
        index_distance;
    function rolling(roll_deg){
            $roll.css({transform: "rotate("+roll_deg+"deg)"});
    }
    $("#signature.section_06 .width_con ul.v_con li").each(function(){
        $(this).click(function(){
            $("#signature.section_06 .width_con ul.v_con li").removeClass("selected");
            $(this).addClass("selected");
            
            next_index = $(this).index();
            index_distance = prev_index - next_index;
            prev_index = next_index;
            
            switch(index_distance){
                case -3 : roll_deg = 90;
                break;
                case -2 : roll_deg = -180;
                break;
                case -1 : roll_deg = -90;
                break;
                case 1 : roll_deg = 90;
                break;
                case 2 : roll_deg = 180;
                break;
                case 3 : roll_deg = -90;
                break;
            }
            next_roll_deg += roll_deg;
            rolling(next_roll_deg);
            
            if(roll_deg > 0){
                rolling(next_roll_deg + 2);
            }else{
                rolling(next_roll_deg - 2);
            }
            setTimeout(function(){
                rolling(next_roll_deg);
            }, 350);
            var key = $(this).index();
            $("#signature.section_06 .width_con .desc").fadeOut(250, function(){
                for(i = 0; i < $("#signature.section_06 .width_con ul.v_con li").length; i++){
                    if(key == signature_array[i][0]){
                        $("#signature.section_06 .width_con .desc h5").html(signature_array[i][1]);
                        $("#signature.section_06 .width_con .desc p").html(signature_array[i][2]);
                        $("#signature.section_06 .width_con .desc").fadeIn(250);
                    }
                }
            });
        });
    });
    
    setInterval(function(){
        tictoc();
    }, 250);
    
    setInterval(function(){
        spinning_stars();
    }, 50);
    
    loading_start();
    
    window.onresize = resize;
    put_height();
    resize();
});

$(function(){
    $(".btn_open_nav, .open_nav_cover, #header.section_01 .width_con .nav_con ul.nav li a").each(function(){
        $(this).click(function(){
            $("body").toggleClass("open_nav");
        });
    });
    
    $("#service.section_09 .width_con .img_con .img").each(function(){
        $(this).click(function(){
            $("#service.section_09 .width_con .img_con .img").removeClass("selected");
            $(this).addClass("selected");
            var new_img = $(this).find("img").attr("style");
            $("#service.section_09").attr("style", new_img);
        });
    });
    
    $(document).on('click', 'a[href^="#"]', function(event){
        event.preventDefault();
        $("html,body").stop().animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 80
        }, 2000,'easeInOutCubic');
    });
});