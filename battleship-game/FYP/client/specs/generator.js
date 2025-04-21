import * as generator from './generator';  // <= import the module into itself

export function generate(ship, takenSquares) {
    var startSquare, isAtRightEdge, isAtLeftEdge
    let orientationDecider = Math.round(Math.random());
    let squaresToOccupy = ship.orientation[orientationDecider]

    if (orientationDecider === 0) {
        startSquare = Math.abs(Math.floor(Math.random() * 100 - ship.length))
        isAtRightEdge = squaresToOccupy.slice(0, ship.length-1).some(index => (startSquare + index) % 10 === 10 - 1)
        isAtLeftEdge = squaresToOccupy.slice(1).some(index => (startSquare + index) % 10 === 0)
    }
    if (orientationDecider === 1) {
        startSquare = Math.abs(Math.floor(Math.random() * 100 - (ship.length-1)*10))
    }
    const isTaken = squaresToOccupy.some(index => takenSquares.includes(startSquare + index))
    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) {
        squaresToOccupy.forEach(index => { 
            takenSquares.push(startSquare+index)
        })
    } else generator.generate(ship, takenSquares)
}