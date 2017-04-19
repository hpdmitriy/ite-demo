<?php
if ($_POST['send']) {
  $errors = array();
  $result = false;

  $host = $_SERVER['SERVER_NAME'];
  $ip = $_SERVER["REMOTE_ADDR"];
  //$company = trim($_POST['company']);
  $email = trim($_POST['email']);
  //$job = trim($_POST['job']);
  $name = trim($_POST['name']);
  $send = trim($_POST['send']);
  $tel = trim($_POST['tel']);
  $theme = trim($_POST['theme']);
  $date = date("d-m-Y  H:m:s", time());
  $filename = $feed['send'] . "_mail_send.html";
  $success = "<h2>Спасибо!</h2><p>Ваш запрос отправлен.</p><h5>Мы свяжемся с Вами в  ближайшее время.<h5>";


  if (!empty($email) && !preg_match('/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,10}$/i', $email)) {
    $errors['email'] = "Не валидный email";
  }
  if (empty($name)) {
    $errors['name'] = "Обязательное поле";
  }
  if (empty($tel) && empty($email)) {
    $errors['tel'] = "Обязательное поле Телефон или Email";
    $errors['email'] = "Обязательное поле Email или Телефон";
  }

  if ($errors) {
    $result = array(
      'status' => $result,
      'errors' => $errors,
      'step' => 2
    );
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_QUOT);
  } else {

    $message = 'Имя: ' . $name . "<br>\n";
    $message .= 'Телефон: ' . $tel . "<br>\n";
    $message .= 'Email: ' . $email . "<br>\n";
    $message .= 'IP: ' . $ip . "<br>\n";

    $emails = array('test@svga.name', 'zakaz@itegroup.ru');
    $subject = "Сообщение с формы «" . $theme . "»";
    $headers = "From: «ITExpert Group» <noreply@" . $host . ">\n";
    $headers .= "Content-type: text/html; charset=\"utf-8\"\nX-Mailer: PHP/" . phpversion();
    $date = date("d-m-Y  H:m:s", time());
    $filename = $send . "_mail_send.html";
    $putmsg = "<h2>" . $date . " | " . $subject . "</h2>\n<p>" . $message . "</p>\n<hr>";

    $len = sizeof($emails);
    $ok = '';
    foreach ($emails as $to) {
      --$len;
      mail($to, $subject, $message, $headers);
      if (!$len) {
        $ok = 'OK';
      }
    }
    if ($ok == 'OK') {
      $result = true;
      $result = array(
        'status' => $result,
        'errors' => false,
        'step' => 10,
        'msg' => $success
      );
      echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_QUOT);
      file_put_contents($_SERVER["DOCUMENT_ROOT"] . '/forms/' . $filename, $putmsg, FILE_APPEND);
    } else {
      $result = array(
        'status' => $result,
        'errors' => "Серверная ошибка"
      );
      echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_QUOT);
    }
  }
} else {
  die("404");
}