<?php
header('Content-Type: text/html; charset=utf-8');

$mysqli = mysqli_connect("localhost", "xcushycx_trein", "trein", "xcushycx_trein");
if ($mysqli == false){
    print("Ошибка: Невозможно подключиться к MySQL " . mysqli_connect_error());
}else{
    print("Соединение установлено успешно");
    $name = $_POST["name"];
    $lastname = $_POST["lastname"];
    $email = $_POST["email"];
    $pass = $_POST["pass"];

    $result = $mysqli-> query("SELECT * FROM `table1` WHERE `email`");

    // var_dump($result);
    // var_dump($result->num_rows);

    if ($result->num_rows != 0){
        print("Такой пользователь уже существует");
    } else {
        $mysqli-> query("INSERT INTO `table1`(`id`, `name`, `lastname`, `email`, `pass`) VALUES ('$name', '$lastname', '$email', '$pass')");
        print("Пользователь успешно зарегистрирован");
    }

    // echo "Имя: $name<br>
    // Фамилия: $lastname <br>
    // Email: $email <br>
    // Пароль: $pass <hr>";
    
}


?>











