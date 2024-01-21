<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Pobierz dane z formularza
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Połącz z bazą danych MySQL
    $conn = new mysqli("db.zut.edu.pl", "ad50922", "NqJH1YtF", "ad50922");

    // Sprawdź połączenie
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Zapisz dane do bazy danych
    $sql = "INSERT INTO Users (Username, PasswordHash) VALUES ('$username', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo "Użytkownik zarejestrowany pomyślnie";
    } else {
        echo "Błąd podczas rejestracji użytkownika: " . $conn->error;
    }

    // Zamknij połączenie
    $conn->close();
}
?>
