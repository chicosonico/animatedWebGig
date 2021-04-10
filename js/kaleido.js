/*
Full version:
https://henryegloff.com/kaleidotext/

Info:
https://henryegloff.com/kaleidotext-app/

*/

var elements = document.querySelectorAll(".animation");

anime({
    targets: ".animation",
    rotate: "1turn",
    easing: "linear",
    loop: true,
    duration: 3000
});
