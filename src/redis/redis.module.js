import redis from "redis"
export class RedisModule {
    constructor(redisUrl) {
        this.redisClient = {}
        this.init(redisUrl)
    }
    init(redisUrl){
        (async () => {
            this.redisClient = redis.createClient({
                url: redisUrl
            });

            this.redisClient.on("error", (error) => console.error(`Error : ${error}`));

            await this.redisClient.connect();
        })();
    }
}