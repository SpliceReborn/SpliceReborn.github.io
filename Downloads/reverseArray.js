const {performance} = require('perf_hooks'); //used to measure time taken

/* The reverseArray and reverseArrayInPlace functions are
 * model solutions taken from https://eloquentjavascript.net/code/#4.2
 */

/* Produces a new array that has the same elements in inverse order
 * Uses push because push has been tested to be faster than unshift
 * Possibly because unshift has to increment index of all elements
 */
function reverseArray(array) {
    let output = [];
    for (let i = array.length - 1; i >= 0; i--) {
      output.push(array[i]);
    }
    return output;
}

/* Modifies the array by reversing its elements
 * 1) Stores i element in a variable
 * 2) Replace i element with (length-1-i)th element
 * 3) Replace (length-1-i)th element with variable
 * Only (length/2) iterations because essentially swapping elements
 */
function reverseArrayInPlace(array) {
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
        let old = array[i];
        array[i] = array[array.length - 1 - i];
        array[array.length - 1 - i] = old;
    }
    return array;
}

// Returns an array containing numbers from start to end(inclusive)
function range(start, end) {
    let result = [];
    while (start <= end) {
        result.push(start);
        start++;
    }
    return result;
}

/* Page 54 & 55: Functions and Side Effects
 * Some operations are also easier to express in an efficient way
 * when we use side effects, so computing speed can be a reason
 * to avoid functions with no side effects and don't rely on side effects from other code (pure functions)
 */
let end = 100000;
let array = range(1, end);
let count = 1000;

// Outputs performance
var t0 = performance.now();
for (let i=0; i<count; i++) {
    reverseArray(array);
}
var t1 = performance.now();
console.log(String(count) + " calls to reverseArray for an array of " + String(end) + " elements averages to " + (t1-t0)/count + " milliseconds.");

var t0 = performance.now();
for (let i=0; i<count; i++) {
    reverseArrayInPlace(array);
}
var t1 = performance.now();
console.log(String(count) + " calls to reverseArrayInPlace for an array of " + String(end) + " elements averages to " + (t1-t0)/count + " milliseconds.");
