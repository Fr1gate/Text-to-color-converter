/*
    
*/

var textarea = document.querySelector('#string-in'); //input field
var inputString = textarea.innerHTML; //string to convert
var grad = document.querySelector('.result-gradient'); //gradient DIV
var textToColor = { //letter - color associative array
    
};
var colorsArr = []; // Text transformed to colors

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
    console.log(textToColor); ////////////////////////CONSOLE LOG!!!!!!!!!!!!!!
}

function drawGrad(colorsCss) { //set background for gradient DIV
    grad.setAttribute('style', `background: linear-gradient(90deg, ${colorsCss})`)
}

function arrToCss(arr) {
    // #ffffff, #ffaaaa, #aa4246
    var cssArr = '';
    arr.forEach(v => {
        cssArr += v + ', '
    })
    return cssArr.slice(0, cssArr.length - 2);
}

textarea.addEventListener("keyup", e => { 
    getColors();                             //got array
    let text = textarea.value.toUpperCase(); //got string
    colorsArr = [];
    for(var i = 0; i < text.length; i++ ) {  //fill colorsArr 
        if (textToColor[text[i]]) {
            colorsArr.push(textToColor[text[i]]);
        }
    }
    console.log(colorsArr);          ////////////////////////CONSOLE LOG!!!!!!!!!!!!!!
    console.log(arrToCss(colorsArr));////////////////////////CONSOLE LOG!!!!!!!!!!!!!!
    drawGrad(arrToCss(colorsArr));
})

document.getElementById("button").addEventListener("click", e => {
    e.preventDefault();
    getColors();                             //got array
    let text = textarea.value.toUpperCase(); //got string
    colorsArr = [];
    for(var i = 0; i < text.length; i++ ) {  //fill colorsArr 
        if (textToColor[text[i]]) {
            colorsArr.push(textToColor[text[i]]);
        }
    }
    console.log(colorsArr);          ////////////////////////CONSOLE LOG!!!!!!!!!!!!!!
    console.log(arrToCss(colorsArr));////////////////////////CONSOLE LOG!!!!!!!!!!!!!!
    drawGrad(arrToCss(colorsArr));
});
