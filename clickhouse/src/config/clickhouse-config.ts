import { ClickhouseOrm } from "clickhouse-orm";
import dotenv from 'dotenv';
dotenv.config();

const db_name = process.env.CLICKHOUSE_DB as string;

const clickHouseConnection = ClickhouseOrm({
    db: {
        name: db_name,
    },
    debug: true,
    client: {
        url: "localhost",
        port: "8123",
        basicAuth: {
            username: "default",
            password: "",
        },
        debug: false,
        isUseGzip: true,
        // format: "json", 
    },
});


export default clickHouseConnection;