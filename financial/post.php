<?php
include_once("connect.php");

    $tbl = $_POST['table'];
    $rw = $_POST['row'];
    $date = $_POST["date"];
    $start_date = $_POST["startDate"];
    $income_target = $_POST["income_target"];
    $income = $_POST["income"];
    $outcome_target = $_POST["outcome_target"];
    $outcome = $_POST["outcome"];
    $af_balance = $_POST["af_balance"];
    $pr_balance = $_POST["balance"];
    $user_name = $_POST["userName"];
    $user_password = $_POST["passWord"];
    $user_id = $_POST["userId"];
    $now_month = $_POST["month"];
    $purpose = $_POST["purpose"];

    if($start_date){
        $date = $start_date;
    }


    $result = mysqli_query($db, " SHOW tables LIKE '$tbl' ");
    if (!mysqli_num_rows($result) > 0) {
        $createTable = "CREATE TABLE `hunay6650`.`$tbl` (`No` INT(200) NOT NULL AUTO_INCREMENT , `user_name` VARCHAR(24) NOT NULL , `user_id` VARCHAR(24) NOT NULL , `user_password` VARCHAR(24) NOT NULL , `months` INT(2) NOT NULL , `dates` VARCHAR(24) NOT NULL , `income_target` VARCHAR(24) NOT NULL , `income` INT(12) NOT NULL , `outcome_target` VARCHAR(24) NOT NULL , `outcome` INT(12) NOT NULL , `af_balance` INT(12) NOT NULL , PRIMARY KEY (`No`)) ENGINE = InnoDB;";
        $db->query($createTable);

        $sql = "INSERT INTO `$tbl` (user_name, user_id, user_password, months, dates, income_target, income, outcome_target, outcome, af_balance) VALUES('$user_name', '$user_id', '$user_password', '$now_month', '$date', '$income_target', '$income', '$outcome_target', '$outcome', '$af_balance')";
        $db->query($sql);
    }else{
        $sql = "INSERT INTO `$tbl` (user_name, user_id, user_password, months, dates, income_target, income, outcome_target, outcome, af_balance) VALUES('$user_name', '$user_id', '$user_password', '$now_month', '$date', '$income_target', '$income', '$outcome_target', '$outcome', '$af_balance')";
        $db->query($sql);
    }
    
    

    $findBalance = mysqli_query($db, " select * from Balance where user_id='$user_id' ");
    if (!mysqli_num_rows($findBalance) > 0){
        $createBal = "INSERT INTO Balance (user_id, pr_balance) VALUES('$user_id', '$pr_balance')";
        $db->query($createBal);

        $sql_bal = "UPDATE `Balance` SET `user_id`='{$user_id}',`pr_balance`='{$pr_balance}' WHERE user_id='{$user_id}';";
        $db->query($sql_bal);
    }else{
        $sql_bal = "UPDATE `Balance` SET `user_id`='{$user_id}',`pr_balance`='{$pr_balance}' WHERE user_id='{$user_id}';";
        $db->query($sql_bal);
    }
    
    

    
    




?>