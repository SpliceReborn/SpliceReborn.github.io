<template>  
    <div>
        <div class="container">
            <!-- User board -->
            <div class="grid grid-user">
                <!-- generate width*width squares with id user1, user2, ..., userwidth*width -->
                <div v-for="n in this.width*this.width" :id="'user'+(n-1)" v-bind:key="n" ref="userGrid"></div>
            </div>
            <!-- Computer/User2 board -->
            <div v-show="isGameStarted" class="grid grid-computer">
            <!-- <div class="grid grid-computer"> -->
                <!-- generate width*width squares with id computer1, computer2, ..., computerwidth*width -->
                <div v-for="n in this.width*this.width" :id="'computer'+(n-1)" v-bind:key="n" ref="computerGrid"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: "Board",
    methods: {
        ...mapActions(['endGame', 'saveGame']),
        // Generate ships in the computer's board
        generate(ship) {
            var startSquare, isAtRightEdge, isAtLeftEdge
            let orientationDecider = Math.round(Math.random());
            let squaresToOccupy = ship.orientation[orientationDecider]

            /* Horizontal orientation => Starting square accounts for ship's length horizontally
             * Check that no part of the ship other than start and end occupies the board's edge
             * to avoid ship from 'overflowing' from one row to another
             */
            if (orientationDecider === 0) {
                startSquare = Math.abs(Math.floor(Math.random() * this.$refs.computerGrid.length - ship.length))
                isAtRightEdge = squaresToOccupy.slice(0, ship.length-1).some(index => (startSquare + index) % this.width === this.width - 1)
                isAtLeftEdge = squaresToOccupy.slice(1).some(index => (startSquare + index) % this.width === 0)

            }
            /* Vertical orientation => Starting square accounts for ship's length vertically
             * i.e. (startSquare, startSquare + widthOfBoard, startSquare + 2*widthOfBoard)
             * Does not need to check if squares are on left or right edge because ships are vertical
             * Does not need to check if it goes beyond the board because that is taken account of in the calculation of startSquare)
             */
            if (orientationDecider === 1) {
                startSquare = Math.abs(Math.floor(Math.random() * this.$refs.computerGrid.length - (ship.length-1)*this.width))
            }

            /* Check if squares to be occupied are taken by some other ships, or if isAtRightEdge/isAtLeftEdge is true
             * If all of it is false, mark the squares as taken by this new ship
             * Else, call the function again and try to regenerate ship that does not violate any restrictions
             */
            const isTaken = squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index].classList.contains('taken'))
            if (!isTaken && !isAtRightEdge && !isAtLeftEdge) {
                if (!(this.checkIfAdjacentTaken(orientationDecider, ship, squaresToOccupy, startSquare))) {
                    squaresToOccupy.forEach(index => { 
                        this.$refs.computerGrid[startSquare + index].classList.add('taken', ship.name)
                        this.gameData.squaresContainingEnemyShips[ship.name].push(startSquare+index)
                    })
                } else this.generate(ship)
            }
            else this.generate(ship)
        },
        checkIfAdjacentTaken(orientation, ship, squaresToOccupy, startSquare) {
            if (orientation === 0) {
                /* Horizontal orientation
                    * if leftmost square of ship is at leftmost of board
                        * if ship is in first row, check right of rightmost & bottom square of all squaresToOccupy
                        * if ship is in last row, check right of rightmost & top square of all squaresToOccupy
                        * else, check right of rightmost, top and bottom
                    * else if rightmost square of ship is at rightmost of board
                        * if ship is in first row, check left of leftmost & bottom square of all squaresToOccupy
                        * if ship is in last row, check left of leftmost & top square of all squaresToOccupy
                        * else check left of leftmost, top and bottom
                    * else
                        * if first row, check leftofleftmost, rightofrightmost, bottom of all
                        * if last row, check leftofleftmost, rightofrightmost, top of all
                        * else check leftofleftmost, rightofrightmost, top and bottom of all 
                */
                if (String(squaresToOccupy[0] + startSquare).slice(-1) == '0') {
                    if (squaresToOccupy[0] + startSquare < 10) {
                        return squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index + 10].classList.contains('taken')) ||
                                            this.$refs.computerGrid[squaresToOccupy[ship.length-1]+ startSquare + 1].classList.contains('taken')
                    } else if (squaresToOccupy[0] + startSquare > 89) {
                        return squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index - 10].classList.contains('taken')) ||
                                            this.$refs.computerGrid[squaresToOccupy[ship.length-1]+ startSquare + 1].classList.contains('taken')
                    } else {
                        return squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index + 10].classList.contains('taken')) || 
                                            squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index - 10].classList.contains('taken')) ||
                                            this.$refs.computerGrid[squaresToOccupy[ship.length-1] + startSquare +1].classList.contains('taken')
                    }
                } else if (String(squaresToOccupy[ship.length - 1] + startSquare).slice(-1) == '9') {
                    if (squaresToOccupy[0] + startSquare < 10) {
                        return squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index + 10].classList.contains('taken')) ||
                                            this.$refs.computerGrid[squaresToOccupy[0] + startSquare-1].classList.contains('taken')
                    } else if (squaresToOccupy[0] + startSquare > 89) {
                        return squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index - 10].classList.contains('taken')) ||
                                            this.$refs.computerGrid[squaresToOccupy[0] + startSquare-1].classList.contains('taken')
                    } else {
                        return squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index + 10].classList.contains('taken')) || 
                                            squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index - 10].classList.contains('taken')) ||
                                            this.$refs.computerGrid[squaresToOccupy[0] + startSquare-1].classList.contains('taken')
                    }
                } else {
                    if (squaresToOccupy[0] + startSquare < 10) {
                        return squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index + 10].classList.contains('taken')) ||
                                            this.$refs.computerGrid[squaresToOccupy[ship.length-1] + startSquare +1].classList.contains('taken')  ||
                                            this.$refs.computerGrid[squaresToOccupy[0] + startSquare-1].classList.contains('taken')
                    } else if (squaresToOccupy[0] + startSquare > 89) {
                        return squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index - 10].classList.contains('taken')) ||
                                            this.$refs.computerGrid[squaresToOccupy[ship.length-1] + startSquare + 1].classList.contains('taken')  ||
                                            this.$refs.computerGrid[squaresToOccupy[0] + startSquare-1].classList.contains('taken')
                    } else {
                        return squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index + 10].classList.contains('taken')) || 
                                            squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index - 10].classList.contains('taken')) ||
                                            this.$refs.computerGrid[squaresToOccupy[ship.length-1] + startSquare +1].classList.contains('taken')  ||
                                            this.$refs.computerGrid[squaresToOccupy[0] + startSquare-1].classList.contains('taken')
                    }
                }
            } else {
                /* Vertical orientation
                    * if topmost square of ship is at topmost of board
                        * if ship is in first column, check bottom of bottomost & right squares of all squaresToOccupy
                        * if ship is in last column, check bottom of bottommost & left squares of all squaresToOccupy
                        * else, check bottom of bottomost, left and right of all
                    * else if bottomost square of ship is at bottomost of board
                        * if ship is in first column, check top of topmost & right squares of all squaresToOccupy
                        * if ship is in last column, check top of topmost & left squares of all squaresToOccupy
                        * else check top of topmost, left and right of all
                    * else
                        * if first column, check topoftopmost, bottom of bottomost, right of all
                        * if last column, check topoftopmost, bottom of bottomost, left of all
                        * else check topoftopmost, bottomofbottomost, left and right of all
                */
                if (squaresToOccupy[0] + startSquare < 10) {
                    if (String(squaresToOccupy[0] + startSquare).slice(-1) == '0') {
                        return squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index + 1].classList.contains('taken')) ||
                                            this.$refs.computerGrid[squaresToOccupy[ship.length-1]+startSquare +10].classList.contains('taken')
                    } else if (String(squaresToOccupy[0] + startSquare).slice(-1) == '9') {
                        return squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index - 1].classList.contains('taken')) ||
                                            this.$refs.computerGrid[squaresToOccupy[ship.length-1]+ startSquare +10].classList.contains('taken')
                    } else {
                        return squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index + 1].classList.contains('taken')) || 
                                            squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index - 1].classList.contains('taken')) ||
                                            this.$refs.computerGrid[squaresToOccupy[ship.length-1]+startSquare +10].classList.contains('taken')
                    }
                } else if (squaresToOccupy[ship.length-1] + startSquare > 89) {
                    if (String(squaresToOccupy[0] + startSquare).slice(-1) == '0') {
                        return squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index + 1].classList.contains('taken')) ||
                                            this.$refs.computerGrid[squaresToOccupy[0] + startSquare-10].classList.contains('taken')
                    } else if (String(squaresToOccupy[0] + startSquare).slice(-1) == '9') {
                        return squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index - 1].classList.contains('taken')) ||
                                            this.$refs.computerGrid[squaresToOccupy[0] + startSquare-10].classList.contains('taken')
                    } else {
                        return squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index + 1].classList.contains('taken')) || 
                                            squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index - 11].classList.contains('taken')) ||
                                            this.$refs.computerGrid[squaresToOccupy[0] + startSquare-10].classList.contains('taken')
                    }
                } else {
                    if (String(squaresToOccupy[0] + startSquare).slice(-1) == '0') {
                        return squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index + 1].classList.contains('taken')) ||
                                            this.$refs.computerGrid[squaresToOccupy[ship.length-1]+startSquare +10].classList.contains('taken')  ||
                                            this.$refs.computerGrid[squaresToOccupy[0] + startSquare-10].classList.contains('taken')
                    } else if (String(squaresToOccupy[0] + startSquare).slice(-1) == '9') {
                        return squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index - 1].classList.contains('taken')) ||
                                            this.$refs.computerGrid[squaresToOccupy[ship.length-1]+startSquare +10].classList.contains('taken')  ||
                                            this.$refs.computerGrid[squaresToOccupy[0] + startSquare-10].classList.contains('taken')
                    } else {
                        return squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index + 1].classList.contains('taken')) || 
                                            squaresToOccupy.some(index => this.$refs.computerGrid[startSquare + index - 1].classList.contains('taken')) ||
                                            this.$refs.computerGrid[squaresToOccupy[ship.length-1]+startSquare +10].classList.contains('taken')  ||
                                            this.$refs.computerGrid[squaresToOccupy[0] + startSquare-10].classList.contains('taken')
                    }
                }
            }
        },
        dragStart(event) { 
            if (event.target.classList.contains('destroyer')) {
                this.selectedShipIndex = this.gameData.squaresContainingShips['destroyer'].indexOf(parseInt(event.target.id.slice(4)))
                this.selectedShipClass = "destroyer"
                this.gameData.squaresContainingShips['destroyer'].forEach(square => {
                    this.$refs.userGrid[square].classList.remove('taken', 'destroyer')
                })
            }
            if (event.target.classList.contains('submarine')) {
                this.selectedShipIndex = this.gameData.squaresContainingShips['submarine'].indexOf(parseInt(event.target.id.slice(4)))
                this.selectedShipClass = "submarine"
                this.gameData.squaresContainingShips['submarine'].forEach(square => {
                    this.$refs.userGrid[square].classList.remove('taken', 'submarine')
                })
            }
            if (event.target.classList.contains('cruiser')) {
                this.selectedShipIndex = this.gameData.squaresContainingShips['cruiser'].indexOf(parseInt(event.target.id.slice(4)))
                this.selectedShipClass = "cruiser"
                this.gameData.squaresContainingShips['cruiser'].forEach(square => {
                    this.$refs.userGrid[square].classList.remove('taken', 'cruiser')
                })
            }
            if (event.target.classList.contains('battleship')) {
                this.selectedShipIndex = this.gameData.squaresContainingShips['battleship'].indexOf(parseInt(event.target.id.slice(4)))
                this.selectedShipClass = "battleship"
                this.gameData.squaresContainingShips['battleship'].forEach(square => {
                    this.$refs.userGrid[square].classList.remove('taken', 'battleship')
                })
            }
            if (event.target.classList.contains('carrier')) {
                this.selectedShipIndex = this.gameData.squaresContainingShips['carrier'].indexOf(parseInt(event.target.id.slice(4)))
                this.selectedShipClass = "carrier"
                this.gameData.squaresContainingShips['carrier'].forEach(square => {
                    this.$refs.userGrid[square].classList.remove('taken', 'carrier')
                })
            }
        },
        dragOver(event) {
            event.preventDefault()
        },
        drop(event) {
            event.preventDefault()
            let dropOn = event.target.id.slice(4) // Square that the mouse drops on
            let index = parseInt(this.selectedShipIndex) // Index of ship's body selected
            let shipClass = this.selectedShipClass // Class of ship
            var orientation
            if (shipClass == 'destroyer') {
                orientation = this.destroyerOrientation
                this.length = 2
            }
            if (shipClass == 'submarine') {
                orientation = this.submarineOrientation
                this.length = 3
            }
            if (shipClass == 'cruiser') {
                orientation = this.cruiserOrientation
                this.length = 3
            }
            if (shipClass == 'battleship') {
                orientation = this.battleshipOrientation
                this.length = 4
            }
            if (shipClass == 'carrier') {
                orientation = this.carrierOrientation 
                this.length = 5
            }
            if (orientation == 'horizontal') {
                // Calculate length of ship on left and right of selected ship square
                let squaresOnRight = this.length - (index+1)
                let squaresOnLeft = this.length - (squaresOnRight+1)
                // Compute the squares that the ship will occupy
                let squaresToOccupy = []
                for (let i=0; i<this.length; i++) {
                    squaresToOccupy.push(dropOn-squaresOnLeft + i)
                }
                
                const withinBounds = squaresToOccupy.every(index => index < this.width*this.width && index >= 0)
                if (withinBounds) {
                    // Check if squares are taken, whether ship will overflow to previous or next row
                    const isTaken = squaresToOccupy.some(index => this.$refs.userGrid[index].classList.contains('taken'))
                    const overflowLeft = squaresToOccupy.slice(1).some(index => String(index).slice(-1) == "0")
                    const overflowRight = parseInt(dropOn.slice(-1)) + squaresOnRight > 9
                    // If no abnormal behaviour, place ship
                    if (!overflowLeft && !overflowRight && !isTaken) {
                        // Remove ship from side board if it is dragged from side board
                        let sideBoard = document.querySelector('.grid-display')
                        let shipClassQuery = "." + shipClass
                        if(sideBoard.querySelector(shipClassQuery)) sideBoard.removeChild(this.draggedShip)
                        // Else, move ship from old position to new position
                        else {
                            this.gameData.squaresContainingShips[shipClass].splice(0, this.length)
                        }
                        let i=0;
                        squaresToOccupy.forEach(square => {
                            this.$refs.userGrid[square].classList.add('taken', shipClass)
                            this.gameData.squaresContainingShips[shipClass].push(square)
                            if (i == 0) this.$refs.userGrid[square].classList.add('horizontal-start') 
                            if (i == this.length-1) this.$refs.userGrid[square].classList.add('horizontal-end')
                            i++ 
                        })
                        // Update number of ships placed to check if all ships are placed before game is started
                        this.shipPlaced += 1;
                        if (this.shipPlaced === 5) this.$eventHub.$emit('all-ships-placed')
                    }
                }
                
            } else {
                // Calculate length of ship on top and bottom of selected ship square
                let squaresOnBottom = this.length - (index+1)
                let squaresOnTop = this.length - (squaresOnBottom+1)
                
                // Compute the squares that the ship will occupy
                let squaresToOccupy = []
                for (let i=0; i<this.length; i++) {
                    squaresToOccupy.push(dropOn-squaresOnTop*this.width +i*this.width)
                }
                /* If squares to occupy are within bounds of board
                 * Check if any of them are taken by other ships
                 * If none is taken, place ship on board, and delete ship from sideboard
                 */
                const withinBounds = squaresToOccupy.every(index => index < this.width*this.width && index >= 0)
                if (withinBounds) {
                    // Does not need to check overflow top or bottom, because inbounds => does not overflow
                    const isTaken = squaresToOccupy.some(index => this.$refs.userGrid[index].classList.contains('taken'))
                    if (!isTaken) {
                        // Remove ship from side board if it is dragged from side board
                        let sideBoard = document.querySelector('.grid-display')
                        let shipClassQuery = "." + shipClass
                        if(sideBoard.querySelector(shipClassQuery)) sideBoard.removeChild(this.draggedShip)
                        // Else, move ship from old position to new position
                        else {
                            this.gameData.squaresContainingShips[shipClass].splice(0, this.length)
                        }
                        let i=0;
                        squaresToOccupy.forEach(square => {
                            this.$refs.userGrid[square].classList.add('taken', shipClass)
                            this.gameData.squaresContainingShips[shipClass].push(square)
                            if (i == 0) this.$refs.userGrid[square].classList.add('vertical-start') 
                            if (i == this.length-1) this.$refs.userGrid[square].classList.add('vertical-end') 
                            i++
                        })
                        // Update number of ships placed to check if all ships are placed before game is started
                        this.shipPlaced += 1;
                        if (this.shipPlaced === 5) this.$eventHub.$emit('all-ships-placed')
                    }   
                }
            
            }
        },
        updateAndSave() {
            this.gameData.computerBoard = []
            this.gameData.userBoard = []
            this.$refs.userGrid.forEach(square => this.gameData.userBoard.push(square.classList))
            this.$refs.computerGrid.forEach(square => this.gameData.computerBoard.push(square.classList))
            localStorage.setItem('gameState', JSON.stringify(this.gameData))
        },
        loadGame() {
            let savedGame = JSON.parse(localStorage.getItem('gameState'))
            var userIterator = 0
            var computerIterator = 0
            this.gameData = savedGame
/*             this.gameData.moveCount = savedGame.moveCount
            this.gameData.playerScore = savedGame.playerScore
            this.gameData.cpuScore = savedGame.cpuScore
            this.gameData.destroyerCount = savedGame.destroyerCount
            this.gameData.submarineCount = savedGame.submarineCount
            this.gameData.cruiserCount = savedGame.cruiserCount
            this.gameData.battleshipCount = savedGame.battleshipCount
            this.gameData.carrierCount = savedGame.carrierCount
            this.gameData.cpuDestroyerCount = savedGame.cpuDestroyerCount
            this.gameData.cpuSubmarineCount = savedGame.cpuSubmarineCount
            this.gameData.cpuCruiserCount = savedGame.cpuCruiserCount
            this.gameData.cpuBattleshipCount = savedGame.cpuBattleshipCount
            this.gameData.cpuCarrierCount = savedGame.cpuCarrierCount
            this.gameData.squaresContainingShips = savedGame.squaresContainingShips
            this.gameData.squaresContainingEnemyShips = savedGame.squaresContainingEnemyShips */
            
            // CLear the board if user places ship but do not start new game
            for (let i=0; i<100; i++) {
                while (this.$refs.userGrid[i].classList.length !=0) this.$refs.userGrid[i].classList.remove(this.$refs.userGrid[i].classList.item(0))
                while (this.$refs.computerGrid[i].classList.length !=0) this.$refs.computerGrid[i].classList.remove(this.$refs.computerGrid[i].classList.item(0))
            }            

            savedGame.userBoard.forEach(square => {
                if (square[0] !== undefined) {
                    let j = 0;
                    while (square[j] !== undefined) {
                        /* console.log("This is square of index", userIterator, "will add class", square[j], "to it.") */
                        this.$refs.userGrid[userIterator].classList.add(square[j])
                        /* console.log("It now becomes", this.$refs.userGrid[userIterator].classList) */
                        j++;
                    }
                }
                userIterator++;
            })
            savedGame.computerBoard.forEach(square => {
                if (square[0] !== undefined) {
                    let j = 0;
                    while (square[j] !== undefined) {
                        this.$refs.computerGrid[computerIterator].classList.add(square[j])
                        j++;
                    }
                }
                computerIterator++;
            })
            while (document.querySelector('.grid-display').hasChildNodes()) {
                document.querySelector('.grid-display').removeChild(document.querySelector('.grid-display').firstChild);
            }
            this.isGameStarted = true
            this.playGame()
        },
        playGame() {
            this.gameData.username = this.user
            if (this.isGameOver) {
                this.$refs.computerGrid.forEach(square => square.removeEventListener('click', this.revealSquare))
                return
            }
            if (this.currentPlayer === 'user') {
                this.$refs.computerGrid.forEach(square => square.addEventListener('click', this.revealSquare))
            }
            if (this.currentPlayer === 'computer') {
                this.$refs.computerGrid.forEach(square => square.removeEventListener('click', this.revealSquare))
                setTimeout(this.computerTurn, 1000);
            }
            this.$root.$emit('turnChange', this.currentPlayer)
        },

        revealSquare(square) {
            /* uses a shorter named variable for convenience and readability
             * basically reads the class list of the targeted HTML element
             */
            let targetClass = square.target.classList

            /* check that targetted square does not already have classes 
             * boom/miss to avoid targetting repeated squares
             */
            if (!targetClass.contains('boom') && !targetClass.contains('miss')) {
                this.gameData.moveCount += 1
                /* if targetted squares contain ship, add class 'boom' to square 
                    * to denote a hit, else add class 'miss' to denote a miss
                    */
                if (targetClass.contains('taken'))  {
                    this.updateScore("user", targetClass)
                    targetClass.add('boom')
                    /* if score incremented by 1 == 17 (implying all ships are sunk)
                     * end the game, else continue with player's turn
                     */
                    this.gameData.playerScore += 1
                    if (this.gameData.playerScore === 17) {
                        this.$root.$emit('gameWon', 'user')
                        this.gameData.outcome = "win"
                        this.endGame(this.gameData)
                        localStorage.removeItem('gameState')
                    }
                } else {
                    targetClass.add('miss')
                }
                this.currentPlayer = "computer"
                this.playGame()
            }
        },

        updateScore(who, targetClass) {
            if (who == "user") {
                if (targetClass.contains('destroyer')) {
                    this.gameData.destroyerCount++
                    let dataCopy = this.gameData.squaresContainingEnemyShips['destroyer']
                    let orientation
                    if (dataCopy[1] - dataCopy[0] == 1) orientation = "horizontal"
                    else orientation = "vertical"
                    if (this.gameData.destroyerCount == 2) {
                        for (let i=0; i<2; i++) {
                            this.$refs.computerGrid[this.gameData.squaresContainingEnemyShips['destroyer'][i]].classList.add('sunk')
                            if (i==0 && orientation == "horizontal" ) this.$refs.computerGrid[dataCopy[i]].classList.add('horizontal-start')
                            else if (i==1 && orientation == "horizontal") this.$refs.computerGrid[dataCopy[i]].classList.add('horizontal-end')
                            else if (i==0 && orientation == "vertical") this.$refs.computerGrid[dataCopy[i]].classList.add('vertical-start')
                            else if (i==1 && orientation == "vertical") this.$refs.computerGrid[dataCopy[i]].classList.add('vertical-end')
                        }
                    }
                }
                if (targetClass.contains('submarine')) {
                    this.gameData.submarineCount++
                    let dataCopy = this.gameData.squaresContainingEnemyShips['submarine']
                    let orientation
                    if (dataCopy[1] - dataCopy[0] == 1) orientation = "horizontal"
                    else orientation = "vertical"
                    if (this.gameData.submarineCount == 3) {
                        for (let i=0; i<3; i++) {
                            this.$refs.computerGrid[this.gameData.squaresContainingEnemyShips['submarine'][i]].classList.add('sunk')
                            if (i==0 && orientation == "horizontal" ) this.$refs.computerGrid[dataCopy[i]].classList.add('horizontal-start')
                            else if (i==2 && orientation == "horizontal") this.$refs.computerGrid[dataCopy[i]].classList.add('horizontal-end')
                            else if (i==0 && orientation == "vertical") this.$refs.computerGrid[dataCopy[i]].classList.add('vertical-start')
                            else if (i==2 && orientation == "vertical") this.$refs.computerGrid[dataCopy[i]].classList.add('vertical-end')
                        }
                    }
                }
                if (targetClass.contains('cruiser')) {
                    this.gameData.cruiserCount++
                    let dataCopy = this.gameData.squaresContainingEnemyShips['cruiser']
                    let orientation
                    if (dataCopy[1] - dataCopy[0] == 1) orientation = "horizontal"
                    else orientation = "vertical"
                    if (this.gameData.cruiserCount == 3) {
                        for (let i=0; i<3; i++) {
                            this.$refs.computerGrid[this.gameData.squaresContainingEnemyShips['cruiser'][i]].classList.add('sunk')
                            if (i==0 && orientation == "horizontal" ) this.$refs.computerGrid[dataCopy[i]].classList.add('horizontal-start')
                            else if (i==2 && orientation == "horizontal") this.$refs.computerGrid[dataCopy[i]].classList.add('horizontal-end')
                            else if (i==0 && orientation == "vertical") this.$refs.computerGrid[dataCopy[i]].classList.add('vertical-start')
                            else if (i==2 && orientation == "vertical") this.$refs.computerGrid[dataCopy[i]].classList.add('vertical-end')
                        }
                    }
                }
                if (targetClass.contains('battleship')) {
                    this.gameData.battleshipCount++
                    let dataCopy = this.gameData.squaresContainingEnemyShips['battleship']
                    let orientation
                    if (dataCopy[1] - dataCopy[0] == 1) orientation = "horizontal"
                    else orientation = "vertical"
                    if (this.gameData.battleshipCount == 4) {
                        for (let i=0; i<4; i++) {
                            this.$refs.computerGrid[this.gameData.squaresContainingEnemyShips['battleship'][i]].classList.add('sunk')
                            if (i==0 && orientation == "horizontal" ) this.$refs.computerGrid[dataCopy[i]].classList.add('horizontal-start')
                            else if (i==3 && orientation == "horizontal") this.$refs.computerGrid[dataCopy[i]].classList.add('horizontal-end')
                            else if (i==0 && orientation == "vertical") this.$refs.computerGrid[dataCopy[i]].classList.add('vertical-start')
                            else if (i==3 && orientation == "vertical") this.$refs.computerGrid[dataCopy[i]].classList.add('vertical-end')
                        }
                    }
                }
                if (targetClass.contains('carrier')) {
                    this.gameData.carrierCount++
                    let dataCopy = this.gameData.squaresContainingEnemyShips['carrier']
                    let orientation
                    if (dataCopy[1] - dataCopy[0] == 1) orientation = "horizontal"
                    else orientation = "vertical"
                    if (this.gameData.carrierCount == 5) {
                        for (let i=0; i<5; i++) {
                            this.$refs.computerGrid[this.gameData.squaresContainingEnemyShips['carrier'][i]].classList.add('sunk')
                            if (i==0 && orientation == "horizontal" ) this.$refs.computerGrid[dataCopy[i]].classList.add('horizontal-start')
                            else if (i==4 && orientation == "horizontal") this.$refs.computerGrid[dataCopy[i]].classList.add('horizontal-end')
                            else if (i==0 && orientation == "vertical") this.$refs.computerGrid[dataCopy[i]].classList.add('vertical-start')
                            else if (i==4 && orientation == "vertical") this.$refs.computerGrid[dataCopy[i]].classList.add('vertical-end')
                        }
                    }
                }
            } else {
                if (targetClass.contains('destroyer')) {
                    this.gameData.cpuDestroyerCount++
                    if (this.gameData.cpuDestroyerCount == 2) {
                        this.gameData.userShipsSunk.push(targetClass[1])
                        for (let i=0; i<2; i++) {
                            this.$refs.userGrid[this.gameData.squaresContainingShips['destroyer'][i]].classList.add('sunk')
                        }
                    }
                }
                if (targetClass.contains('submarine')) {
                    this.gameData.cpuSubmarineCount++
                    if (this.gameData.cpuSubmarineCount == 3) {
                        this.gameData.userShipsSunk.push(targetClass[1])
                        for (let i=0; i<3; i++) {
                            this.$refs.userGrid[this.gameData.squaresContainingShips['submarine'][i]].classList.add('sunk')
                        }
                    }
                }
                if (targetClass.contains('cruiser')) {
                    this.gameData.cpuCruiserCount++
                    if (this.gameData.cpuCruiserCount == 3) {
                        this.gameData.userShipsSunk.push(targetClass[1])
                        for (let i=0; i<3; i++) {
                            this.$refs.userGrid[this.gameData.squaresContainingShips['cruiser'][i]].classList.add('sunk')
                        }
                    }
                }
                if (targetClass.contains('battleship')) {
                    this.gameData.cpuBattleshipCount++
                    if (this.gameData.cpuBattleshipCount == 4) {
                        this.gameData.userShipsSunk.push(targetClass[1])
                        for (let i=0; i<4; i++) {
                            this.$refs.userGrid[this.gameData.squaresContainingShips['battleship'][i]].classList.add('sunk')
                        }
                    }
                }
                if (targetClass.contains('carrier')) {
                    this.gameData.cpuCarrierCount++
                    if (this.gameData.cpuCarrierCount == 5) {
                        this.gameData.userShipsSunk.push(targetClass[1])
                        for (let i=0; i<5; i++) {
                            this.$refs.userGrid[this.gameData.squaresContainingShips['carrier'][i]].classList.add('sunk')
                        }
                    }
                }
            }

        },
        computeAdjacentSquares(index) {
            /* if first column
                    * if first row, return right & bottom 
                    * if last row, return right & top
                    * else, return top, right, bottom
                * else if last column
                    * if first row, return left & bottom
                    * if last row, return left & top 
                    * else return top, left, bottom 
                * else
                    * if first row, return left right bottom
                    * if last row, return left right top
                    * 
                    * else return left right bottom top
            */
            if (String(index).slice(-1) == '0') {
                if (index == 0) {
                    return [1, 10]
                } else if (index == 90) {
                    return [80, 91]
                } else {
                    return [index-10, index+1, index+10]
                }
            } else if (String(index).slice(-1) == '9') {
                if (index == 9) {
                    return [8, 19]
                } else if (index == 99) {
                    return [98, 89]
                } else {
                    return [index-10, index-1, index+10]
                }
            } else {
                if (index < 10) {
                    return [index-1, index+1, index+10]
                } else if (index > 89) {
                    return [index-1, index+1, index-10]
                } else {
                    return [index-1, index+1, index-10, index+10]
                }
            }
        },
        wrongDeducedOrientation(squaresHit, deducedOrientation) {
            if (deducedOrientation == "horizontal") {
                return [Math.min(...squaresHit)-10, Math.min(...squaresHit)+10,Math.max(...squaresHit)-10, Math.max(...squaresHit)+10]
            } else {
                return [Math.min(...squaresHit)-1, Math.min(...squaresHit)+1,Math.max(...squaresHit)-1, Math.max(...squaresHit)+1]
            }
        },
        hunt() {
            // make code more readable by passing IndexesHit to a shorter named variable
            var squaresHit = this.computerMemory.previousIndexesHit
            var possibleSquares

            if (squaresHit.length == 1) {
                possibleSquares = this.computeAdjacentSquares(squaresHit[0])              
            } else if (squaresHit.length == 2) {
                if (squaresHit[1] == squaresHit[0]-1 || squaresHit[1] == squaresHit[0]+1) {
                    this.computerMemory.deducedOrientation = "horizontal"
                    possibleSquares = [Math.min(...squaresHit)-1, Math.max(...squaresHit)+1]
                } else {
                    this.computerMemory.deducedOrientation = "vertical"
                    possibleSquares = [Math.min(...squaresHit)-10, Math.max(...squaresHit)+10]
                }
            } else if (squaresHit.length == 3) {
                if (this.computerMemory.deducedOrientation == "horizontal") {
                    possibleSquares = [Math.min(...squaresHit)-1, Math.max(...squaresHit)+1]
                } else {
                    possibleSquares = [Math.min(...squaresHit)-10, Math.max(...squaresHit)+10]
                }
            } else {
                if (this.computerMemory.deducedOrientation == "horizontal") {
                    possibleSquares = [Math.min(...squaresHit)-1, Math.max(...squaresHit)+1]
                } else {
                    possibleSquares = [Math.min(...squaresHit)-10, Math.max(...squaresHit)+10]
                }
            } 
            possibleSquares = possibleSquares.filter(index => index <=99 && index >=0)
            var result = possibleSquares.every(index => 
                this.$refs.userGrid[index].classList.contains('miss') || this.$refs.userGrid[index].classList.contains('boom')
                )
            if (result) {
                possibleSquares = this.wrongDeducedOrientation(squaresHit, this.computerMemory.deducedOrientation)
            }
            // return random square from possible squares to be targeted
            return possibleSquares[Math.floor(Math.random() * possibleSquares.length)]
        },
        computerTurn() {

            var target 
            // If previous turn was a hit or if it's a miss but ship has not been sunk
            if (this.computerMemory.previousIndexesHit.length != 0) {
                target = this.hunt()
            } else {
                // do-while loop to e
                target = this.checkerboardIndex[Math.floor(Math.random()*this.checkerboardIndex.length)]
            }

            // make code more readable by passing IndexesHit to a shorter named variable
            let targetClass = this.$refs.userGrid[target].classList

            /* check that targetted square does not already have classes 
             * 'boom'/'miss' to avoid targetting repeated squares
             */
            if (!targetClass.contains('boom') && !targetClass.contains('miss')) {
                /* if targetted squares contain ship, add class 'boom' to square 
                 * to denote a hit, else add class 'miss' to denote a miss
                 */
                if (targetClass.contains('taken'))  {
                    this.computerMemory.previousTurnHit = true
                    if (!this.computerMemory.previousShipHit.includes(targetClass)) {
                        this.computerMemory.previousShipHit.push(targetClass[1]) 
                    }
                    this.computerMemory.previousIndexesHit.push(target)

                    // If the array of indexes hit contains all squares of ship, ship is sunk, and reset memory
                    var placeholder = this.gameData.squaresContainingShips[targetClass[1]]
                    let result = this.computerMemory.previousIndexesHit.length >= placeholder.length &&
                        placeholder.every(element => this.computerMemory.previousIndexesHit.includes(element))
                    if (result) {
                        this.computerMemory.previousShipSunk = true
                        var index = this.computerMemory.previousShipHit.indexOf(targetClass[1]);
                        this.computerMemory.previousShipHit.splice(index, 1);
                        this.gameData.squaresContainingShips[targetClass[1]].forEach(index => {
                            console.log(this.computerMemory.previousIndexesHit)
                            this.computerMemory.previousIndexesHit = this.computerMemory.previousIndexesHit.filter(e => e !== index)
                            console.log(this.computerMemory.previousIndexesHit)
                        })
                        if (this.computerMemory.previousIndexHit == 0) {
                            this.computerMemory.previousTurnHit = false
                        }
                    } else {
                        this.computerMemory.previousShipSunk = false
                    }
                    this.updateScore("cpu", targetClass)
                    targetClass.add('boom')
                    /* if score incremented by 1 == 17 (implying all ships are sunk)
                     * end the game, else continue with player's turn
                     */
                    this.gameData.cpuScore += 1
                    if (this.gameData.cpuScore === 17) {
                        this.$root.$emit('gameWon', 'computer')
                        this.gameData.outcome = "lose"
                        this.endGame(this.gameData)
                        localStorage.removeItem('gameState')
                    }
                } else {
                    targetClass.add('miss')
                    if (this.computerMemory.previousShipSunk == "true") {
                        this.computerMemory.previousTurnHit = false
                    }                     
                }
                this.updateAndSave()
                this.currentPlayer = 'user'
                this.playGame()
            } else this.computerTurn() // if targetted square has been targetted before, call function again
            
        },
        
    },
    /* mounted()
     * called after DOM has been mounted/rendered
     * can do DOM manipulation
     */
    mounted(){
        
        this.$refs.userGrid.forEach(square => square.addEventListener('dragstart', this.dragStart))
        this.$refs.userGrid.forEach(square => square.addEventListener('dragover', this.dragOver))
        this.$refs.userGrid.forEach(square => square.addEventListener('drop', this.drop))
        this.$refs.userGrid.forEach(square => square.addEventListener('dragend', this.dragEnd))
        this.$root.$on('game-started', () => {
            // Call the generate method to place ships on the computer's board
            for (let i=0; i<this.shipArray.length; i++) {
                this.generate(this.shipArray[i])
            }
            this.$refs.userGrid.forEach(square => square.removeEventListener('dragover', this.dragOver))
            this.$refs.userGrid.forEach(square => square.removeEventListener('dragstart', this.dragStart))
            this.$refs.userGrid.forEach(square => square.removeEventListener('drop', this.drop))
            this.$refs.userGrid.forEach(square => square.removeEventListener('dragend', this.dragEnd))
            this.isGameStarted = true
            this.playGame()
        })
        this.$root.$on('game-loaded', () => {
            this.$refs.userGrid.forEach(square => square.removeEventListener('dragover', this.dragOver))
            this.$refs.userGrid.forEach(square => square.removeEventListener('dragstart', this.dragStart))
            this.$refs.userGrid.forEach(square => square.removeEventListener('drop', this.drop))
            this.$refs.userGrid.forEach(square => square.removeEventListener('dragend', this.dragEnd))
            this.loadGame()
        })
    },
    /* created()
     * have access to reactive data properties and can change them
     * DOM has not been mounted so cannot do DOM manipulation
     * generally used for fetching data from backend
     */
    created() {
        this.width = 10,
        this.shipArray = [
            { 
                name: 'destroyer', 
                length: 2,
                orientation: [
                    [0, 1],
                    [0, this.width]
                ]   
            },
            { 
                name: 'submarine', 
                length: 3,
                orientation: [
                    [0, 1, 2],
                    [0, this.width, this.width*2]
                ]   
            },
            { 
                name: 'cruiser', 
                length: 3,
                orientation: [
                    [0, 1, 2],
                    [0, this.width, this.width*2]
                ]   
            },
            { 
                name: 'battleship', 
                length: 4,
                orientation: [
                    [0, 1, 2, 3],
                    [0, this.width, this.width*2, this.width*3]
                ]   
            },
            { 
                name: 'carrier', 
                length: 5,
                orientation: [
                    [0, 1, 2, 3, 4],
                    [0, this.width, this.width*2, this.width*3, this.width*4]
                ]   
            },
        ],
        // later to be set to all DOM elements with the class 'ship'
        this.ships = undefined,
        this.$eventHub.$on('dragged', (info) => {
            this.selectedShipClass = info.target.id.slice(0,-2)
            this.selectedShipIndex = info.target.id.slice(-1)
            this.draggedShip = info.target.parentNode
            if (this.draggedShip.classList.contains(this.selectedShipClass+'-vertical')) {
                if (this.selectedShipClass == 'destroyer') {
                    this.destroyerOrientation = "vertical"
                }
                if (this.selectedShipClass == 'submarine') {
                    this.submarineOrientation = "vertical"
                }
                if (this.selectedShipClass == 'cruiser') {
                    this.cruiserOrientation = "vertical"
                }
                if (this.selectedShipClass == 'battleship') {
                    this.battleshipOrientation = "vertical"
                }
                if (this.selectedShipClass == 'carrier') {
                    this.carrierOrientation = "vertical"
                }
            } else {
                if (this.selectedShipClass == 'destroyer') {
                    this.destroyerOrientation = "horizontal"
                }
                if (this.selectedShipClass == 'submarine') {
                    this.submarineOrientation = "horizontal"
                }
                if (this.selectedShipClass == 'cruiser') {
                    this.cruiserOrientation = "horizontal"
                }
                if (this.selectedShipClass == 'battleship') {
                    this.battleshipOrientation = "horizontal"
                }
                if (this.selectedShipClass == 'carrier') {
                    this.carrierOrientation = "horizontal"
                }
            }
        });
    }, 
    beforeDestroy() {
        this.$eventHub.$off('dragged');
    },
    data() {
        return {
            computerMemory: {
                previousTurnHit: false,
                previousShipSunk: true,
                previousShipHit: [],
                deducedOrientation: "",
                previousIndexesHit: [],
                possibleSquares: [],
            },
            checkerboardIndex: [0,2,4,6,8,
                                11,13,15,17,19,
                                20,22,24,26,28,
                                31,33,35,37,39,
                                40,42,44,46,48,
                                51,53,55,57,59,
                                60,62,64,66,68,
                                71,73,75,77,79,
                                80,82,84,86,88,
                                91,93,95,97,99],
            length: 0,
            gameData: {
                username: "",
                outcome: "", 
                moveCount: 0,
                userBoard: [],
                computerBoard: [],
                squaresContainingShips: {destroyer: [], submarine: [], cruiser: [], battleship: [], carrier: []},
                squaresContainingEnemyShips: {destroyer: [], submarine: [], cruiser: [], battleship: [], carrier: []},
                userShipsSunk: [],
                computerShipsSunk: [],
                destroyerCount: 0,
                submarineCount: 0,
                cruiserCount: 0,
                battleshipCount: 0,
                carrierCount: 0,
                cpuDestroyerCount: 0,
                cpuSubmarineCount: 0,
                cpuCruiserCount: 0,
                cpuBattleshipCount: 0,
                cpuCarrierCount: 0,
                playerScore: 0,
                cpuScore: 0,
            },
            destroyerOrientation: "horizontal",
            submarineOrientation: "horizontal",
            cruiserOrientation: "horizontal",
            battleshipOrientation: "horizontal",
            carrierOrientation: "horizontal",
            draggedShip: undefined,
            selectedShipIndex: undefined,
            selectedShipClass: undefined,
            currentPlayer: "user",
            
            shipPlaced: 0,
            isGameStarted: false,
        }
    },
    computed: {
        ...mapGetters(['isGameOver', 'user'])
    }
    /* run once per page load, and will re-run if any dependent variable changes
     * think of computed value as a *derived* value that
     * will be automatically updated whenever one of the underlying values used
     * to calculate it is updated.
     * You don't call a computed, and it doesn't accept parameters
     */
}
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.container {
    display: flex;
    justify-content: center;
    width: 100%;
}

