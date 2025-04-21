import * as generator from './generator.js'

expect.extend({
    toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
    return {
        message: () =>
        `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
    };
    } else {
    return {
        message: () =>
        `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
    };
    }
},
});


const shipArray = [
    { 
        name: 'destroyer', 
        length: 2,
        orientation: [
            [0, 1],
            [0, 10]
        ]   
    },
    { 
        name: 'submarine', 
        length: 3,
        orientation: [
            [0, 1, 2],
            [0, 10, 10*2]
        ]   
    },
    { 
        name: 'cruiser', 
        length: 3,
        orientation: [
            [0, 1, 2],
            [0, 10, 10*2]
        ]   
    },
    { 
        name: 'battleship', 
        length: 4,
        orientation: [
            [0, 1, 2, 3],
            [0, 10, 10*2, 10*3]
        ]   
    },
    { 
        name: 'carrier', 
        length: 5,
        orientation: [
            [0, 1, 2, 3, 4],
            [0, 10, 10*2, 10*3, 10*4]
        ]   
    },
];


/* for (let i = 0; i< 100000; i++) {
    describe('computer ships generated correctly', () => {
        const occupiedSquares = []
        generator.generate(shipArray[0], occupiedSquares);
        generator.generate(shipArray[1], occupiedSquares);
        generator.generate(shipArray[2], occupiedSquares);
        generator.generate(shipArray[3], occupiedSquares);
        generator.generate(shipArray[4], occupiedSquares);
        test('all ships are generated (=> 17 squares will be occupied)', () => {
            expect(occupiedSquares).toHaveLength(17);
        });
        test('all ships are placed within bounds of board', () => {
            for (let i=0; i < occupiedSquares.length-1; i++) {
                expect(occupiedSquares[i]).toBeWithinRange(0,99)
            }
        });
        test('no ships occupy same squares', () => {
            expect((new Set(occupiedSquares)).size).toEqual(occupiedSquares.length)
        });
        test('horizontal ships only occupy one row and vertical ships only occupy one column', () => {
            if (occupiedSquares[1] - occupiedSquares[0] == 1) 
                if (occupiedSquares[1] < 10) expect(String(occupiedSquares[0]).slice(0, 1)).toEqual(String(parseInt(String(occupiedSquares[1]).slice(0, 1))-1))
                else expect(String(occupiedSquares[0]).slice(0, 1)).toEqual(String(occupiedSquares[1]).slice(0, 1))
            else 
                expect(String(occupiedSquares[0]).slice(-1)).toEqual(String(occupiedSquares[1]).slice(-1))
            if (occupiedSquares[3] - occupiedSquares[2] == 1) {
                if (occupiedSquares[3] < 10) {
                    for (let i=2; i<4; i++) {
                        expect(String(occupiedSquares[i]).slice(0, 1)).toEqual(String(parseInt(String(occupiedSquares[i+1]).slice(0, 1))-1))
                    }
                } else {
                    for (let i=2; i<4; i++) {
                        expect(String(occupiedSquares[i]).slice(0, 1)).toEqual(String(occupiedSquares[i+1]).slice(0, 1))
                    }
                }
            } else {
                for (let i=2; i<4; i++) {
                    expect(String(occupiedSquares[i]).slice(-1)).toEqual(String(occupiedSquares[i+1]).slice(-1))
                }
            }
            if (occupiedSquares[6] - occupiedSquares[5] == 1) {
                if (occupiedSquares[6] < 10) {
                    for (let i=5; i<7; i++) {
                        expect(String(occupiedSquares[i]).slice(0, 1)).toEqual(String(parseInt(String(occupiedSquares[i+1]).slice(0, 1))-1))
                    }
                } else {
                    for (let i=5; i<7; i++) {
                        expect(String(occupiedSquares[i]).slice(0, 1)).toEqual(String(occupiedSquares[i+1]).slice(0, 1))
                    }
                }
            } else {
                for (let i=5; i<7; i++) {
                    expect(String(occupiedSquares[i]).slice(-1)).toEqual(String(occupiedSquares[i+1]).slice(-1))
                }
            }
            if (occupiedSquares[9] - occupiedSquares[8] == 1) {
                if (occupiedSquares[9] < 10) {
                    for (let i=8; i<11; i++) {
                        expect(String(occupiedSquares[i]).slice(0, 1)).toEqual(String(parseInt(String(occupiedSquares[i+1]).slice(0, 1))-1))
                    }
                } else {
                    for (let i=8; i<11; i++) {
                        expect(String(occupiedSquares[i]).slice(0, 1)).toEqual(String(occupiedSquares[i+1]).slice(0, 1))
                    }
                }
                
            } else {
                for (let i=8; i<11; i++) {
                    expect(String(occupiedSquares[i]).slice(-1)).toEqual(String(occupiedSquares[i+1]).slice(-1))
                }
            }
            if (occupiedSquares[13] - occupiedSquares[12] == 1) {
                if (occupiedSquares[13] < 10) {
                    for (let i=12; i<16; i++) {
                        expect(String(occupiedSquares[i]).slice(0, 1)).toEqual(String(parseInt(String(occupiedSquares[i+1]).slice(0, 1))-1))
                    }
                } else {
                    for (let i=12; i<16; i++) {
                        expect(String(occupiedSquares[i]).slice(0, 1)).toEqual(String(occupiedSquares[i+1]).slice(0, 1))
                    }
                }
                
            } else {
                for (let i=12; i<16; i++) {
                    expect(String(occupiedSquares[i]).slice(-1)).toEqual(String(occupiedSquares[i+1]).slice(-1))
                }
            }
        });
    });
} */

