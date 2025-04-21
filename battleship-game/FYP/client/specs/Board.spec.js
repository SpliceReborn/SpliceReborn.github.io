import {mount, shallowMount, createLocalVue, RouterLinkStub} from '@vue/test-utils'
/* import Vuex from 'vuex' */
import Vue from 'vue'
import BoardComponent from '@/components/Board.vue'

const GlobalPlugins = {
  install(v) {
    // Event bus
    v.prototype.$eventHub = new Vue();
  },
};
// create a local instance of the global bus
const localVue = createLocalVue();
localVue.use(GlobalPlugins);
/* const $store = {
    state: {
        id: 1
    },
    getters: {
        user: () => ({}),
        isLoggedIn: () => ({})
    }
} */

const ComputerBoard = {
    template: `<div>
                    <div v-show="isGameStarted" class="grid grid-computer">
                        <div v-for="n in this.width*this.width" :id="'computer'+(n-1)" v-bind:key="n" ref="computerGrid"></div>
                    </div>
                </div>`,
    data() {},
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
        ]
    },
    mounted() {
        for (let i=0; i<this.shipArray.length; i++) {
            this.generate(this.shipArray[i])
        }
    },
    methods: {
        generate(ship) {
            var startSquare, isAtRightEdge, isAtLeftEdge
            let orientationDecider = Math.round(Math.random());
            let squaresToOccupy = ship.orientation[orientationDecider]

            /* Horizontal orientation => Starting square accounts for ship's length horizontally
             * Check that no part of the ship other than start and end occupies the board's edge
             * to avoid ship from 'overflowing' from one row to another
             */
            if (orientationDecider === 0) {
                startSquare = Math.abs(Math.floor(Math.random() * 100 - ship.length))
                isAtRightEdge = squaresToOccupy.slice(0, ship.length-1).some(index => (startSquare + index) % this.width === this.width - 1)
                isAtLeftEdge = squaresToOccupy.slice(1).some(index => (startSquare + index) % this.width === 0)

            }
            /* Vertical orientation => Starting square accounts for ship's length vertically
             * i.e. (startSquare, startSquare + widthOfBoard, startSquare + 2*widthOfBoard)
             * Does not need to check if squares are on left or right edge because ships are vertical
             * Does not need to check if it goes beyond the board because that is taken account of in the calculation of startSquare)
             */
            if (orientationDecider === 1) {
                startSquare = Math.abs(Math.floor(Math.random() * 100 - (ship.length-1)*this.width))
            }

            /* Check if squares to be occupied are taken by some other ships, or if isAtRightEdge/isAtLeftEdge is true
             * If all of it is false, mark the squares as taken by this new ship
             * Else, call the function again and try to regenerate ship that does not violate any restrictions
             */
            const isTaken = squaresToOccupy.some(index => document.querySelector('.grid-computer').childNodes[startSquare + index].classList.contains('taken'))
            if (!isTaken && !isAtRightEdge && !isAtLeftEdge) {
                if (!(this.checkIfAdjacentTaken(orientationDecider, ship, squaresToOccupy, startSquare))) {
                    squaresToOccupy.forEach(index => { 
                        document.querySelector('.grid-computer').childNodes[startSquare + index].classList.add('taken', ship.name)
                        this.gameData.squaresContainingEnemyShips[ship.name].push(startSquare+index)
                    })
                } else this.generate(ship)
            }
            else this.generate(ship)
        }
    }
}

test('mount Board', () => {
    const div = document.createElement('div')
    const div2 = document.createElement('div')
    div2.classList.add('grid', 'grid-computer')
    div.appendChild(div2)
    for (var i=0; i < 100; i++) {
        let div3 = document.createElement('div')
        div3.id = 'computer' + i 
        div2.appendChild(div3)
    }
    const wrapper = mount(ComputerBoard, {
        attachTo: div
/*         mocks: {
            $eventHub: {
                $on: jest.fn(),
                $off: jest.fn(),
                $emit: jest.fn(),
            },
        },
        stubs: {
            RouterLink: RouterLinkStub
        } */
    })
    /* const taken = wrapper.findAllComponents({ref: 'userGrid'})  */// => finds Bar by `ref`
    console.log(wrapper.html())
    /* wrapper.destroy() */
})