import { DATA_TYPE } from "clickhouse-orm";
import clickHouseConnection from "../config/clickhouse-config.js";

interface userDatum {
 
}

const schema = {
    tableName: 'userData',
    schema: {
        gen_id: { type: DATA_TYPE.Int64 },
        engagement: { type: DATA_TYPE.Int64 },
        dateTime: { type: DATA_TYPE.DateTime },
        timestamp: { type: DATA_TYPE.UInt32, default: new Date().getTime() },
        source: { type: DATA_TYPE.String },
        messageType: { type: DATA_TYPE.String },
        userId: { type: DATA_TYPE.UInt32 }
    },
    options: `Engine = ReplacingMergeTree(timestamp)
    ORDER BY (gen_id, dateTime)`, 
    autoCreate: true,
    autoSync: false,
};

async function returnUserDataModel(){
    return await clickHouseConnection.model<userDatum>(schema);
}

const userData = returnUserDataModel();
export default userData;





