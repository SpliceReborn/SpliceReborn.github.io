<template>
    <div>
        <Header />
        <div class="info-container">
            <div class="info-inner-container">
                <h2> Rules </h2>
                <p>
                    Battleship is a turn-based game where two players first place their ships of varying 
                    size on a square board without letting the opponent know where they have
                    placed them.
                </p><p>
                    The players then take turns choosing a square on the board to shoot at. The system will let the player
                    know if it is a hit or miss. The player can then attempt to deduce the ship's orientation and position from 
                    the feedback.
                </p><p>
                    When all the squares a ship is occupying has been shot at, the ship will sink. The first
                    player to sink all of the opponent's ships wins the game.
                </p>
            </div>
        </div>

    </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
    components: {
        Header
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.info-container {
    width:70%;
    min-width:500px;
    margin: 3% auto;
    background-color: whitesmoke;
    border-style:double;
    border-width: 1px;
}
h2 {
    font-size: 2.5em;
    text-align: left;
    margin-bottom: 1em;
}
.info-inner-container {
    margin: 3% 5%;
}
.info-inner-container p {
    text-align:left;
    margin-bottom: 1em;
}

.form {
    margin-top: 40px;
    border-radius: 6px;
    width: 100%;
    margin: auto;
}
.form-group {
    margin-bottom: 2rem;
}
label {
    display: inline-block;
    width: 100%;
    text-align: left;
    margin-bottom: 1%;
    font-weight: bold;
}
.form-control:invalid, .form-group.is-invalid .form-control {
    border-color: #c33;
}
.form-control {
    display: block;
    width: 100%;
    height: calc(2.7em + 2px);
    background-clip: padding-box;
}
.btn {
    display: block;
    width: 100%;
    padding: 20px;
    font-family: "Roboto";
    outline: 0;
    border: 0;
    color: white;
    background: burlywood;
    margin-bottom: 1em;
}
.form a {
    width: 100%;
    display:inline-block;
}
</style>