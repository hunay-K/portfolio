<?php
include_once("connect.php");

$id = $_GET['row'];

$sql = "SELECT * FROM `Balance` WHERE user_id='{$id}'";
$result = $db->query($sql);
$arr = array();

if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        array_push($arr,
            array(
                'pr_balance' => $row['pr_balance'],
                'user_id' => $row['user_id']
            )
        );
    }
}else {
    $arr = array('message' => 'no data');
}
echo json_encode($arr);


?>