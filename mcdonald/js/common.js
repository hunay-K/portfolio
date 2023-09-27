$.fn.preload = function(){
    this.each(function(){
        $('<img/>')[0].src = this;
    });
}
$([ "img/ingredient_img/bg_ingredient_01.jpg",
    "img/ingredient_img/bg_ingredient_02.jpg",
    "img/ingredient_img/bg_ingredient_03.jpg",
    "img/ingredient_img/bg_ingredient_04.jpg",
    "img/ingredient_img/bg_ingredient_05.jpg",
    "img/ingredient_img/bg_ingredient_06.jpg",
    "img/ingredient_img/bg_ingredient_07.jpg",
    "img/guide_ratio_16_9.png",
    "img/logo_loading_cover.png",
    "img/macdonalds_logo.png",
    "img/sp_logo.png",
    "img/menu_img/bg.jpg",
    "img/menu_img/best/menu_be_01.png",
    "img/menu_img/best/menu_be_02.png",
    "img/menu_img/best/menu_be_03.png",
    "img/menu_img/best/menu_be_04.png",
    "img/menu_img/best/menu_be_05.png",
    "img/menu_img/best/menu_be_06.png",
    "img/menu_img/burger/menu_bu_01.png",
    "img/menu_img/burger/menu_bu_02.png",
    "img/menu_img/burger/menu_bu_03.png",
    "img/menu_img/burger/menu_bu_04.png",
    "img/menu_img/burger/menu_bu_05.png",
    "img/menu_img/burger/menu_bu_06.png",
    "img/menu_img/happy_snack/menu_sn_01.png",
    "img/menu_img/happy_snack/menu_sn_02.png",
    "img/menu_img/happy_snack/menu_sn_03.png",
    "img/menu_img/happy_snack/menu_sn_04.png",
    "img/menu_img/happy_snack/menu_sn_05.png",
    "img/menu_img/happy_snack/menu_sn_06.png",
    "img/menu_img/mccafe_beverages/menu_cb_01.png",
    "img/menu_img/mccafe_beverages/menu_cb_02.png",
    "img/menu_img/mccafe_beverages/menu_cb_03.png",
    "img/menu_img/mccafe_beverages/menu_cb_04.png",
    "img/menu_img/mccafe_beverages/menu_cb_05.png",
    "img/menu_img/mccafe_beverages/menu_cb_06.png",
    "img/menu_img/sides_desserts/menu_sd_01.png",
    "img/menu_img/sides_desserts/menu_sd_02.png",
    "img/menu_img/sides_desserts/menu_sd_03.png",
    "img/menu_img/sides_desserts/menu_sd_04.png",
    "img/menu_img/sides_desserts/menu_sd_05.png",
    "img/menu_img/sides_desserts/menu_sd_06.png",
    "img/instagram_img/img_instagram_01.jpg",
    "img/instagram_img/img_instagram_02.jpg",
    "img/instagram_img/img_instagram_03.jpg",
    "img/instagram_img/img_instagram_04.jpg",
    "img/instagram_img/img_instagram_05.jpg",
    "img/instagram_img/img_instagram_06.jpg",
    "img/instagram_img/img_instagram_07.jpg",
    "img/instagram_img/img_instagram_08.jpg",
    "img/instagram_img/img_instagram_09.jpg",
    "img/instagram_img/img_instagram_10.jpg",
    "img/instagram_img/img_instagram_11.jpg",
    "img/instagram_img/img_instagram_12.jpg",
    "img/instagram_img/user_photo/img_user_01.jpg",
    "img/instagram_img/user_photo/img_user_02.jpg",
    "img/instagram_img/user_photo/img_user_03.jpg",
    "img/instagram_img/user_photo/img_user_04.jpg",
    "img/instagram_img/user_photo/img_user_05.jpg",
    "img/instagram_img/user_photo/img_user_06.jpg",
    "img/instagram_img/user_photo/img_user_07.jpg",
    "img/instagram_img/user_photo/img_user_08.jpg",
    "img/instagram_img/user_photo/img_user_09.jpg",
    "img/instagram_img/user_photo/img_user_10.jpg",
    "img/instagram_img/user_photo/img_user_11.jpg",
    "img/instagram_img/user_photo/img_user_12.jpg",
    "img/heritage_img/img_heritage_1940_01.jpg",
    "img/heritage_img/img_heritage_1955_01.jpg",
    "img/heritage_img/img_heritage_1974_01.jpg",
    "img/heritage_img/img_heritage_1988_01.jpg",
    "img/heritage_img/img_heritage_2006_01.jpg",
    "img/heritage_img/img_heritage_2013_01.jpg",
    "img/app_img/app_img_01.png",
    "img/app_img/app_img_02.png",
    "img/app_img/app_img_03.png",
    "img/app_img/app_img_03_1.png",
    "img/app_img/app_img_04.png",
    "img/app_img/app_img_05.png",
    "img/app_img/app_img_06.png",
    "img/app_img/app_img_07.png",
    "img/app_img/btn_app_store.svg",
    "img/app_img/btn_google_play.svg",
    "img/event_img/cover_img.png",
    "img/event_img/event_01.jpg",
    "img/event_img/event_02.jpg",
    "img/event_img/event_03.jpg",
    "img/event_img/event_04.jpg"]).preload();

