import dotenv from "dotenv"
import express from "express";
import {RedisModule} from "./redis/redis.module.js";
import {ClickHouseModule} from "./click-house/click-house.module.js";
import {AppController} from "./app.controller.js"
import {AppService} from "./app.service.js";
import {ClickHouseService} from "./click-house/click-house.service.js";
import {RedisService} from "./redis/redis.service.js"
dotenv.config()
const app = express()

const redisModule = new RedisModule(process.env.REDIS_URL)
const clickHouseModule = new ClickHouseModule(process.env.CH_URL, process.env.CH_PORT, process.env.CH_DB_NAME)
const redisService = new RedisService(redisModule.redisClient)
const clickHouseService = new ClickHouseService(clickHouseModule.clickHouse)
const appService = new AppService(redisService, clickHouseService, process.env.BUFFER_LIMIT_COUNT, process.env.BUFFER_LIMIT_SEC)
const appController = new AppController(express, app, appService)


app.listen(process.env.PORT, process.env.HOST, () => {
    console.log('app listening host ' + process.env.HOST + ' port ' + process.env.PORT)
})