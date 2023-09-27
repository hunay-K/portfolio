<?php
include_once("connect.php");

    $tbl = $_POST['table'];
    $income_target = $_POST["income_target"];
    $income = $_POST["income"];
    $outcome_target = $_POST["outcome_target"];
    $outcome = $_POST["outcome"];
    $af_balance = $_POST["af_balance"];
    $pr_balance = $_POST["balance"];
    $noIndex = $_POST["noIndex"];
    $user_id = $_POST["user_id"];
    $jubge = $_POST["ioro"];

    if($jubge == "in"){
        $sql = "UPDATE `{$tbl}` SET `income_target` = '{$income_target}', `income` = '{$income}', `af_balance` = '{$af_balance}' WHERE `{$tbl}`.`No` = '{$noIndex}'";
        $db->query($sql);
    }else if($jubge == "ou") {
        $sql = "UPDATE `{$tbl}` SET `outcome_target` = '{$outcome_target}', `outcome` = '{$outcome}', `af_balance` = '{$af_balance}' WHERE `{$tbl}`.`No` = '{$noIndex}'";
        $db->query($sql);
    }

    $sql_bal = "UPDATE `Balance` SET `user_id`='{$user_id}',`pr_balance`='{$pr_balance}' WHERE user_id='{$user_id}';";
    $db->query($sql_bal);

    

?>