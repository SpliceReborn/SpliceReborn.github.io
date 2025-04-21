<template>
    <div>
        <Header/>
        <h1>Single Player Mode</h1>
        <Board/>
        <Sideboard />
    </div>
</template>

<script>
import Header from '@/components/Header'
import Sideboard from '@/components/Sideboard'
import Board from '@/components/Board'

export default {
    components: {
        Header,
        Board,
        Sideboard,
    }, 
}
</script>