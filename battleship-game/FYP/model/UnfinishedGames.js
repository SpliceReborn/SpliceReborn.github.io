const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the userGames Schema
const UnfinishedGamesSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    game: {
        type: Object, 
    }
});

module.exports = UnfinishedGames = mongoose.model('unfinishedgames', UnfinishedGamesSchema);