<?php
include_once("connect.php");

    $tbl = $_POST['table'];
    $file = addslashes(file_get_contents($_FILES["img"]["tmp_name"]));
    $file2 = addslashes(file_get_contents($_FILES["img2"]["tmp_name"]));
    $code = $_POST['code'];
    $purpose = $_POST['purpose'];
    $img_no = $_POST['img_no'];
    $idfy = $_POST['idfy'];

    if($code == 'slide'){
        $sql = "INSERT INTO `$tbl` (full_url) VALUES('$file')";
        $db->query($sql);
    }

    if($purpose == 'del'){
        $sql = "DELETE FROM `$tbl` WHERE img_no = '$img_no'";
        $db->query($sql);
    }

    if($purpose == 'write'){
        $board_title = $_POST['board_title'];
        $score = $_POST['score'];
        $board_content = $_POST['board_content'];
        $board_writer = $_POST['board_writer'];
        $movie_url = $_POST['movie_url'];
        $date = date("Y-m-d H:i:s");

        $sql = "INSERT INTO `$tbl`(`board_type`, `score`, `board_title`, `board_writer`, `board_date`, `board_hit`, `board_content`, `movie_url`) VALUES ('$code','$score','$board_title','$board_writer','$date','[value-6]','$board_content','$movie_url')";
        $db->query($sql);
    }

    if($purpose == 'del_board'){
        $board_no = $_POST['board_no'];

        $sql = "DELETE FROM `$tbl` WHERE board_no = '$board_no'";
        $db->query($sql);
    }

    if($purpose == 'edit_board'){
        $board_no = $_POST['board_no'];
        $board_title = $_POST['board_title'];
        $score = $_POST['score'];
        $board_content = $_POST['board_content'];
        $board_writer = $_POST['board_writer'];
        $movie_url = $_POST['movie_url'];
        $date = date("Y-m-d H:i:s");

        $sql = "UPDATE `$tbl` SET `score`='$score',`board_title`='$board_title',`board_writer`='$board_writer',`board_date`='$date',`board_content`='$board_content',`movie_url`='$movie_url' WHERE board_no = '$board_no'";
        $db->query($sql);
    }


    if($tbl == 'admin_profile'){
        $nickname = $_POST['nick_name'];
        $img_del = $_POST['img_del'];
        if($file){
            $sql = "UPDATE `{$tbl}` SET `nick_name`='{$nickname}', `image`='{$file}';";
        }else if($img_del == 'Y'){
            $sql = "UPDATE `{$tbl}` SET `nick_name`='{$nickname}', `image`=DEFAULT;";
        }else{
            $sql = "UPDATE `{$tbl}` SET `nick_name`='{$nickname}';";
        }
        $db->query($sql);
    }

    if($tbl == 'admin_basic'){
        $around_show = $_POST['around_show'];
        $charge_show = $_POST['charge_show'];
        $company_name = $_POST['company_name'];
        $footer_copy = $_POST['footer_copy'];
        $kakao_channel = $_POST['kakao_channel'];
        $kakao_channel_show = $_POST['kakao_channel_show'];
        $logo_show = $_POST['logo_show'];
        $main_menu_color = $_POST['main_menu_color'];
        $map_show = $_POST['map_show'];
        $naver_reserve = $_POST['naver_reserve'];
        $naver_reserve_show = $_POST['naver_reserve_show'];
        $notice_show = $_POST['notice_show'];
        $review_show = $_POST['review_show'];
        $site_name = $_POST['site_name'];
        $sub_menu_color = $_POST['sub_menu_color'];
        $vod_show = $_POST['vod_show'];

        $sql = "UPDATE `{$tbl}` SET `around_show`='{$around_show}', `charge_show`='{$charge_show}', `company_name`='{$company_name}', `footer_copy`='{$footer_copy}', `kakao_channel`='{$kakao_channel}', `kakao_channel_show`='{$kakao_channel_show}', `logo_show`='{$logo_show}', `main_menu_color`='{$main_menu_color}', `map_show`='{$map_show}', `naver_reserve`='{$naver_reserve}', `naver_reserve_show`='{$naver_reserve_show}', `notice_show`='{$notice_show}', `review_show`='{$review_show}', `site_name`='{$site_name}', `sub_menu_color`='{$sub_menu_color}', `vod_show`='{$vod_show}'";
        if($file){
            $sql = $sql.", `logo_url`='{$file}'";
        }
        $db->query($sql);
    }

    if($tbl == 'admin_main' || $idfy == 'admin_setting'){
        $bgcolor = $_POST['bgcolor'];
        $bgcolor_show = $_POST['bgcolor_show'];
        $code = $_POST['code'];
        $menu_no = $_POST['menu_no'];
        $menu_show = $_POST['menu_show'];
        $name = $_POST['name'];
        $title = $_POST['title'];
        $title_show = $_POST['title_show'];
        $transparent = $_POST['transparent'];
        $img_del = $_POST['img_del'];

        if($file){
            $sql = "UPDATE `{$tbl}` SET `bgcolor`='{$bgcolor}', `bgcolor_show`='{$bgcolor_show}', `code`='{$code}', `menu_no`='{$menu_no}', `menu_show`='{$menu_show}', `name`='{$name}', `title`='{$title}', `title_show`='{$title_show}', `transparent`='{$transparent}', `img`='{$file}'";
        }else if($img_del == 'Y'){
            $sql = "UPDATE `{$tbl}` SET `bgcolor`='{$bgcolor}', `bgcolor_show`='{$bgcolor_show}', `code`='{$code}', `menu_no`='{$menu_no}', `menu_show`='{$menu_show}', `name`='{$name}', `title`='{$title}', `title_show`='{$title_show}', `transparent`='{$transparent}', `img`=DEFAULT";
        }else{
            $sql = "UPDATE `{$tbl}` SET `bgcolor`='{$bgcolor}', `bgcolor_show`='{$bgcolor_show}', `code`='{$code}', `menu_no`='{$menu_no}', `menu_show`='{$menu_show}', `name`='{$name}', `title`='{$title}', `title_show`='{$title_show}', `transparent`='{$transparent}'";
        }

        $db->query($sql);
    }

    if($tbl == "admin_map"){
        $bgcolor = $_POST['bgcolor'];
        $bgcolor_show = $_POST['bgcolor_show'];
        $code = $_POST['code'];
        $menu_show = $_POST['menu_show'];
        $name = $_POST['name'];
        $transparent = $_POST['transparent'];
        $addr = $_POST['addr'];
        $img_del = $_POST['img_del'];
        $img_del2 = $_POST['img_del2'];
        $bus = $_POST['bus'];
        $bus_show = $_POST['bus_show'];
        $google = $_POST['google'];
        $subway = $_POST['subway'];
        $subway_show = $_POST['subway_show'];
        $tel = $_POST['tel'];

        if($file !== "" && $file2 !== ""){
            $sql = "UPDATE `{$tbl}` SET `addr`='{$addr}',`bgcolor`='{$bgcolor}',`bgcolor_show`='{$bgcolor_show}',`bus`='{$bus}',`bus_show`='{$bus_show}',`code`='{$code}',`google`='{$google}',`menu_show`='{$menu_show}',`name`='{$name}',`subway`='{$subway}',`subway_show`='{$subway_show}',`tel`='{$tel}',`transparent`='{$transparent}',`img`='{$file}',`img2`='{$file2}'";
        }else if($file !== "" && $file2 == ""){
            $sql = "UPDATE `{$tbl}` SET `addr`='{$addr}',`bgcolor`='{$bgcolor}',`bgcolor_show`='{$bgcolor_show}',`bus`='{$bus}',`bus_show`='{$bus_show}',`code`='{$code}',`google`='{$google}',`menu_show`='{$menu_show}',`name`='{$name}',`subway`='{$subway}',`subway_show`='{$subway_show}',`tel`='{$tel}',`transparent`='{$transparent}',`img`='{$file}'";
        }else if($file == "" && $file2 !== ""){
            $sql = "UPDATE `{$tbl}` SET `addr`='{$addr}',`bgcolor`='{$bgcolor}',`bgcolor_show`='{$bgcolor_show}',`bus`='{$bus}',`bus_show`='{$bus_show}',`code`='{$code}',`google`='{$google}',`menu_show`='{$menu_show}',`name`='{$name}',`subway`='{$subway}',`subway_show`='{$subway_show}',`tel`='{$tel}',`transparent`='{$transparent}', `img2`='{$file2}'";
        }else if($img_del == "Y" && $img_del2 == "Y"){
            $sql = "UPDATE `{$tbl}` SET `addr`='{$addr}',`bgcolor`='{$bgcolor}',`bgcolor_show`='{$bgcolor_show}',`bus`='{$bus}',`bus_show`='{$bus_show}',`code`='{$code}',`google`='{$google}',`menu_show`='{$menu_show}',`name`='{$name}',`subway`='{$subway}',`subway_show`='{$subway_show}',`tel`='{$tel}',`transparent`='{$transparent}',`img`=DEFAULT,`img2`=DEFAULT";
        }else if($img_del == "Y" && $img_del2 == "N"){
            $sql = "UPDATE `{$tbl}` SET `addr`='{$addr}',`bgcolor`='{$bgcolor}',`bgcolor_show`='{$bgcolor_show}',`bus`='{$bus}',`bus_show`='{$bus_show}',`code`='{$code}',`google`='{$google}',`menu_show`='{$menu_show}',`name`='{$name}',`subway`='{$subway}',`subway_show`='{$subway_show}',`tel`='{$tel}',`transparent`='{$transparent}',`img`=DEFAULT";
        }else if($img_del == "N" && $img_del2 == "Y"){
            $sql = "UPDATE `{$tbl}` SET `addr`='{$addr}',`bgcolor`='{$bgcolor}',`bgcolor_show`='{$bgcolor_show}',`bus`='{$bus}',`bus_show`='{$bus_show}',`code`='{$code}',`google`='{$google}',`menu_show`='{$menu_show}',`name`='{$name}',`subway`='{$subway}',`subway_show`='{$subway_show}',`tel`='{$tel}',`transparent`='{$transparent}',`img2`=DEFAULT";
        }else{
            $sql = "UPDATE `{$tbl}` SET `addr`='{$addr}',`bgcolor`='{$bgcolor}',`bgcolor_show`='{$bgcolor_show}',`bus`='{$bus}',`bus_show`='{$bus_show}',`code`='{$code}',`google`='{$google}',`menu_show`='{$menu_show}',`name`='{$name}',`subway`='{$subway}',`subway_show`='{$subway_show}',`tel`='{$tel}',`transparent`='{$transparent}'";
        }

        $db->query($sql);
    }

    // $result = mysqli_query($db, " SHOW tables LIKE '$tbl' ");
    // if (!mysqli_num_rows($result) > 0) {
    //     $createTable = "CREATE TABLE `hunay6650`.`$tbl` (`No` INT(200) NOT NULL AUTO_INCREMENT , `user_name` VARCHAR(24) NOT NULL , `user_id` VARCHAR(24) NOT NULL , `user_password` VARCHAR(24) NOT NULL , `months` INT(2) NOT NULL , `dates` VARCHAR(24) NOT NULL , `income_target` VARCHAR(24) NOT NULL , `income` INT(12) NOT NULL , `outcome_target` VARCHAR(24) NOT NULL , `outcome` INT(12) NOT NULL , `af_balance` INT(12) NOT NULL , PRIMARY KEY (`No`)) ENGINE = InnoDB;";
    //     $db->query($createTable);

    //     $sql = "INSERT INTO `$tbl` (user_name, user_id, user_password, months, dates, income_target, income, outcome_target, outcome, af_balance) VALUES('$user_name', '$user_id', '$user_password', '$now_month', '$date', '$income_target', '$income', '$outcome_target', '$outcome', '$af_balance')";
    //     $db->query($sql);
    // }else{
    //     $sql = "INSERT INTO `$tbl` (user_name, user_id, user_password, months, dates, income_target, income, outcome_target, outcome, af_balance) VALUES('$user_name', '$user_id', '$user_password', '$now_month', '$date', '$income_target', '$income', '$outcome_target', '$outcome', '$af_balance')";
    //     $db->query($sql);
    // }
    
    

    // $findBalance = mysqli_query($db, " select * from Balance where user_id='$user_id' ");
    // if (!mysqli_num_rows($findBalance) > 0){
    //     $createBal = "INSERT INTO Balance (user_id, pr_balance) VALUES('$user_id', '$pr_balance')";
    //     $db->query($createBal);

    //     $sql_bal = "UPDATE `Balance` SET `user_id`='{$user_id}',`pr_balance`='{$pr_balance}' WHERE user_id='{$user_id}';";
    //     $db->query($sql_bal);
    // }else{
    //     $sql_bal = "UPDATE `Balance` SET `user_id`='{$user_id}',`pr_balance`='{$pr_balance}' WHERE user_id='{$user_id}';";
    //     $db->query($sql_bal);
    // }
    
    

    
    




?>