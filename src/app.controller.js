import cors from "cors"
import bodyParser from "body-parser";

export class AppController {
    constructor(express, app, appService) {
        this.app = app
        this.appService = appService

        this.app.use([bodyParser.json(),cors({
                    origin: '*',
                    credentials: true,
                    optionSuccessStatus: 200,
                })])
        this.init()
    }
    async init(){
        await this.routers()
    }
    async routers() {
        this.app.post('/create', async (req, res) => {
            const data = req.body
            const record = await this.appService.createRecord(data)
            if (!record){
                res.send('No valid data')
                res.status(400)
                res.end()
            }else {
                res.json({requestBody: req.body})
                res.status(201)
                res.end()
            }

        })

        this.app.get('/redis/count', async (req, res) => {
            const value = await this.appService.redisService.getCount()
            res.json(value)
            res.status(200)
            res.end()
        })


    }
}

