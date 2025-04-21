const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const key = require('../../config/keys').secret;
const User = require('../../model/User')
const FinishedGames = require('../../model/FinishedGames')
const UnfinishedGames = require('../../model/UnfinishedGames')

const app = express()
/* 
 * @route POST api/users/       
 * @desc Register the User
 * @access Public
 */
app.post('/register', (req, res) => {
    let { username, email, password, confirm_password } = req.body
    if (password !== confirm_password) {
        return res.status(400).json({
            msg: "Passwords do not match."
        })
    } 
    // Check for unique credentials
    User.findOne({username: username}).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Username is already taken."
            })
        }
    })
    User.findOne({email: email}).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Email is already registered."
            })
        }
    })

    // Data is valid, register user
    let newUser = new User({
        username,
        password,
        email,
    });
    let finishedGames = new FinishedGames({
        username,
    })
    let unfinishedGames = new UnfinishedGames({
        username,
    })
    // Hash password 
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(() => {
                finishedGames.save().then(() => {
                    unfinishedGames.save().then(() => {
                        User.findOne({ username: newUser.username }).then(user => {
                            const payload = {
                                _id: user._id,
                                username: user.username,
                                name: user.name,
                                email: user.email
                            }
                            jwt.sign(payload, key, { expiresIn: 604800 }, (err, token) => {
                                return res.status(200).json({
                                    success: true,
                                    user: user,
                                    token: `Bearer ${token}`,
                                    msg: "You are logged in!"
                                })
                            })
                        })
                    })
                })
            })
        })
    })
    
})

/* 
 * @route POST api/users/login
 * @desc Signing in the User
 * @access Public
 */
app.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }).then(user => {
        if (!user) {
            return res.status(404).json({
                msg: "User not found!",
                success: false
            })
        } 
        // Check password
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email
                }
                jwt.sign(payload, key, { expiresIn: 604800 }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        user: user,
                        token: `Bearer ${token}`,
                        msg: "You are logged in!"
                    })
                })
            } else {
                return res.status(404).json({
                    msg: "Incorrect password",
                    success: false
                })
            }
        })
    })
})

/* 
 * @route POST api/users/profile
 * @desc Return user data
 * @access Private
 */
app.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json({
        user: req.user
    })
})

module.exports = app;