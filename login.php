<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Pobierz dane z formularza
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Połącz z bazą danych MySQL
    $conn = new mysqli("db.zut.edu.pl", "ad50922", "NqJH1YtF", "ad50922");

    // Sprawdź połączenie
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Sprawdź dane logowania w bazie danych
    $sql = "SELECT * FROM Users WHERE Username='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['PasswordHash'])) {
            echo "Zalogowano pomyślnie!";
        } else {
            echo "Błędne hasło!";
        }
    } else {
        echo "Użytkownik nie istnieje!";
    }

    // Zamknij połączenie
    $conn->close();
}
?>
