import * as utils from "../utils.js";

export class RedisService {
    constructor(redisClient) {
        this.redisClient = redisClient
    }

    async get(key) {
        return await this.redisClient.get(key.toString())
    }

    async set(key, value) {
        if (typeof value !== "string") {
            value = JSON.stringify(value)
        }
        return await this.redisClient.set(key.toString(), value)
    }

    async delete(keys) {
        return await this.redisClient.del(keys)
    }

    async getCount() {
        const keys = await this.redisClient.keys('*')
        return keys.length
    }

    async getAllData() {
        const keys = await this.redisClient.keys('*')
        const values = []
        for (let index in keys) {
            const key = keys[index]
            if (key) {
                const value = await this.get(key)
                if (utils.isJsonString(value)) {
                    if (utils.validateRecord(JSON.parse(value))) {
                        values.push(JSON.parse(value))
                    }
                }
            }
        }
        return {
            keys: keys,
            values: values
        }
    }

}