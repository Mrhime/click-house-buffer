const { ClickHouse } = require('clickhouse');
class ClickHouseModule {
    constructor(dbUrl, dbPort) {
        this.clickHouse = new ClickHouse()
    }

}

module.exports = ClickHouseModule