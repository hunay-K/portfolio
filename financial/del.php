<?php
include_once("connect.php");

    $tbl = $_POST['table'];
    $rw = $_POST['row'];
    $purpose = $_POST["purpose"];

    if($purpose == "del"){
        $deleteWhat = "DELETE FROM `$tbl` WHERE `$tbl`.`No` = $rw";
        $db->query($deleteWhat);
    }else if($purpose == "edit"){

    }

?>