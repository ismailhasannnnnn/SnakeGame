<?php

$servername = "localhost:3306";
$UN = "buwqldmf";
$PW = "82TransAmKITT";
$dbname = "buwqldmf_team696";

$con = mysqli_connect($servername, $UN, $PW, $dbname);

if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}