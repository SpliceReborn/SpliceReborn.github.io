<template>
  <div>
    <div class="hidden-info">
        <div class="setup" v-show="ongoing===0">
            <button id="start" :disabled='!allShipsPlaced' @click="startGame" :title="!allShipsPlaced ? 'Place your ships' : 'Start new game'">New Game</button>
            <button id="load" :disabled='noGameFound' @click="loadGame" :title="noGameFound ? 'No game found' : 'Load unfinished game'">Load Game</button>
            <button id="rotate" @click="rotateShips">Rotate ships</button>
        </div>
        <h3 id="info" ref="placeships" v-if="player === undefined">Place your ships</h3>
        <h3 id="info" v-else-if="player === 'user'">Your turn</h3>
        <h3 id="info" v-else-if="player === 'computer'">Computer's turn</h3>
        <h3 id="info" v-else-if="winner === 'user'">You won!!</h3>
        <h3 id="info" v-else-if="winner === 'computer'">Computer won!</h3>
    </div>
    <div class="container">
       <div class="grid-display" ref="display">
            <div class="ship destroyer" ref="destroyer" draggable="true">
                <div id="destroyer-0" class="start"></div>
                <div id="destroyer-1" class="end"></div>
            </div>
            <div class="ship submarine" ref="submarine" draggable="true">
                <div id="submarine-0" class="start"></div>
                <div id="submarine-1"></div>
                <div id="submarine-2" class="end"></div>
            </div>
            <div class="ship cruiser" ref="cruiser" draggable="true">
                <div id="cruiser-0" class="start"></div>
                <div id="cruiser-1"></div>
                <div id="cruiser-2" class="end"></div>
            </div>
            <div class="ship battleship" ref="battleship" draggable="true">
                <div id="battleship-0" class="start"></div>
                <div id="battleship-1"></div>
                <div id="battleship-2"></div>
                <div id="battleship-3" class="end"></div>
            </div>
            <div class="ship carrier" ref="carrier" draggable="true">
                <div id="carrier-0" class="start"></div>
                <div id="carrier-1"></div>
                <div id="carrier-2"></div>
                <div id="carrier-3"></div>
                <div id="carrier-4" class="end"></div>
            </div>
        </div>     
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            player: undefined,
            winner: undefined,
            ongoing: 0,
            allShipsPlaced: false,
            noGameFound: true,
        }
    },
    mounted() {
        this.$root.$on('turnChange', (turn) => {
            this.player = turn
        }),
        this.$root.$on('gameWon', (whoWon) => {
            this.player = ""
            this.winner = whoWon
        })
        this.$refs.destroyer.addEventListener('mousedown', this.emit)
        this.$refs.battleship.addEventListener('mousedown', this.emit)
        this.$refs.carrier.addEventListener('mousedown', this.emit)
        this.$refs.cruiser.addEventListener('mousedown', this.emit)
        this.$refs.submarine.addEventListener('mousedown', this.emit)
        if (localStorage.getItem('gameState') !== null) {
            if (JSON.parse(localStorage.getItem('gameState')) !== null) this.noGameFound = false
        }
        
    },
    methods: {
        ...mapActions(['startGame']),
        rotateShips() {
            this.$refs.destroyer.classList.toggle('destroyer-vertical')
            this.$refs.battleship.classList.toggle('battleship-vertical')
            this.$refs.carrier.classList.toggle('carrier-vertical')
            this.$refs.cruiser.classList.toggle('cruiser-vertical')
            this.$refs.submarine.classList.toggle('submarine-vertical')
        },
        startGame() {
            // Check if all ships are placed before starting game
            if (this.allShipsPlaced) {
                this.startGame; // change state
                this.ongoing = 1;
                this.$root.$emit('game-started')
            } else {
                this.$refs.placeships.style.color="red"
                this.$refs.placeships.style.fontWeight = "800";
                setTimeout(() => {
                    this.$refs.placeships.style.color=""
                    this.$refs.placeships.style.fontWeight = "700"
                }, 1000)
            }
            /* this.$root.$emit('game-started') */
        },
        loadGame() {
            this.ongoing = 1;
            this.$root.$emit('game-loaded')
        },
        emit(e) {
            this.$eventHub.$emit('dragged', e)
        }
    },
    created() {
        // listen to all-ships-placed event form board.vue
        this.$eventHub.$on('all-ships-placed', () => {
            this.allShipsPlaced = true;
        });
    },
    beforeDestroy() {
        this.$eventHub.$off('all-ships-placed');
    },
}
</script>

<style scoped>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    #info {
        user-select: none;
    }
    .container {
        display: flex;
        justify-content: center;
    }
    .grid-display {
        display: flex;
    } 
    .ship {
        background-color: rgb(180, 180, 180);
        display: flex;
        flex-wrap: wrap;
        margin: 1vmin;
        width: calc(4.6vmin * var(--width, 1));
        height: calc(4.6vmin * var(--height, 1));
        border-radius: 2.3vmin;
    }

    .ship div {
        width: 4.6vmin;
        height: 4.6vmin;
        border: 1px solid rgba(255, 255, 255, 0.315);
    }

    .destroyer {
        --width: 2;
    }
    .destroyer-vertical {
        --height: 2;
        --width: 1
    }
    .submarine, .cruiser {
        --width: 3;
    }
    .submarine-vertical, .cruiser-vertical {
        --height: 3;
        --width: 1;
    }
    .battleship {
        --width: 4;
    }
    .battleship-vertical {
        --height: 4;
        --width: 1;
    }
    .carrier {
        --width: 5;
    }
    .carrier-vertical {
        --height: 5;
        --width: 1;
    }
    button {
        background: linear-gradient(to bottom, #d8d4cd, #b9b9b9 100%);
        text-transform: uppercase;
        padding: 0.8em 1em;
        border: none;
        cursor: pointer;
        text-align: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        white-space: nowrap;
        display: inline-block;
        transition: all 150ms;
        border-radius: 3px;
        font-weight: 600;
        margin: 1.2em 1em;
    }
    button:disabled{
        cursor: default;
    }

</style>