const cors = require("cors");
const bodyParser = require('body-parser');

class AppController {
    constructor(express, app, redisService) {
        this.app = app
        this.redisService = redisService

        this.app.use(bodyParser.json())

        this.init()
    }


    init() {

        //     this.app.use([bodyParser, cors({
        //         origin: '*',
        //         credentials: true,
        //         optionSuccessStatus: 200,
        //     })]);
        this.app.post('/create', async (req, res) => {
            const data = req.body
            console.log(data.uuid)
            await this.redisService.set(data.uuid, data)
            res.json({requestBody: req.body})
            res.status(201)
            res.end()
        })

        this.app.get('/redis/:id', async (req, res) => {
            const data = req.query
            console.log(data)
            const value = await this.redisService.get(req.params.id)
            res.json(value)
            res.status(201)
            res.end()
        })
    }

}

module.exports = AppController