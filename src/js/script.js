// Подгрузка шрифта (при использовании — поправить имя (FiraSans) и адрес (css/font_fira_sans.css) )

// (function(){
//     function addFont() {
//         var style = document.createElement('style');
//         style.rel = 'stylesheet';
//         document.head.appendChild(style);
//         style.textContent = localStorage.FiraSans;
//     }

//     try {
//         if (localStorage.FiraSans) {
//             // The font is in localStorage, we can load it directly
//             addFont();
//         } else {
//             // We have to first load the font file asynchronously
//             var request = new XMLHttpRequest();
//             request.open('GET', 'css/font_fira_sans.css', true);

//             request.onload = function() {
//                 if (request.status >= 200 && request.status < 400) {
//                     // We save the file in localStorage
//                     localStorage.FiraSans = request.responseText;
//                     // ... and load the font
//                     addFont();
//                 }
//             }

//             request.send();
//         }
//     } catch(ex) {
//         // maybe load the font synchronously for woff-capable browsers
//         // to avoid blinking on every request when localStorage is not available
//     }
// }());


$(document).ready(function() {

  // alert('fuck IE');

});