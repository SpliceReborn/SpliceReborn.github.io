const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the userGames Schema
const FinishedGamesSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    games: []
    
});

module.exports = FinishedGames = mongoose.model('finishedgames', FinishedGamesSchema);