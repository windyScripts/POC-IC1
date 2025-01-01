// methods to query based on start time in ms and end time in ms
// methods to add new messages with the following properties:
/*

message: {
id // created by default
user,
text,
engagement,
type,
sendTime
}

*/

import { clickHouseClient } from "../config/clickhouse-config"

const getCategories = async () => {

    const categories = await clickHouseClient.query({})

}

    const writeMessage = async () => {
        const message = await clickHouseClient.insert({})
}

export const resolvers = {

}