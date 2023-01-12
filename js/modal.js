// Copyright (c) 2022 Yağız Işkırık
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Variables
var newModal = document.querySelector(".newModal");
var panel = document.getElementById("js-panel");
var btns = document.querySelectorAll(".flap__btn");

// On load, init panel
const showModal = function (title, text) {
    $('.panel__content h2').text(title);
    $('.panel__content p').text(text);
    $(newModal).show();
    setTimeout(() => {
        newModal.classList.add("active");
        panel.classList.add("is--open");
    }, 50);

    // If btns are clicked, hide panel
    // Show replay button    
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            hidePanel();
        });
    }

    function hidePanel() {
        panel.classList.remove("is--open");
        newModal.classList.remove("active");
        setTimeout(() => { $(newModal).hide(); }, 500);
    }
}