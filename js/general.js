// Copyright (c) 2022 Yağız Işkırık
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Toasts a default alert
function toastAlert() {
    var alertContent = "This is a default alert with <a href='#' class='alert-link'>a link</a> being toasted.";
    // Built-in function
    halfmoon.initStickyAlert({
        content: alertContent,
        title: "Toast!"
    })
}

var vanta;

const addBG = () => {
    if (!halfmoon.darkModeOn) {
        if (vanta == undefined) {
            vanta = VANTA.NET({
                el: ".content-wrapper",
                mouseControls: false,
                touchControls: false,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                backgroundColor: 0xffffff,
                color: 0xd5a245,
                scale: 1.00,
                scaleMobile: 1.00,
                points: 10.0,
                maxDistance: 20.0,
                spacing: 15.0
            });
        } else {
            vanta.setOptions({
                backgroundColor: 0xffffff
            });
            vanta.resize();
        }
    } else {
        if (vanta == undefined) {
            vanta = VANTA.NET({
                el: ".content-wrapper",
                mouseControls: false,
                touchControls: false,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                backgroundColor: 0x26282C,
                color: 0xd5a245,
                scale: 1.00,
                scaleMobile: 1.00,
                points: 10.0,
                maxDistance: 20.0,
                spacing: 15.0
            });
        } else {
            vanta.setOptions({
                backgroundColor: 0x26282c
            });
        }
    }
}

const toggleDarkMode = () => {
    halfmoon.toggleDarkMode();
    addBG()
}

setTimeout(() => {
    addBG();
}, 10);