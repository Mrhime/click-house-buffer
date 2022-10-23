import * as utils from './utils.js'
export class AppService {
    constructor(redisService, clickHouseService, limitCount, limitSec) {
        this.redisService = redisService
        this.clickHouseService = clickHouseService
        this.limitCount = limitCount
        this.limitTime = limitSec * 1000
        this.timeSync = utils.getTimestamp()
        this.init()
    }

    init(){
        const _this = this
        setInterval(async ()=>{
            await _this.createRecords()
        }, this.limitTime + 1)
    }

    async getCount(){
        return this.redisService.getCount()
    }

    async createRecord(data){
        if (!utils.validateRecord(data)){
            return false
        }
        this.redisService.set(data.id, data)
        await this.createRecords()
        return true
    }

    async createRecords(){
        const statusBuffer =  await this.checkAddClickHouse()
        console.log('create record: ',statusBuffer)
        if (statusBuffer) {
            const data = await this.redisService.getAllData()
            if (data.values){
                if(data.values.length !== 0){
                    await this.clickHouseService.createRecord(data.values)
                    this.redisService.delete(data.keys)
                    this.timeSync = utils.getTimestamp()
                }
            }
        }
    }

    async checkAddClickHouse(){
        const count = await this.redisService.getCount()
        return count === this.limitCount || utils.getTimestamp() >= (this.timeSync + this.limitTime);

    }

}