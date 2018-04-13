<?php

require_once 'connect.php';
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$myName = $POST_['myName'];
$highScore = $POST_['highScore'];

$sql = "INSERT INTO snake-scores (Name, Score) 
        VALUES ('$myName', '$highScore')";

if (mysqli_query($con, $sql)) {
    echo "";
} else {
    echo "Error: " . $sql . "" . mysqli_error($con);
}


mysqli_close($con);