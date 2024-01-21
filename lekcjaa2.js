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
        } else if (target.id === "second_level_key" || target.id === "thrid_level_key") {
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
        // Convert entered values to uppercase for case-insensitive comparison
        var enteredSentence = enteredValues.join("");
        var correctSentence = "Andrzeju nie denerwuj sie";

        // Check if the entered sentence matches the correct sentence (case-insensitive)
        if (enteredSentence.toUpperCase() === correctSentence.toUpperCase()) {
            // If the sentence is correct, show a success message
            alert("Poprawna odpowiedź! Wpisałeś: " + enteredValues.join(""));
        } else {
            // If the sentence is incorrect, show an error message
            alert("Błędna odpowiedź. Spróbuj ponownie.");
        }

        // Clear entered values history
        enteredValues = [];

        // Update text input content
        updateTextInput();

        // Display an empty history on the page
        displayEnteredValues();
    }


});