history.scrollRestoration = "manual";
var section_h = new Array();

//삐에로 등장
function setVisible(a){
    if( a.length > 0 ){
        var stdPos = $(window).scrollTop() + $(window).height() - ($(window).height() / 2 + 300);
        var position_var = (stdPos-a.offset().top);
        if( stdPos > a.offset().top - 300 && stdPos-a.offset().top < 800){
            $('#app.section_04 .width_con .app_content .character').addClass("show");
            setTimeout(function(){
                $('#app.section_04 .width_con .app_content .character').addClass("done");
            },800);
        }
    }
}
//삐에로 퇴장

/*스크롤 이벤트 시작*/
var underbar_left,
    underbar_width;
function moving_underbar(move){
    underbar_left = $("#header.section_01 .width_con ul.nav li").eq(move).find("a").position().left;
    underbar_width = $("#header.section_01 .width_con ul.nav li").eq(move).find("a").width();
    $("#header.section_01 .width_con ul.nav li.under_bar").css({left:underbar_left, width:underbar_width});
}
function scrollevents(scrollPos){
    if(scrollPos >= $("#visual").height()/2){
        $("#header").addClass("on");
        $("#header.section_01 .width_con ul li a").addClass("on");
    }else{
        $("#header").removeClass("on");
        $("#header.section_01 .width_con ul li a").removeClass("on");
    }
    
    if(scrollPos+130 >=       section_h[9]){
        moving_underbar(6)
    }else if(scrollPos+130 >= section_h[7]){
        moving_underbar(5);; //contact 섹션 이동
    }else if(scrollPos+130 >= section_h[5]){
        moving_underbar(4); //history 섹션 이동
    }else if(scrollPos+270 >= section_h[3]){
        moving_underbar(3); //ingredient 섹션 이동
    }else if(scrollPos+200 >= section_h[2]){
        moving_underbar(2); //app 섹션 이동
    }else if(scrollPos+130 >= section_h[1]){
        moving_underbar(1); //menu 섹션 이동
    }else{
        moving_underbar(0);  //visual 섹션 이동
    }

    setVisible($('#app.section_04 .width_con .title_con h2'));

}
let ticking = false;
var current_scroll, wh;

function showwhatever(el, current_scroll, wh){
    var el_offset_t = el.offset().top;
    if(current_scroll > el_offset_t - wh){
        el.parent().removeClass("wait_scroll");
        el.remove();
    };
};

function doSomething(scrollPos){
    var wh = $(window).height();
    current_scroll = scrollPos;
    $(".show_trigger").each(function(){
        showwhatever($(this), current_scroll, wh);
    });
};

document.addEventListener('scroll', function(e) {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            scrollevents(window.scrollY);
            doSomething(window.scrollY);
            ticking = false;
        });
        ticking = true;
    }
});
/*스크롤 이벤트 끝*/

// 로딩 커버 채우기 시작

var random_no;
var loading_percent_no = 0;

function loading(){
    random_no = Math.random();
    random_no = String(random_no);
    random_no = random_no.substring(2,3);
    random_no = Number(random_no);
 }
function loading_start(){
    var $loading_cover = $(".loading_cover");
    var repeat = setInterval(function(){
        if(loading_percent_no >= 300){
            $(".loading_cover p").css("opacity", "1");
        }if(loading_percent_no >= 350){
            $loading_cover.fadeOut(500, function(){
                $(this).remove();
                $("body").removeClass("scroll_lock");
            }).find(".progress").width(300);
            clearInterval(repeat);
            }
        else{
            loading();
            $loading_cover.find(".progress").width($loading_cover.find(".progress").width() + random_no);
        }
        loading_percent_no += random_no;
    }, 50);
}

// 로딩 커버 채우기 끝

