import {mount, createLocalVue, RouterLinkStub, config} from '@vue/test-utils'

import Vue from 'vue'
import Sideboard from '@/components/Sideboard.vue'

config.showDeprecationWarnings = false
const GlobalPlugins = {
    install(v) {
      // Event bus
      v.prototype.$eventHub = new Vue();
    },
};
// create a local instance of the global bus
const localVue = createLocalVue();
localVue.use(GlobalPlugins);

describe('buttons test', () => {
    const startGame = jest.fn()
    const loadGame = jest.fn()
    const rotateShips = jest.fn()
    const wrapper = mount(Sideboard, {
        mocks: {
            $eventHub: {
                $on: jest.fn(),
                $off: jest.fn(),
                $emit: jest.fn(),
            },
        },
        methods: {
            startGame,
            loadGame,
            rotateShips
        },
        stubs: {
            RouterLink: RouterLinkStub
        }
    })
    test('start game button is rendered', () => {
        expect(wrapper.find('#start').exists()).toBe(true)

    });
    test('load game button is rendered', () => {
        expect(wrapper.find('#load').exists()).toBe(true)

    });
    test('rotate ships button is rendered', () => {
        expect(wrapper.find('#rotate').exists()).toBe(true)

    });
    test('startGame method is called when start game button is clicked', async () => {
        const startGameButton = wrapper.find('#start')
        startGameButton.trigger('click')
        await wrapper.vm.$nextTick()
        expect(startGame).toHaveBeenCalled()
    });
    test('loadGame method is not called when no unfinished game is found', async () => {
        const loadGameButton = wrapper.find('#load')
        loadGameButton.trigger('click')
        await wrapper.vm.$nextTick()
        expect(loadGame).not.toHaveBeenCalled()
    });
    test('loadGame method is called when load game button is clicked', async () => {
        const loadGameButton = wrapper.find('#load')
        wrapper.setData({ noGameFound: false })
        await wrapper.vm.$nextTick()
        loadGameButton.trigger('click')
        await wrapper.vm.$nextTick()
        expect(loadGame).toHaveBeenCalled()
    });
    test('rotateShips method is called when rotate ships button is clicked', async () => {
        const rotateShipsButton = wrapper.find('#rotate')
        rotateShipsButton.trigger('click')
        await wrapper.vm.$nextTick()
        expect(rotateShips).toHaveBeenCalled()
    })
});