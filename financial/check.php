<?php
include_once("connect.php");

$tbl = $_GET['table'];
$rw = $_GET['row'];

$sql = "SELECT * FROM {$tbl} WHERE user_id='{$rw}'";
$result = $db->query($sql);
$arr = array();

if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        array_push($arr,
            array('user_id' => $row['user_id']
            )
        );
    }
}else {
    $arr = array('message' => 'no data');
}
echo json_encode($arr);

?>
