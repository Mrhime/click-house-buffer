export class ClickHouseService {
    constructor(clickHouse) {
        this.clickHouse = clickHouse
    }

    async createTable(tableName) {
        return await this.clickHouse.query(
            `CREATE
                 TABLE IF NOT EXISTS ${tableName}
             (
                 id
                 String,
                 full_name
                 String,
                 description
                 Text
             )
                ENGINE=Memory`
        ).toPromise();
    }

    async createRecord(values) {
        const tableNames = Array.from(new Set(values.map((v) => v.tableName)))
        let res = null
        for (let index in tableNames) {
            const name = tableNames[index]
            const rows = []
            await this.createTable(name)
            values.forEach((v) => {
                if (v.tableName === name) {
                    rows.push({id: v.id, full_name: v.full_name, description: v.description})
                }
            })
            const r = await this.clickHouse.insert(
                `insert into ${name}
                     (id, full_name, description)`,
                rows
            ).toPromise();
            res = res + r

        }
        return res
    }
}
