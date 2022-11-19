const express = require("express");
const app = require('../app.js')
const session = require('express-session')
const MongoStore = require('connect-mongo')

module.exports = (app)=>{
    app.set('trust proxy', 1)
    app.use(
        session({
            name:"connect.ssid",
            secret: process.env.SESS_SECRET,
            resave: false,
            saveUninitialized: true,
            cookie:{
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                secure: process.env.NODE_ENV === "production",
                httpOnly: true
            },
            store: MongoStore.create({
                mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/lab-express-basic-auth",
                ttl: 2 * 24 * 60 * 60
            })
        })
    )
}