.grid {
    margin:2vmin;
    display: grid;
    background-color: rgba(0, 157, 196, 0.7);
    grid-template-rows: repeat(10, 4.6vmin);
    grid-template-columns: repeat(10, 4.6vmin);
}

.grid div {
    border: 1px solid rgba(0, 0, 0, 0.2);
}

.grid-computer > .taken {
    background-color: rgba(0, 157, 196, 0);
}

.destroyer-container div {
    width: 50%;
    height: 100%;
}

.ship {
    display: flex;
    margin: 10px;
    height: 10%;
}

.taken, .ship {
    background-color: rgb(180, 180, 180);
}

.taken {
    grid-area: span 1/span 1;
}

.taken.horizontal-start {
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
}

.taken.horizontal-end {
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
}

.taken.vertical-start {
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
}

.taken.vertical-end {
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
}



.boom,
.miss {
    display: flex;
    justify-content: center;
    align-items: center;
}

.boom::before {
    content: '💣';
    position: absolute;
    animation: bomb 1.5s ease-in forwards;
}

.boom::after {
    content: '🔥';
    animation: hit 0.4s linear infinite;
}

.miss::before {
    content: '💣';
    position: absolute;
    animation: bomb 1.5s ease-in forwards;
}

.miss::after {
    /* content: '';
    animation: ripple 3s ease-out infinite;
    border: .1vmin solid rgba(1, 140, 175, 1);
    border-radius: 100%;
    width: 1vmin;
    height: 1vmin; */
    content: '✖️';
}

@keyframes hit {
    0% {
        transform: scale(1.4);
    }
    100% {
        transform: scale(1.5);
    }
}

@keyframes bomb {
    0% {
        opacity: 1;
        transform: scale(1.5);
    }
    100% {
        opacity: 0;
        transform: scale(0);
    }
}

@keyframes ripple {
    0% {
        opacity: 0.7;
        transform: scale(2);
    }
    100% {
        opacity: 0.3;
        transform: scale(3);
    }
}


/* .boom::after,
.miss::after {
    content: '';
    position: absolute;
    border-radius: 100%;
    width: 1vmin;
    height: 1vmin;
}

.boom::after {
    background-color: red;
} 
.miss::after {
    background-color: black;
}  */

.grid-computer > .taken.sunk,
.grid-user > .taken.sunk {
   background-color: rgba(114, 114, 114, 0.692);
}
</style>