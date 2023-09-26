<?php
include_once("connect.php");

$tbl = $_GET['table'];

$sql = "SELECT * FROM {$tbl}";
$result = $db->query($sql);
$arr = array();

if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        array_push($arr,
            array(
                'img_no' => $row['img_no'],
                'full_url' => base64_encode($row['full_url'])
            )
        );
    }
}else {
    // $arr = array('message' => 'no data');
}
echo json_encode($arr);

?>