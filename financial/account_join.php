<?php
include_once("connect.php");

    $tbl = $_POST['table'];
    $date = $_POST["date"];
    $income_target = $_POST["income_target"];
    $income = $_POST["income"];
    $outcome_target = $_POST["outcome_target"];
    $outcome = $_POST["outcome"];
    $af_balance = $_POST["af_balance"];
    $user_name = $_POST["userName"];
    $user_password = $_POST["passWord"];


    $result = mysqli_query($db, " SHOW tables LIKE '$tbl' ");
    if (!mysqli_num_rows($result) > 0) {
        $createTable = "CREATE TABLE `hunay6650`.`$tbl` (`No` INT(200) NOT NULL AUTO_INCREMENT , `user_name` VARCHAR(24) NOT NULL , `user_password` VARCHAR(24) NOT NULL , `month` INT(2) NOT NULL , `dates` VARCHAR(24) NOT NULL , `income_target` VARCHAR(24) NOT NULL , `income` INT(12) NOT NULL , `outcome_target` VARCHAR(24) NOT NULL , `outcome` INT(12) NOT NULL , `af_balance` INT(12) NOT NULL , PRIMARY KEY (`No`)) ENGINE = InnoDB;";
        $db->query($createTable);
    }else{
        
    }
    //$sql = "INSERT INTO $tbl (dates, income_target, income, outcome_target, outcome, af_balance) VALUES('$date', '$income_target', '$income', '$outcome_target', '$outcome', '$af_balance')";
    
    $sql = "INSERT INTO `$tbl` (user_name, user_password, dates, income_target, income, outcome_target, outcome, af_balance) VALUES('$user_name', '$user_password', '$date', '$income_target', '$income', '$outcome_target', '$outcome', '$af_balance')";

    $db->query($sql);

    

    //$createTable = "CREATE TABLE `hunay6650`.`$tbl` (`No` INT(200) NOT NULL AUTO_INCREMENT , `dates` VARCHAR(24) NOT NULL , `income_target` VARCHAR(24) NOT NULL , `income` INT(12) NOT NULL , `outcome_target` VARCHAR(24) NOT NULL , `outcome` INT(12) NOT NULL , `af_balance` INT(12) NOT NULL , PRIMARY KEY (`No`)) ENGINE = InnoDB;";
    




?>