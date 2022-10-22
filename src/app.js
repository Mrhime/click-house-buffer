require('dotenv').config()
const express = require('express');
const app = express()
const AppController = require('./app.controller')

const RedisModule = require('./redis/redis.module')
const ClickHouseModule = require('./click-house/click-house.module')
const RedisService = require('./redis/redis.service')
const redisModule = new RedisModule(process.env.REDIS_URL)
const clickHouseModule = new ClickHouseModule(process.env.CH_URL, process.env.CH_PORT)
const redisService = new RedisService(redisModule.redisClient)
const appController = new AppController(express, app, redisService)

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log('app listening host ' + process.env.HOST + ' port ' + process.env.PORT)
})