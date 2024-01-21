document.addEventListener("DOMContentLoaded", function() {
    var keyboard = document.getElementById("keyboard");
    var textInput = document.getElementById("text-input");
    var resultDiv = document.getElementById("result");

    // Inicjalizacja historii wpisanych wartości
    var enteredValues = [];

    keyboard.addEventListener("click", function(event) {
        var target = event.target;
        if (target.id === "key" || target.id === "spacebar" || target.id === "enter") {
            handleKeyClick(target.textContent);
        } else if (target.id === "second_level_key" || target.id === "third_level_key") {
            handleSpecialKeyClick(target.textContent);
        }
    });

    // Dodaj obsługę fizycznej klawiatury
    document.addEventListener("keydown", function(event) {
        // Sprawdź, czy wprowadzany tekst to pojedynczy znak (ignorując kombinacje klawiszy)
        if (event.key.length === 1) {
            handleKeyClick(event.key.toUpperCase()); // Użyj wielkich liter
        } else {
            // Obsługa klawiszy specjalnych (np. spacja, enter)
            var specialKeys = {
                " ": "SPACE",
                "Enter": "ENTER",
                "Backspace": "<-"
                // Dodaj inne specjalne klawisze według potrzeb
            };

            if (specialKeys[event.key]) {
                handleKeyClick(specialKeys[event.key]);
            }
        }
    });

    function handleKeyClick(keyValue) {
        console.log("Kliknięty klawisz:", keyValue);

        // Obsługa klawisza <-
        if (keyValue === "<-") {
            // Usuń ostatni wpisany znak
            enteredValues.pop();
        } else if (keyValue === "SPACE") {
            // Dodaj spację do historii
            enteredValues.push(" ");
        } else if (keyValue === "ENTER") {
            // Sprawdź, czy wpisana wartość jest poprawna
            verifyEnteredValues();
        } else {
            // Dodaj wpisany znak do historii
            enteredValues.push(keyValue);
        }

        // Aktualizuj zawartość pola tekstowego
        updateTextInput();

        // Wyświetl historię wpisanych wartości na stronie
        displayEnteredValues();
    }

    function handleSpecialKeyClick(keyValue) {
        console.log("Kliknięty klawisz specjalny:", keyValue);

        // Obsługa klawisza SPACE
        if (keyValue === "SPACE") {
            // Dodaj spację do historii
            enteredValues.push(" ");
        } else if (keyValue === "ENTER") {
            // Sprawdź, czy wpisana wartość jest poprawna
            verifyEnteredValues();
        } else {
            // Dodaj wpisany znak do historii
            enteredValues.push(keyValue);
        }

        // Aktualizuj zawartość pola tekstowego
        updateTextInput();

        // Wyświetl historię wpisanych wartości na stronie
        displayEnteredValues();
    }

    function updateTextInput() {
        // Aktualizuj zawartość pola tekstowego na podstawie wpisanych wartości
        textInput.value = enteredValues.join("");
    }

    function displayEnteredValues() {
        // Wyświetl historię wpisanych wartości na stronie
        resultDiv.innerHTML = "Wpisano: " + enteredValues.join(", ");
    }

    function verifyEnteredValues() {
        // Sprawdź, czy każda pojedyncza litera zgadza się z lekcją (ignorując wielkość liter)
        for (var i = 0; i < enteredValues.length; i++) {
            var singleLetter = enteredValues[i].toLowerCase();
            if (singleLetter !== "k" && singleLetter !== "l" && singleLetter !== "m") {
                // Jeśli choć jedna litera nie zgadza się z lekcją, pokaż błąd i zakończ sprawdzanie
                alert("Błędna odpowiedź. Spróbuj ponownie.");
                return;
            }
        }

        // Jeśli wszystkie litery są poprawne, pokaż komunikat o poprawnej odpowiedzi
        alert("Poprawna odpowiedź! Wpisałeś: " + enteredValues.join("").toLowerCase());

        // Wyczyść historię wpisanych wartości
        enteredValues = [];

        // Aktualizuj zawartość pola tekstowego
        updateTextInput();

        // Wyświetl pustą historię na stronie
        displayEnteredValues();
    }
});
