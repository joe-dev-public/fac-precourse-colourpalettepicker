'use strict';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function randomColour(l) {

    // Hue: 0 - 360
    // Saturation: 0 - 100%
    // Lightness: 0 - 100%

    const h = getRandomIntInclusive(0, 360);
    const s = getRandomIntInclusive(0, 100);
    if (!l) { l = getRandomIntInclusive(0, 100); }

    const comp = h + 180;

    return [`hsl(${h}, ${s}%, ${l}%)`, `hsl(${comp}, ${s}%, ${l}%)`];

}

function generateColours() {

    const lightness = document.getElementById('lightness').value;

    const colour_1 = document.getElementById('colour-1');
    const colour_2 = document.getElementById('colour-2');

    const rndC = randomColour(lightness);

    colour_1.style.backgroundColor = rndC[0];

    colour_2.style.backgroundColor = rndC[1];

}

function windowLoaded() {

    document.getElementById('generate').addEventListener('click', generateColours);

    generateColours();

} // end of function windowLoaded