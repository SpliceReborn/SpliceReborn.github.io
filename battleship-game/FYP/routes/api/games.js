const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const key = require('../../config/keys').secret;
const FinishedGames = require('../../model/FinishedGames')
const UnfinishedGames = require('../../model/UnfinishedGames')

const app = express()
/* 
 * @route POST api/users/register
 * @desc Register the User
 * @access Public
 */
app.post('/save', (req, res) => {
    FinishedGames.findOne({username: req.body.username}).then(doc => {
        /* For finished games, we only care about outcome and moveCount
         * Placement of ships and which ships were sunk are not important
         */
        doc.games.push({
            outcome: req.body.outcome,
            moveCount: req.body.moveCount
        })
        doc.save().then(() => {
            return res.status(200);
        })
    })
})

app.post('/saveUnfinished', (req, res) => {
    UnfinishedGames.findOne({username: req.body.username}).then(doc => {
        doc.game = req.body
        doc.save().then(() => {
            return res.status(200).json({
                success: true,
            })
        })                
    })
})

app.get('/loadUnfinished', (req, res) => {
    UnfinishedGames.findOne({username: req.query.username}).then(doc => {
        if (!doc) {
            return res.status(200).json({
                gameState: {}
            })
        } else {
            return res.status(200).json({
                gameState: doc.game
            })
        }
    })
})

module.exports = app;