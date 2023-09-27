var date = new Date();
// 달력 연도
var calendarYear = date.getFullYear();
// 달력 월
var calendarMonth = date.getMonth() + 1;
// 달력 일
var calendarToday = date.getDate();

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// 윤년 계산
if (calendarYear % 400 == 0) {
    monthDays[1] = 29;
} else if (calendarYear % 100 == 0) {
    monthDays[1] = 28;
} else if (calendarYear % 4 == 0) {
    monthDays[1] = 29;
}

var getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}
var setCookie = function (cname, cvalue, exdays) {
    var todayDate = new Date();
    todayDate.setTime(todayDate.getTime() + (exdays*24*60*60*1000));    
    var expires = "expires=" + todayDate.toUTCString(); // UTC기준의 시간에 exdays인자로 받은 값에 의해서 cookie가 설정 됩니다.
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
var couponClose = function(){
    if($("input[name='dontopen24']").is(":checked") == true){
        setCookie("close","Y",1);   //기간( ex. 1은 하루, 7은 일주일)
    }
    $(".notice_con").hide();
    $(".main_con").removeClass("cover");
}


let allInfos = [];

// 현재 유저 정보
let user_info;



function make_calendar(this_month, where){
    // 달력 월의 마지막 일
    var calendarMonthLastDate = monthDays[this_month];
    //console.log(calendarMonth, "월의 마지막 일", calendarMonthLastDate);

    // 달력 월의 시작 요일
    var monthStartDay = new Date(calendarYear, this_month, 1);
    var calendarMonthStartDay = monthStartDay.getDay();

    // 해당 달이 몇 주 인지 체크
    var calendarWeekCount = Math.ceil((calendarMonthStartDay + calendarMonthLastDate) / 7);
    //console.log(calendarMonth, "월은", calendarWeekCount, "주");

    var html = "";
    html += "<div class='cal'>";
    html += "<h3 style=\"font-size: large; font-weight: normal; color: #006cff; text-align: left; margin: 0 10px 0 0;\"><span style=\"font-size: large; font-weight: normal; color: black; text-align: left; margin: 0 10px 0 0;\">"+calendarYear+"년</span>" + (this_month + 1) + "월</h3>";
    html += "<div class='cal_tit'>";
    html += "<div class='days'>";
    html += "<div class='day'>일</div><div class='day'>월</div><div class='day'>화</div><div class='day'>수</div><div class='day'>목</div><div class='day'>금</div><div class='day'>토</div>";
    html += "</div>";
    html += "</div>";
    html += "<ul class='cal_main'>";
    // 위치
    var calendarPos = 0;
    // 날짜
    var calendarDay = 0;

    let date = String(calendarDay + 1).padStart(2, "0");
    const month = String(this_month + 1).padStart(2, "0");

    for (var index1 = 0; index1 < calendarWeekCount; index1++) {
        html += "<li>";
        for (var index2 = 0; index2 < 7; index2++) {
            html += "<div class='dates' data-month='"+(this_month + 1)+"' data-date='"+calendarYear+"-"+month+"-"+date+"' style='position: relative; padding: 10px 10px; text-align: center;'>";
            if (calendarMonthStartDay <= calendarPos && calendarDay < calendarMonthLastDate) {
                calendarDay++;
                date = String(calendarDay + 1).padStart(2, "0");
                html += "<span style=\"display: block; padding: 10px 10px;";
                if (calendarDay == calendarToday && (this_month+1) == calendarMonth) {
                    html += " border: 1px solid #006cff; border-radius: 50%; color: white; background-color: #006cff;";
                }
                html += "\">" + calendarDay + "</span>";
            }
            html += "</div>";
            calendarPos++;
        }
        html += "</li>";
    }
    html += "</ul>";
    html += "</div>";

    $(where).html(html);
    var dates = $(where).find(".dates");
    for(i = 0; i < calendarWeekCount; i++){
        for(j = 0; j < dates.length; j++){
            var a = dates.eq(j).find("span");
            if(a.length > 0){
                dates.eq(j).addClass("exist");
            }
        }
    }

    $(".link_con a").text(this_month+1+"월 목록 전체 보기");
    list_month = this_month + 1;
}

var af_balance = 0,
    pr_balance;
let tomonth;

function cal_balance(a, b){
    af_balance = parseInt(af_balance) + (a - b);
    pr_balance = parseInt(pr_balance) + (a - b);
}

function post_json(){
    var a = $("input[name='income']").val(),
        b = $("input[name='outcome']").val(),
        formdata = $("#inoutcomes").serialize();
        cal_balance(a, b);
        
        formdata += "&af_balance="+af_balance+"&table=budget_"+user_info[0].user_id+"&month="+tomonth+"&balance="+pr_balance+"&userId="+user_info[0].user_id;
        //console.log(formdata);
    $.ajax({
        type: "POST",
        url: "post.php",
        data: formdata,
        dataType: "json",
        success : function(data) {
            //console.log(data);
        }
    });
    alert("성공적으로 등록했습니다");
    $(".details_con").remove();
}

function del_rec(whatTable, whatColumn){
    $.ajax({
        type: "POST",
        url: "del.php",
        data: {
            table:whatTable,
            row:whatColumn,
            purpose:"del"
        },
        dataType: "json",
        async: false,
        success : function(data){
            result_data = data;
        }
    });
}

function get_json(whatTable, whatColumn, whatDate){
    var result_data;
    $.ajax({
        type: "GET",
        url: "get.php",
        data: {
            table:whatTable,
            row:whatColumn,
            find:whatDate
        },
        dataType: "json",
        async: false,
        success : function(data){
            result_data = data;
        }
    });
    return result_data;
}

function get_prbalance(user_id){
    var result_data;
    $.ajax({
        type: "GET",
        url: "balance.php",
        data: {
            row:user_id
        },
        dataType: "json",
        async: false,
        success : function(data){
            result_data = data;
        }
    });
    return result_data;
}

function login(){
    let login_id = $(".login_con .sub_con input[name='user_id']").val(),
        login_password = $(".login_con .sub_con input[name='user_pass']").val();
    user_info = get_json("budget_"+login_id, "all");
    //console.log(user_info);
    let db_msg = user_info.message,
        user_id,
        user_password;
    if(db_msg){

    }else {
        user_id = user_info[0].user_id,
        user_password = user_info[0].user_password;
    }

    if(db_msg == 'no data'){
        alert("아이디를 정확히 입력하세요");
        $(".login_con .sub_con input[name='user_id']").val("").focus();
        $(".login_con .sub_con input[name='user_pass']").val("");
    }else if(login_id == user_id && login_password !== user_password){
        alert("비밀번호를 정확히 입력하세요");
        $(".login_con .sub_con input[name='user_pass']").val("").focus();
    }else if(login_id == user_id && login_password == user_password){
        //alert("환영합니다 "+user_id+"님!");
        $(".main_con").fadeOut(500);
        setTimeout(() => {
            $(".main_con").remove();
        }, 500);
    }
    make_calendar(calendarMonth - 1, "#account_book .width_con .con_1");
}

function enter_login(e){
    if(e.keyCode == 13){
        login();
    }
    //console.log(e.keyCode);
}

function make_comma(number){
    let commaNum;
    commaNum = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+"원";
    return commaNum;
}

var noIndex,
    which,
    $lis,
    in_or_out,
    comes;
function click_edit(){
    var a = $("input[name='edit_target']").val(),
        b = $("input[name='edit_comes']").val();
    b = parseInt(b);
    let result = confirm("수정하시겠습니까?");
    if(result == true){
        var formdata = "";
        
        if(in_or_out == "in"){
            af_balance = af_balance + (b - comes);
            pr_balance = pr_balance + (b - comes);
            formdata += "af_balance="+af_balance+"&table=budget_"+user_info[0].user_id+"&noIndex="+noIndex+"&balance="+pr_balance+"&income_target="+a+"&income="+b+"&user_id="+user_info[0].user_id+"&ioro="+in_or_out;
        }else if(in_or_out == "ou"){
            af_balance = af_balance - (b - comes);
            pr_balance = pr_balance - (b - comes);
            formdata += "af_balance="+af_balance+"&table=budget_"+user_info[0].user_id+"&noIndex="+noIndex+"&balance="+pr_balance+"&outcome_target="+a+"&outcome="+b+"&user_id="+user_info[0].user_id+"&ioro="+in_or_out;
        }
        //console.log(formdata);
        $.ajax({
            type: "POST",
            url: "edit.php",
            data: formdata,
            dataType: "json",
            success : function(data) {
                //console.log(data);
            }
        });
        alert("수정이 완료되었습니다.");
        $(".edit_con").remove();
        $(".details_con").remove();
    }else{

    }
}

$(window).load(function(){

});

let list_month;

$(function(){
    var cookiedata = document.cookie;
    if(cookiedata.indexOf("close=Y")<0){
        $(".notice_con").show();
    }else{
        $(".notice_con").hide();
        $(".main_con").removeClass("cover");
    }

    let now_month = calendarMonth - 1;
    $(".wrap .width_con .btn.arrow").click(function(){
        if($(this).hasClass("btn_left")){
            now_month--;
        }else{
            now_month++;
        }
        if(now_month == -1){
            now_month = 11
        }else if(now_month == 12){
            now_month = 0;
        }
        $(".cal").remove();
        make_calendar(now_month, "#account_book .width_con .con_1");
        
    });

    $(".link_con").click(() => {
        location.href="http://hunay.co.kr/portfolio/financial/list.html?user="+user_info[0].user_id+"&month="+list_month;
    })

    $(document).on('click', '.dates.exist', function(){
        let todate,
            toincome = [],
            tooutcome = [],
            tobalance = [],
            prB = "",
            afB = "",
            rec_outcome = "",
            rec_income = "",
            total_outcome = 0,
            total_income = 0;

        af_balance = 0;
        tomonth = $(this).attr("data-month");
        todate = $(this).attr("data-date");
        //console.log(todate.substring(todate.length-2, todate.length));

        let account_infos = get_json("budget_"+user_info[0].user_id, todate, tomonth);
        //console.log("지출수입 내역", account_infos);
        // console.log(todate, "기준 계좌 잔액", account_infos.at(-1).af_balance);
        // console.log("현재 계좌 잔액", pr_balance);

        let account_balance = get_prbalance(user_info[0].user_id);
        //console.log(account_balance);
        pr_balance = account_balance[0].pr_balance;

        if(account_infos.message == "no data"){
            toincome.push("해당 일자는 수입 내역이 없습니다.");
            tooutcome.push("해당 일자는 지출 내역이 없습니다.");
            rec_outcome += `<li>${tooutcome[0]}</li>`;
            rec_income += `<li>${toincome[0]}</li>`;
            af_balance = pr_balance
        }else{
            for(i = 0; i < account_infos.length; i++){
                toincome.push({
                    income_target :account_infos[i].income_target,
                    income : account_infos[i].income
                });
                tooutcome.push({
                    outcome_target : account_infos[i].outcome_target,
                    outcome : account_infos[i].outcome
                });
                tobalance.push(account_infos[i].af_balance);
            }
            for(var i = 0; i < tooutcome.length; i++){
                if(tooutcome[i].outcome_target == "" || tooutcome[i].outcome == "0"){
                    
                }else{
                    rec_outcome += `<li>
                        <div class="num"><span class="comes_target">${tooutcome[i].outcome_target}</span> : <span class="comes">${tooutcome[i].outcome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>원</div>
                        <div class="btn"><a href="javascript:;" class="edit" data-no="${account_infos[i].no}"><i class="fas fa-pen"></i></a><a href="javascript:;" class="del" data-no="${account_infos[i].no}"><i class="fas fa-trash-alt"></i></a></div>
                    </li>`;
                    total_outcome += parseInt(tooutcome[i].outcome);
                }
            }
                
            for(var i = 0; i < toincome.length; i++){
                if(toincome[i].income_target == "" || toincome[i].income == "0"){
                    
                }else{
                    rec_income += `<li>
                        <div class="num"><span class="comes_target">${toincome[i].income_target}</span> : <span class="comes">${toincome[i].income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>원</div>
                        <div class="btn"><a href="javascript:;" class="edit" data-no="${account_infos[i].no}"><i class="fas fa-pen"></i></a><a href="javascript:;" class="del" data-no="${account_infos[i].no}"><i class="fas fa-trash-alt"></i></a></div>
                    </li>`;
                    total_income += parseInt(toincome[i].income);
                }
            }
            
            af_balance = tobalance.at(-1);
            
        }
        //console.log("수입내역", toincome);
        //console.log("지출내역", tooutcome);
        //console.log("잔액내역", tobalance);

        if(rec_outcome == ""){
            rec_outcome += "해당 일자는 지출 내역이 없습니다.";
        }else if(rec_income == ""){
            rec_income += "해당 일자는 수입 내역이 없습니다.";
        }else{

        }

        
        total_income = make_comma(total_income);
        total_outcome = make_comma(total_outcome)
        prB = make_comma(pr_balance);
        afB = make_comma(af_balance);

        $(this).parents(".cont").append(`<div class="details_con">
            <div class="inout">
                <div class="pr_account">
                    <p>현재 계좌 잔액 :</p>
                    <h3 class="pr_balance">${prB}</h3>
                </div>
                <div class="calc">
                    <div class="today">
                        <h4 class="pr_date"></h4>
                        <h5>수입 · 지출내역</h5>
                    </div>
                    <div class="income rec">
                        <h5>- 수입</h5>
                        <ul>
                            
                        </ul>
                        <div class="rec_res">
                            <h5>총 수입 금액 :</h5>
                            <h4 class="total">${total_income}</h4>
                        </div>
                    </div>
                    <div class="outcome rec">
                        <h5>- 지출</h5>
                        <ul>
                            
                        </ul>
                        <div class="rec_res">
                            <h5>총 지출 금액 :</h5>
                            <h4 class="total">${total_outcome}</h4>
                        </div>
                    </div>
                    <div class="result">
                        <h4 class="pr_date"></h4>
                        <div class="pr_account">
                            <p>기준 계좌 잔액 :</p>
                            <h3 class="af_balance">${afB}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form_con">
                <form id="inoutcomes" action="post.php" method="post">
                    <ul>
                        <li>
                            <h6>작성 일자</h6>
                            <input type="text" name="date" data-placeholder="등록일" required aria-required="true">
                        </li>
                        <li>
                            <h6>지출 내역을 입력해주세요</h6>
                            <input type="text" name="outcome_target" placeholder="짜장면">
                            <input class="nums" type="number" name="outcome" placeholder="0">
                        </li>
                        <li>
                            <h6>수입을 입력해주세요</h6>
                            <input type="text" name="income_target" placeholder="월급">
                            <input class="nums" type="number" name="income" placeholder="0">
                        </li>
                    </ul>
                    <button onclick="post_json()">등록</button>
                </form>
            </div>
            <div class="btn_box">
                <span class="btn_close">닫기</span>
            </div>
            <div class="btn_box mob">
                <span class="btn_close">X</span>
            </div>
        </div>`);
        
        $(".dates").css({"background": "#FFF"});
        $(this).css({"background": "#8cc8ff"});

        $("input[name='date']").val(todate);
        $(".calc h4.pr_date").text(todate);

        $(".outcome.rec ul").append(rec_outcome);
        $(".income.rec ul").append(rec_income);

        

    });


    $(document).on('click', '.btn_close', function(){
        $(this).parents(".details_con").remove();
    });

    $(document).on('click', '.edit, .del', function(){
        noIndex = $(this).attr("data-no");
        which = $(this).attr("class");
        $lis = $(this).parents("li");
        in_or_out = $(this).parents(".rec").attr("class").substr(0,2);
        if(which == "edit"){
            $(".cont").append(`<div class="edit_con">
                <h3>수정사항을 입력해주세요</h3>
                <form id="edit_form" action="edit.php" method="post">
                    <div class="input_con">
                        <input type="text" name="edit_target">
                    </div>
                    <div class="input_con">
                        <input type="number" name="edit_comes">
                    </div>
                    <div class="btn_con">
                        <a href="javascript: click_edit();">수정하기</a>
                    </div>
                </form>
            </div>`);
            comes = $lis.find(".num .comes").text();
            let target = $lis.find(".num .comes_target").text();
            comes = parseInt(comes.replace(/[^0-9]/g, ""));
            af_balance = parseInt(af_balance);
            pr_balance = parseInt(pr_balance);
            $("input[name='edit_comes']").val(comes);
            $("input[name='edit_target']").val(target);
        }else if(which == "del"){
            let result = confirm("정말 삭제하시겠습니까?");
            if(result == true){
                del_rec("budget_"+user_info[0].user_id, noIndex);
                $lis.remove();
                alert("성공적으로 삭제되었습니다.")
            }else{
                
            }
            
        }
    })
});

