history.scrollRestoration = "manual";

function doSomething(scrollPos){
    if(scrollPos < 1){
        $("body").addClass("top");
    }else{
        $("body").removeClass("top");
    }
    if(scrollPos > (section_h[4] - 1000)){
        $("#agents .bg_con").css({"bottom": "0%"})
        console.log((scrollPos/100))
    }else{
        $("#agents .bg_con").css({"bottom": "-30%"})
    }
}
var section_h = new Array();
document.addEventListener('scroll', function(e) {
    window.requestAnimationFrame(function() {
        doSomething(window.scrollY);
        ticking = false;
    });
});
var fade_speed = 200;
var ag_name = "jet"
function skill_click(ag_name){
    $("#agents .width_con .v_con.two_con li .info_con ul.skills li").click(function(){
            var skill_index = ($(this).index()+2);
            var current_skill = $(this).find("img").attr("src");
            $("#agents .width_con .v_con.two_con li .info_con ul.skills li").removeClass("selected");
            $(this).addClass("selected");
            $("#agents .width_con .v_con.two_con li .info_con .skill_con .current_skill").attr("src", "img/agents/img_agents_"+ag_name+"_0"+(skill_index-1)+".png");
            $("#agents .width_con .v_con.two_con li .info_con .skill_con .desc").fadeOut(fade_speed, function(){
                $("#agents .width_con .v_con.two_con li .info_con .skill_con").stop().animate({scrollTop: 0}, 1);
                for(i = 0; i < $("#agents .width_con .v_con.two_con li ul.agent_list li").length; i++){
                    if(ag_name == agents_array[i][0]){
                        $("#agents .width_con .v_con.two_con li .info_con .skill_con .desc h6").html(agents_array[i][(skill_index*2-1)]);
                        $("#agents .width_con .v_con.two_con li .info_con .skill_con .desc p").html(agents_array[i][(skill_index*2)]);
                        $("#agents .width_con .v_con.two_con li .info_con .skill_con .desc").fadeIn(fade_speed);
                    }
                }
            });
        });
}

function resize(){
    $("body").removeClass("open_nav");
    section_h.push(0);
    for(i=1; i <= $(".sections").length; i++ ){
        section_h.push(section_h[i-1] + $(".sections").eq(i).height());
    }
}

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
        if(loading_percent_no >= 150){
            $(".loading_cover span").fadeOut(300);
        }
        if(loading_percent_no >= 200){
            $(".loading_cover .width_con img").addClass("on");
        }
        if(loading_percent_no >= 250){
            
            
        }
        if(loading_percent_no >= 300){
            $(".loading_cover .width_con h1").addClass("on");
        }
        if(loading_percent_no >= 350){
            $loading_cover.fadeOut(800, function(){
                $(this).remove();
            })
            clearInterval(repeat);
            }
        else{
            loading();
        }
        loading_percent_no += random_no;
    }, 50);
}

$(window).load(function(){
    window.onresize = resize;
    resize()
    loading_start()
    
    $(".btn_open_nav").click(function(){
        $("body").toggleClass("open_nav");
    });
    $(".open_nav_cover").click(function(){
        $("body").removeClass("open_nav");
    });
    skill_click(ag_name);
    $("#agents .width_con .v_con.two_con li ul.agent_list li a").click(function(){
        $("#agents .width_con .v_con.two_con li ul.agent_list li").removeClass("selected");
        $(this).parent("li").addClass("selected");
        ag_name = $(this).parent("li").attr("data-name");
        var ag_pos = $(this).siblings("img").attr("alt");
        $("#agents .width_con .v_con.two_con li .agent_name h2").addClass("wait");
        $("#agents .width_con .v_con.two_con li .agent_name").fadeOut(fade_speed, function(){
            $("#agents .width_con .v_con.two_con li .agent_name h2").html(ag_name);
            $("#agents .width_con .v_con.two_con li .agent_name").fadeIn(fade_speed);
            $("#agents .width_con .v_con.two_con li .agent_name h2").removeClass("wait");
        });
        $("#agents .width_con .v_con.two_con li .info_con .ag_pos").fadeOut(fade_speed, function(){
            for(i = 0; i < $("#agents .width_con .v_con.two_con li ul.agent_list li").length; i++){
                if(ag_name == agents_array[i][0]){
                    $("#agents .width_con .v_con.two_con li .info_con .ag_pos h5").text(agents_array[i][1]);
                    $("#agents .width_con .v_con.two_con li .info_con .ag_pos img").attr("src", "img/agents/img_agents_position_"+ag_pos+".png");
                    $("#agents .width_con .v_con.two_con li .info_con .ag_pos").fadeIn(fade_speed);
                }
            }
        });
        $("#agents .width_con .v_con.two_con li .agent").addClass("wait");
        $("#agents .width_con .v_con.two_con li .agent").fadeOut(fade_speed, function(){
            $("#agents .width_con .v_con.two_con li .agent img").attr("src", "img/agents/img_agents_"+ag_name+".png");
            $("#agents .width_con .v_con.two_con li .agent").removeClass("wait");
            $(this).fadeIn(fade_speed);
        });
        
        $("#agents .width_con .v_con.two_con li .info_con ul.skills").fadeOut(fade_speed, function(){
            for(i = 1; i <= 4; i++){
                $("#agents .width_con .v_con.two_con li .info_con ul.skills li img").eq(i-1).attr("src", "img/agents/img_agents_"+ag_name+"_0"+i+".png")
            }
            $(this).fadeIn(fade_speed);
        });
        
        $("#agents .width_con .v_con.two_con li .info_con > p").fadeOut(fade_speed, function(){
            for(i = 0; i < $("#agents .width_con .v_con.two_con li ul.agent_list li").length; i++){
                if(ag_name == agents_array[i][0]){
                    $("#agents .width_con .v_con.two_con li .info_con > p").html(agents_array[i][2]).fadeIn(fade_speed);
                    
                }
            }
        });
        $("#agents .width_con .v_con.two_con li .info_con ul.skills li").removeClass("selected").eq(0).addClass("selected");
        skill_click(ag_name);
        
        $("#agents .width_con .v_con.two_con li .info_con .skill_con .current_skill").attr("src", "img/agents/img_agents_"+ag_name+"_01.png");
        $("#agents .width_con .v_con.two_con li .info_con .skill_con .desc").fadeOut(fade_speed, function(){
            $("#agents .width_con .v_con.two_con li .info_con .skill_con").stop().animate({scrollTop: 0}, 1);
            for(i = 0; i < $("#agents .width_con .v_con.two_con li ul.agent_list li").length; i++){
                if(ag_name == agents_array[i][0]){
                    $("#agents .width_con .v_con.two_con li .info_con .skill_con .desc h6").html(agents_array[i][3]);
                    $("#agents .width_con .v_con.two_con li .info_con .skill_con .desc p").html(agents_array[i][4]);
                    $("#agents .width_con .v_con.two_con li .info_con .skill_con .desc").fadeIn(fade_speed);
                }
            }
        });
    });
    $(document).on('click', 'a[href^="#"]', function(event){
        event.preventDefault();
        $("body").removeClass("open_nav");
        $("html,body").stop().animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 80
        }, 1000,'easeInOutCubic');
    });
});