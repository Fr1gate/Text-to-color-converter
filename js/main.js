/*
    Как оформить скрипт.
    Нужно: 
        1)  Иметь возможность загружать свои наборы цветов.
        2)  Переключать язык.
        3)  одной функцией получить массив из любой строки. Массив через return, а не глобально
        4)  вообще убрать глобальные переменные, кроме html элементов
*/

var textarea = document.querySelector('#string-in'); //input field
var inputString = textarea.innerHTML; //string to convert
var gradContainer = document.querySelector('.gradient-container'); //container width gradients
var grad = document.querySelector('.result-gradient'); //gradient DIV |||| DO I NEED IT?
var textToColor = { //letter - color associative array. Current color collection
    
};
var colorsArrs = []; // array or string->color arrays 

function clearObj(arr) { //clear associative array (actually object)
    for (var prop in arr) {
        if (arr.hasOwnProperty(prop)) {
            delete arr[prop];
        }
    }
}

function getColors() { //fill textToColor associative array
    clearObj(textToColor);
    document.querySelectorAll('li.letter').forEach(el => {
        var letter = el.querySelector('span').innerText;
        var color = el.querySelector('input').value;

        textToColor[letter] = color;
    });
}

function setColors() { //display new colors from textToColor
    document.querySelectorAll('li.letter').forEach(el => {
        var letter = el.querySelector('span').innerText;
        el.querySelector('input').value = textToColor[letter];
    });
}

function arrToCss(arr) {
    var cssArr = '';
    arr.forEach(v => {
        cssArr += v + ', '
    })
    return cssArr.slice(0, cssArr.length - 2);
}

function transformText() {
    colorsArrs.length = 0; 
    getColors();                             //got array
    let text = textarea.value.toUpperCase(); //got string

    colorsArr = [];
    for(var i = 0; i < text.length; i++ ) {  //fill colorsArr 
        if (textToColor[text[i]]) {
            colorsArr.push(textToColor[text[i]]);
        } else if (text[i] === '\n') {
            colorsArrs.push(colorsArr.slice()); // add array to array of arrays ||| slice to pass by value and break reference
            colorsArr.length = 0; // clear array
        }
    }
    colorsArrs.push(colorsArr.slice());

    gradContainer.innerHTML = ''; //deleting gradients
    for (arr = 0; arr < colorsArrs.length; arr++) {
        gradContainer.innerHTML += `<div class="result-gradient" style="background: linear-gradient(90deg, ${arrToCss(colorsArrs[arr])})"></div>`;
    }
}

textarea.addEventListener("keyup", e => {
    transformText();
})

document.getElementById("button").addEventListener("click", e => {
    e.preventDefault();
    transformText();
});
