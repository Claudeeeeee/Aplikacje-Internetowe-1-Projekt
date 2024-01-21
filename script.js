// script.js
document.addEventListener("DOMContentLoaded", function() {
    var lessonsLitery = document.querySelectorAll(".lesson_block_litery");
    var lessonsCyfry = document.querySelectorAll(".lesson_block_cyfry");

    function redirectToLesson(lessonNumber) {
        window.location.href = 'lekcja' + lessonNumber + '.html';
    }

    lessonsLitery.forEach(function(lesson, index) {
        lesson.addEventListener("click", function() {
            redirectToLesson(index + 1);
        });
    });

    lessonsCyfry.forEach(function(lesson, index) {
        lesson.addEventListener("click", function() {
            redirectToLesson(index + 1);
        });
    });
});
