<?php
include_once("connect.php");

$tbl = $_GET['table'];
$rw = $_GET['row'];
$find = $_GET['find'];

if($tbl == "Balance"){
    $sql = "SELECT * FROM {$tbl}";
    $result = $db->query($sql);
    $arr = array();

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            array_push($arr,
                array('pr_balance' => $row['pr_balance'])
            );
        }
    }else {
        $arr = array('message' => 'no data');
    }
    echo json_encode($arr);

}else if($rw == "all") {
    $sql = "SELECT * FROM {$tbl}";
    $result = $db->query($sql);
    $arr = array();

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            array_push($arr,
                array('user_name' => $row['user_name'],
                    'user_id' => $row['user_id'],
                    'user_password' => $row['user_password'],
                    'month' => $row['months'],
                    'dates' => $row['dates'],
                    'income_target' => $row['income_target'],
                    'income' => $row['income'],
                    'outcome_target' => $row['outcome_target'],
                    'outcome' => $row['outcome'],
                    'af_balance' => $row['af_balance'],
                    'no' => $row['No']
                )
            );
        }
    }else {
        $arr = array('message' => 'no data');
    }
    echo json_encode($arr);
}else if(($rw == "list") && ($find)) {
    $sql = "SELECT * FROM {$tbl} WHERE months='{$find}'";
    $result = $db->query($sql);
    $arr = array();

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            array_push($arr,
                array('user_name' => $row['user_name'],
                    'user_id' => $row['user_id'],
                    'user_password' => $row['user_password'],
                    'month' => $row['months'],
                    'dates' => $row['dates'],
                    'income_target' => $row['income_target'],
                    'income' => $row['income'],
                    'outcome_target' => $row['outcome_target'],
                    'outcome' => $row['outcome'],
                    'af_balance' => $row['af_balance'],
                    'no' => $row['No']
                )
            );
        }
    }else {
        $arr = array('message' => 'no data');
    }
    echo json_encode($arr);
}else {
    $sql = "SELECT * FROM {$tbl} WHERE dates='{$rw}' AND months='{$find}'";
    $result = $db->query($sql);
    $arr = array();
    
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            array_push($arr,
                array('dates' => $row['dates'],
                    'income_target' => $row['income_target'],
                    'income' => $row['income'],
                    'outcome_target' => $row['outcome_target'],
                    'outcome' => $row['outcome'],
                    'af_balance' => $row['af_balance'],
                    'month' => $row['months'],
                    'no' => $row['No']
                )
            );
        }
    }else {
        $arr = array('message' => 'no data');
    }
    echo json_encode($arr);
}

?>