function get_time(){
    var current_date = new Date();
    var cureent_hour = current_date.getHours();
    var zero_hour = String(cureent_hour).padStart(2,"0");
    var current_min = current_date.getMinutes();
    var zero_min = String(current_min).padStart(2,"0");
    
    var time = zero_hour + ":" + zero_min;
    $("#app.section_04 .width_con .app_content .time_text").html(time);
    $("#app.section_04 .width_con .app_content .time_text_02").html(time);
}


$(window).load(function(){
    
    loading_start();
    
    setTimeout(function(){
        $("#visual.section_02 .width_con .title_con").fadeOut(1000);
    }, 10500)
    
    setInterval(function(){
        get_time();
    }, 1000);

    section_h.push(0);
    for(i=1; i <= $(".sections").length; i++ ){
        section_h.push(section_h[i-1] + $(".sections").eq(i).height());
    }
    //section_h[0] = 0
    //section_h[1] = visual.height()
    //section_h[2] = visual.height()+menu.height()
    //section_h[3] = visual.height()+menu.height()+app.height()
    //section_h[4] = visual.height()+menu.height()+app.height()+ingredient.height()
    //section_h[5] = visual.height()+menu.height()+app.height()+ingredient.height()+event.height()
    //section_h[6] = visual.height()+menu.height()+app.height()+ingredient.height()+event.height()+history.height()
    //section_h[7] = visual.height()+menu.height()+app.height()+ingredient.height()+event.height()+history.height()+instagram.height()
    //section_h[8] = visual.height()+menu.height()+app.height()+ingredient.height()+event.height()+history.height()+instagram.height()+contact.height()
    //section_h[9] = visual.height()+menu.height()+app.height()+ingredient.height()+event.height()+history.height()+instagram.height()+contact.height()+nowar.height()
    //section_h[10] = visual.height()+menu.height()+app.height()+ingredient.height()+event.height()+history.height()+instagram.height()+contact.height()+nowar.height()+footer.height()

    $("html,body").stop().animate({scrollTop: 0}, 1);
    moving_underbar(0);


    //ingredient 섹션 시작***********************************************************************************************************************************************

    var $bg_cons = $("#ingredient.section_05 > .bg_con");

    //bg_cons 개수에 맞게 fade_po 생성 시작--------------------------------------------------------------------------------------------------------------------------------

    for(i = 0; i < $bg_cons.length; i++){
        $("#ingredient.section_05 ul.fade_po").append("<li>"); //append 이벤트는 선택한 요소에 자식요소를 추가함
    };
    //fade_po 생성 끝----------------------------------------------------------------------------------------------------------------------------------------------------

    var $fade_po = $("#ingredient.section_05 ul.fade_po li"); //append로 생성한 자식요소를 $fade_po 변수로 선언

    //fade_po 간격(마진) 맞추기 시작---------------------------------------------------------------------------------------------------------------------------------------

    var fade_po_width_sum = 0; //bg_con 개수에 맞게 생성된 li들의 width 값을 다 더해줄 변수 선언
    for(i = 0; i < $fade_po.length; i++){
        fade_po_width_sum += $fade_po.eq(i).width(); //fade_po_width_sum 변수에 li($fade_po)들의 width 값을 다 더해줌
    }
    fade_po_width_sum = $("#ingredient.section_05 ul.fade_po").width() - fade_po_width_sum; //li($fade_po)의 부모인 ul의 width 값에서 li($fade_po)들의 width 값을 뺌
    fade_po_width_sum = fade_po_width_sum / ($fade_po.length - 1); //li($fade_po)의 사이 간격(마진)을 몇으로 할지 여기서 정해짐
    fade_po_width_sum = Math.floor(fade_po_width_sum); // 위에서 구한 간격(마진)이 소숫점이 나올 수도 있으니 정수로 변환해줌 (Math.floor는 소숫점 밑은 다 버려버림 ex) 1.222 ---> 1)
    for(i = 0; i < $fade_po.length; i++){
        $fade_po.eq(i).css("margin", "0"+ fade_po_width_sum + "px" +"0"); //정수로 깔끔하게 변환된 간격(마진)을 css로 li($fade_po)에 좌우 마진값으로 적용시켜줌
    }
    //fade_po 간격(마진) 맞추기 끝------------------------------------------------------------------------------------------------------------------------------------------

    //ul 가운데 정렬 시작---------------------------------------------------------------------------------------------------------------------------------------------------

    var ul_width = $("#ingredient.section_05 ul.fade_po").width(); //방금 li($fade_po)간격을 맞춰줬으니 이제 li($fade_po)의 부모인 ul을 전체적으로 가운데 정렬 시켜야함
    $("#ingredient.section_05 ul.fade_po").css("margin-left", -(ul_width / 2)); //main.css에서 ul에게 left: 50%를 먹여놓은 상태라 js에서 margin-left 값만 맞춰서 css에 적용시켜주면 됨
    //ul 가운데 정렬 끝---------------------------------------------------------------------------------------------------------------------------------------------------------

    //페이드 아웃 페이드 인 시작                         

    var fade_no = 0; //현재 페이드 인 아웃 되는 순서를 맡는 변수 선언
    var rolling_time = 4000; //페이드 인 아웃이 작동되는 시간 선언
    var setTime; //setTimeout 함수에 쓰일 변수 선언

    function re_start(){ //'re_start'라는 함수 만들기
        setTime = setTimeout(function(){ //re_start 함수 안에서 setTimeout이라는 함수 사용
            interval(fade_no); //interval 함수를 fade_no 매개변수를 넣어서 실행
        }, rolling_time); // setTimeout 함수를 'rollig_time'에 한번씩 실행
    }

    function interval(i){ //'interval'이라는 함수 만들기 (interval(i)는 interval 함수에 매개변수로 i를 넣어서 함수를 실행하라는 뜻)
        $bg_cons.removeClass("on"); //모든 $bg_cons에 있는 "on" 클래스 제거
        $bg_cons.eq(i).addClass("on"); //'re_start' 함수에서 매개변수 fade_no로 'interval' 함수가 호출되었으니 여기서 i는 fade_no로 적용되므로 fade_no에 따라 "on" 클래스가 부여됨
        $fade_po.removeClass("on"); //모든 $fade_no에 있는 "on" 클래스 제거
        $fade_po.eq(i).addClass("on"); //191줄과 동일
        
        fade_no++; //fade_no에 1 더해줌
        if(fade_no == $bg_cons.length){ // 만약 fade_no가 $bg_cons의 개수와 동일해지면
            fade_no = 0; //fade_no를 0으로 초기화 (슬라이드 순서가 다시 처음으로 돌아감)
        }
        clearTimeout(setTime); //실행되고 있는 setTime(setTimeout)함수를 멈춤
        re_start(); //re_start 함수 실행 = 멈췄던 setTime(setTimeout)함수 다시 실행시키는 것
    }

    $fade_po.click(function(){ //$fade_po가 클릭되면
       fade_no = $(this).index(); //fade_no는 클릭된 $fade_po의 index 번호로 바뀜 ex)지금 fade_no가 3임 근데 5번째 $fade_po를 클릭하면 fade_no가 5로 바뀜 
        interval(fade_no); //바뀐 fade_no를 매개변수로 interval함수 실행
    });
    interval(fade_no);//fade_no를 매개변수로 interval함수 실행
    //페이드 아웃 페이드 인 끝-----------------------------------------------------------------------------------------------------------------------------------------------------

    //ingredient 섹션 끝**********************************************************************************************************************************************************
    
    //menu 섹션 시작***************************************************************************************************************************************************************
    
    var slide_no, tab_no, cate, cate_folder;
    function choose_cate(cate){
        switch(cate){
            case "be" : cate_folder = "best";
                break;
            case "bu" : cate_folder = "burger";
                break;
            case "sd" : cate_folder = "sides_desserts";
                break;
            case "sn" : cate_folder = "happy_snack";
                break;
            case "cb" : cate_folder = "mccafe_beverages";
                break;
        };
    }
    
    function chang_tab(el){
        $("#menu.section_03 ul.tab_menu li").removeClass("on");
        el.addClass("on");
        tab_no = el.index();
        var cate = el.attr("data-cate");
        choose_cate(cate);
        if($("#menu.section_03 .width_con .menu_box ul.menu_slide li").length > 0){
            $("#menu.section_03 .width_con .menu_box ul.menu_slide").slick('unslick').html("");
        };
        for(i = 1; i <= 6; i++){
            var on = " class='on'";
            var num = String(i);
            if(i < 10){
                num = "0" + num;
            };
            if(i != 1){
                on = "";
            }else if(i == 1){
                $("#menu.section_03 .width_con .menu_box .main_img").css({background: "url(img/menu_img/"+cate_folder+"/menu_"+cate+"_"+num+".png) 50% no-repeat", backgroundsize: "100%;"})
            };
            $("#menu.section_03 .width_con .menu_box ul.menu_slide").append("<li"+on+" style='background: url(img/menu_img/"+cate_folder+"/menu_"+cate+"_"+num+".png) 50% no-repeat; background-size: 100%;'></li>");
        };
        $("#menu.section_03 .width_con .menu_box ul.menu_slide").slick({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth: true
        });
        slide_no = 0;
    }
    
    function slide(i){
        $("#menu.section_03 .width_con .menu_box ul.menu_slide li").removeClass("on");
        $("#menu.section_03 .width_con .menu_box ul.menu_slide li").eq(i).addClass("on");
        var cate = $("#menu.section_03 ul.tab_menu li").eq(tab_no).attr("data-cate");
        choose_cate(cate);
        $("#menu.section_03 .width_con .menu_box .main_img").css({background: "url(img/menu_img/"+cate_folder+"/menu_"+cate+"_0"+(i+1)+".png) 50% no-repeat", backgroundsize: "100%;"});
    };
    
    function change_text(){
        var cate = $("#menu.section_03 ul.tab_menu li").eq(tab_no).attr("data-cate");
        choose_cate(cate);
        var key = cate_folder + slide_no;
        $("#menu.section_03 .width_con .title_con").fadeOut(300, function(){
            for(i = 0; i < $("#menu.section_03 .width_con .menu_box ul.menu_slide li").length * $("#menu.section_03 ul.tab_menu li").length; i++){
                if(key == menu_array[i][0]){
                    $("#menu.section_03 .width_con .title_con h3").text(menu_array[i][1]);
                    $("#menu.section_03 .width_con .title_con h2").text(menu_array[i][2]);
                    $("#menu.section_03 .width_con .title_con h4").text(menu_array[i][3]);
                    $("#menu.section_03 .width_con .title_con").fadeIn(300);
                };
            };
        });
    }
    
    
    $("#menu.section_03 ul.tab_menu li").click(function(){
       chang_tab($(this));
        change_text();
    });
    chang_tab($("#menu.section_03 ul.tab_menu li").eq(0));
    
    $(document).on("click","#menu.section_03 .width_con .menu_box ul.menu_slide li",function(){
        slide_no = $(this).attr("data-slick-index");
        slide($(this).index());
        change_text();
    });
    
    var waiting_time = true; //if문, waiting_time, settimeout 쓴 이유 = 슬릭 슬라이드 버튼 광클 방지
    $(document).on("click", "#menu.section_03 .width_con .menu_box ul.menu_slide button.slick-arrow", function(){
        if(waiting_time == true){
            waiting_time = false;
            if($(this).hasClass("slick-next")){
                if(slide_no > 4){
                }else{
                    slide_no++;
                    slide(slide_no);
                    change_text();
                }
            }else{
               if(slide_no == 0){
               }else{
                    slide_no--;
                    slide(slide_no);
                    change_text();
               }
            }
            setTimeout(function(){
                waiting_time = true;
            }, 500);
        }
    });
//menu 섹션 끝***************************************************************************************************************************************************************
    
//heritage 섹션시작*********************************************************************************************************************************************
    var heritage_change_speed = 250; //0.25초 속도의 바구니
    var selected_text = "";
    $("#heritage.section_07 .width_con ul.btn_year li").each(function(){
        $(this).click(function(){
            $("#heritage.section_07 .width_con ul.btn_year li").removeClass("on");
            $(this).addClass("on");
            var key = $(this).text();
            $("#heritage.section_07 .width_con span.text_box").fadeOut(heritage_change_speed, function(){
                for(i=0; i<$("#heritage.section_07 .width_con ul.btn_year li").length; i++){
                    if(key == heritage_array[i][0]){
                        $("#heritage.section_07 .width_con span.text_box h3").text(heritage_array[i][0]);
                        $("#heritage.section_07 .width_con span.text_box h4").text(heritage_array[i][1]);
                        $("#heritage.section_07 .width_con span.text_box").fadeIn(heritage_change_speed);
                        $("#heritage.section_07 .width_con .main_img").css("background-image", "url(img/heritage_img/img_heritage_"+heritage_array[i][0]+"_01.jpg)");
                    }
                }
            });
        });
    });
//heritage 섹션 끝*********************************************************************************************************************************************
});
$(function(){
    $(document).on('click', 'a[href^="#"]', function(event){
        event.preventDefault();
        $("html,body").stop().animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 80
        }, 2000,'easeInOutCubic');
    });
    
//삐에로 마우스트래킹 시작
    var character_standard_x,
        character_standard_y
    $('#app.section_04').mousemove(function(event){
        var x = event.pageX,
            y = event.pageY;
        
        var character_standard_x = x-840;
        var character_standard_y = y-2368;
        $("#app.section_04 .width_con .app_content .character.show").css({transform:"translate(" +(character_standard_x*0.02)+"px, " +(character_standard_y*0.04)+"px)"});
    });
//삐에로 마우스트래킹 끝
});