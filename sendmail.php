<?php
$to="ms.oldorf@gmail.com";

$type=$_REQUEST['type'];
$navn=$_REQUEST['navn'];
$email=$_REQUEST['email'];

$besked=$_REQUEST['besked'];
$subject="Tilmelding til nyhedsbrev" . $navn . ": ". $email;

$header = "Content-type: text/html; charset=utf-8" . "\r\n";
$header.="from:ms.oldorf@mathildeoldorf.dk";

mail($to, $subject, $message, $header);
header("Location: index.html");
?>
