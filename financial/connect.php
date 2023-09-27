
<?php
//echo "Maria DB 연결 테스트<br>";
$db = mysqli_connect("localhost","hunay6650","Kth5035@H","hunay6650");
if($db){
//echo "connect: success<br>";
}else{
//echo "connect: failure<br>";
}
// $result = mysqli_query($db,'SELECT VERSION() as VERSION');
// $data = mysqli_fetch_assoc($result);
// echo $data['VERSION']."<br>";

// $sql = "SELECT * FROM windwarker";
// $res = mysqli_query($db, $sql);
// while($row = mysqli_fetch_array($res)){
//     echo $row['HP']." ".$row['energy']." ".$row['bubble']."<br>";
// }

// header("Content-Type: application/json; charset=utf-8");
// echo json_encode( $res, JSON_UNESCAPED_UNICODE );

?>