<?php
  if(isset($_POST["summit"])) {
    $name=$_POST['fullname'];
    $email=$_POST['email'];
    $phone=$_POST['phone'];


    $to="sherif@su1trade.com";
    $subject="Registeration";
    $message="Name: ".$name. "\n". "Email: ".$email."\n". "Phone: ".$phone.
    $headers="From: ".$email;

    if(mail($to, $subject, $message, $headers)) {
      echo "<h1> Sent Successfully! Thank you"
    }
  }
?>


