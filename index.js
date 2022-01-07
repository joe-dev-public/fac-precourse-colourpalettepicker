'use strict';

/*

    Todo:

        - Button to save generated palette (on page).
        - Way to export generated palettes (e.g. copy to clipboard, etc.).
        - Set page background colour. Gotta have context for your palette!
        - Copy hsl/hex/rgb/etc. buttons for each. (Text, please!)
        - Make colour boxes respond when sliders are slid.

    Maybe:

        - Implement a range slider so you can set upper and lower bounds on randomness for HSL?
            - (You could also just use two standard range sliders etc., but that would be confusing.)

*/


let hueLockElement;
let saturationLockElement;
let lightnessLockElement;

let hueSliderElement;
let saturationSliderElement;
let lightnessSliderElement;

let colour1Element;
let colour2Element;


/*  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    "The Math.random() function returns a floating-point, pseudo-random number in the range 0 to less than 1
    (inclusive of 0, but not 1) with approximately uniform distribution over that range —
    which you can then scale to your desired range."

    This is MDN's function:
*/
function getRandomIntInclusive(min, max) {
    // Not needed if I always call with ints:
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


function randomColour(h, s, l) {

    // Hue: 0 - 360
    // Saturation: 0 - 100%
    // Lightness: 0 - 100%

    if (!h) { h = getRandomIntInclusive(0, 360); }
    if (!s) { s = getRandomIntInclusive(0, 100); }
    if (!l) { l = getRandomIntInclusive(0, 100); }

    const c = h + 180; // complement(ary)

    return { 'h': h, 's': s, 'l': l, 'c': c };

}


function formatHSL(h, s, l) {

    return `hsl(${h}, ${s}%, ${l}%)`;

}


function toggleSliderEnabled(event) {

    const element = document.getElementById(event.target.value + '-slider');

    element.toggleAttribute('disabled');

}


function updateColors(component, value) {

    // todo: not necessarily the best way of doing it :). improve?

    // get all the current values, form a new string with the updated value, then set them all again

    const current1 = colour1Element.style.backgroundColor; // this'll be rgb, is it on us to convert to hsl? :P

    console.log(current1);

}


function updateVal(event) {

    const component = event.target.id.split('-')[0];

    updateColors(component, event.target.value);

}


function handleUIStuff() {

    hueLockElement.addEventListener('input', toggleSliderEnabled);
    saturationLockElement.addEventListener('input', toggleSliderEnabled);
    lightnessLockElement.addEventListener('input', toggleSliderEnabled);

    hueSliderElement.addEventListener('input', updateVal);
    saturationSliderElement.addEventListener('input', updateVal);
    lightnessSliderElement.addEventListener('input', updateVal);

}


function generateColours() {

    let h, s, l = null;

    colour1Element = document.getElementById('colour-1');
    colour2Element = document.getElementById('colour-2');

    if (hueLockElement.checked) {
        h = hueSliderElement.value;
    }
    if (saturationLockElement.checked) {
        s = saturationSliderElement.value;
    }
    if (lightnessLockElement.checked) {
        l = lightnessSliderElement.value;
    }

    const rndColVals = randomColour(h, s, l);

    //todo: updateColors somehow?
    colour1Element.style.backgroundColor = formatHSL(rndColVals.h, rndColVals.s, rndColVals.l);
    colour2Element.style.backgroundColor = formatHSL(rndColVals.c, rndColVals.s, rndColVals.l); // complement

    colour1Element.innerHTML = `H: ${rndColVals.h}<br>S: ${rndColVals.s}<br>L: ${rndColVals.l}`;
    colour2Element.innerHTML = `H: ${rndColVals.c}<br>S: ${rndColVals.s}<br>L: ${rndColVals.l}`;

    hueSliderElement.value = rndColVals.h; // hue only, not complement.. todo: add sliders per-colour box!
    saturationSliderElement.value = rndColVals.s;
    lightnessSliderElement.value = rndColVals.l;

}


function windowLoaded() {

    hueLockElement = document.getElementById('hue-lock');
    saturationLockElement = document.getElementById('saturation-lock');
    lightnessLockElement = document.getElementById('lightness-lock');

    hueSliderElement = document.getElementById('hue-slider');
    saturationSliderElement = document.getElementById('saturation-slider');
    lightnessSliderElement = document.getElementById('lightness-slider');

    document.getElementById('generate').addEventListener('click', generateColours);

    generateColours();

    handleUIStuff();

} // end of function windowLoaded