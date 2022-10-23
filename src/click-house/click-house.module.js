import {ClickHouse} from "clickhouse"

export class ClickHouseModule {
    constructor(dbUrl, dbPort, dbName) {
        this.clickHouse = new ClickHouse({
            url: dbUrl,
            port: dbPort,
            debug: false,
            basicAuth: null,
            isUseGzip: false,
            trimQuery: false,
            usePost: false,
            format: "json",
            raw: false,
            config: {
                session_timeout: 60,
                output_format_json_quote_64bit_integers: 0,
                enable_http_compression: 0,
                database: dbName,
            }
        })
    }
}

