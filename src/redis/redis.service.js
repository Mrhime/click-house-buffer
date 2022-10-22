class RedisService {
    constructor(redisClient) {
        this.redisClient = redisClient
    }

    async get(key){
        return await this.redisClient.get(key)
    }

    async set(key, value){
        if (typeof value !== "string"){
            value = JSON.stringify(value)
        }
        return await this.redisClient.set(key.toString(), value)
    }
}

module.exports = RedisService