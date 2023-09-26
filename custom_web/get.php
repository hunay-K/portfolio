<?php
include_once("connect.php");

$tbl = $_GET['table'];
$rw = $_GET['row'];
$find = $_GET['find'];
$find2 = $_GET['find2'];

if($tbl == "admin_user"){
    $sql = "SELECT * FROM {$tbl}";
    $result = $db->query($sql);
    $arr = array();

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            array_push($arr,
                array(
                    'user_id' => $row['user_id'],
                    'password' => $row['password']
                )
            );
        }
    }else {
        $arr = array('message' => 'no data');
    }
    echo json_encode($arr);

}else if($tbl == "admin_profile") {
    $sql = "SELECT * FROM {$tbl}";
    $result = $db->query($sql);
    $arr = array();

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            array_push($arr,
                array('addr' => $row['addr'],
                    'mall_name' => $row['mall_name'],
                    'regist_num' => $row['regist_num'],
                    'shop_tel' => $row['shop_tel'],
                    'nick_name' => $row['nick_name'],
                    'email' => $row['email'],
                    'name' => $row['name'],
                    'user_tel' => $row['user_tel'],
                    'user_id' => $row['user_id'],
                    'img_url' => base64_encode($row['image'])
                )
            );
        }
    }else {
        $arr = array('message' => 'no data');
    }
    echo json_encode($arr);
}else if($tbl == "admin_basic"){
    $sql = "SELECT * FROM {$tbl}";
    $result = $db->query($sql);
    $arr = array();

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            array_push($arr,
                array('around_show' => $row['around_show'],
                    'charge_show' => $row['charge_show'],
                    'company_name' => $row['company_name'],
                    'footer_copy' => $row['footer_copy'],
                    'kakao_channel' => $row['kakao_channel'],
                    'kakao_channel_show' => $row['kakao_channel_show'],
                    'link_menu_show' => $row['link_menu_show'],
                    'logo_show' => $row['logo_show'],
                    'main_menu_color' => $row['main_menu_color'],
                    'map_show' => $row['map_show'],
                    'naver_reserve' => $row['naver_reserve'],
                    'naver_reserve_show' => $row['naver_reserve_show'],
                    'notice_show' => $row['notice_show'],
                    'review_show' => $row['review_show'],
                    'site_name' => $row['site_name'],
                    'sub_menu_color' => $row['sub_menu_color'],
                    'vod_show' => $row['vod_show'],
                    'logo_url' => base64_encode($row['logo_url'])
                )
            );
        }
    }else {
        $arr = array('message' => 'no data');
    }
    echo json_encode($arr);
}else if($tbl == "admin_main" || $tbl == "admin_around"){

    $sql = "SELECT * FROM {$tbl}";
    $result = $db->query($sql);
    $arr = array();

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            array_push($arr,
                array('bgcolor' => $row['bgcolor'],
                    'bgcolor_show' => $row['bgcolor_show'],
                    'code' => $row['code'],
                    'menu_no' => $row['menu_no'],
                    'menu_show' => $row['menu_show'],
                    'name' => $row['name'],
                    'title' => $row['title'],
                    'title_show' => $row['title_show'],
                    'transparent' => $row['transparent']
                )
            );
        }
    }else {
        $arr = array('message' => 'no data');
    }
    echo json_encode($arr);

}else if($tbl == "admin_notice" || $tbl == "admin_charge" || $tbl == "admin_review" || $tbl == "admin_vod"){

    $sql = "SELECT * FROM {$tbl}";
    $result = $db->query($sql);
    $arr = array();

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            array_push($arr,
                array('bgcolor' => $row['bgcolor'],
                    'bgcolor_show' => $row['bgcolor_show'],
                    'code' => $row['code'],
                    'menu_no' => $row['menu_no'],
                    'menu_show' => $row['menu_show'],
                    'name' => $row['name'],
                    'title' => $row['title'],
                    'title_show' => $row['title_show'],
                    'transparent' => $row['transparent'],
                    'img' => base64_encode($row['img'])
                )
            );
        }
    }else {
        $arr = array('message' => 'no data');
    }
    echo json_encode($arr);

}else if($tbl == "admin_map"){

    $sql = "SELECT * FROM {$tbl}";
    $result = $db->query($sql);
    $arr = array();

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            array_push($arr,
                array('addr' => $row['addr'],
                    'bgcolor' => $row['bgcolor'],
                    'bgcolor_show' => $row['bgcolor_show'],
                    'bus' => $row['bus'],
                    'bus_show' => $row['bus_show'],
                    'code' => $row['code'],
                    'google' => $row['google'],
                    'menu_show' => $row['menu_show'],
                    'name' => $row['name'],
                    'subway' => $row['subway'],
                    'subway_show' => $row['subway_show'],
                    'tel' => $row['tel'],
                    'transparent' => $row['transparent'],
                    'img' => base64_encode($row['img']),
                    'img2' => base64_encode($row['img2'])
                )
            );
        }
    }else {
        $arr = array('message' => 'no data');
    }
    echo json_encode($arr);

}else if($tbl == "admin_board"){

    if($find){
        if($find == 'notice'){
            $sql = "SELECT * FROM {$tbl} WHERE board_type='{$find}' OR board_type='event'";
        }else{
            $sql = "SELECT * FROM {$tbl} WHERE board_type='{$find}'";
        }
    }else{
        $sql = "SELECT * FROM {$tbl}";
    }

    $result = $db->query($sql);
    $arr = array();

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            array_push($arr,
                array('board_no' => $row['board_no'],
                    'board_type' => $row['board_type'],
                    'score' => $row['score'],
                    'board_title' => $row['board_title'],
                    'board_writer' => $row['board_writer'],
                    'board_date' => $row['board_date'],
                    'board_hit' => $row['board_hit'],
                    'board_content' => $row['board_content'],
                    'movie_url' => $row['movie_url']
                )
            );
        }
    }else {
        
    }
    echo json_encode($arr);

}


// else if(($rw == "list") && ($find)) {
//     $sql = "SELECT * FROM {$tbl} WHERE months='{$find}'";
//     $result = $db->query($sql);
//     $arr = array();

//     if($result->num_rows > 0){
//         while($row = $result->fetch_assoc()){
//             array_push($arr,
//                 array('user_name' => $row['user_name'],
//                     'user_id' => $row['user_id'],
//                     'user_password' => $row['user_password'],
//                     'month' => $row['months'],
//                     'dates' => $row['dates'],
//                     'income_target' => $row['income_target'],
//                     'income' => $row['income'],
//                     'outcome_target' => $row['outcome_target'],
//                     'outcome' => $row['outcome'],
//                     'af_balance' => $row['af_balance'],
//                     'no' => $row['No']
//                 )
//             );
//         }
//     }else {
//         $arr = array('message' => 'no data');
//     }
//     echo json_encode($arr);
// }else {
//     $sql = "SELECT * FROM {$tbl} WHERE dates='{$rw}' AND months='{$find}'";
//     $result = $db->query($sql);
//     $arr = array();
    
//     if($result->num_rows > 0){
//         while($row = $result->fetch_assoc()){
//             array_push($arr,
//                 array('dates' => $row['dates'],
//                     'income_target' => $row['income_target'],
//                     'income' => $row['income'],
//                     'outcome_target' => $row['outcome_target'],
//                     'outcome' => $row['outcome'],
//                     'af_balance' => $row['af_balance'],
//                     'month' => $row['months'],
//                     'no' => $row['No']
//                 )
//             );
//         }
//     }else {
//         $arr = array('message' => 'no data');
//     }
//     echo json_encode($arr);
// }

?>