import { createClient } from '@clickhouse/client' // or '@clickhouse/client-web'

export const clickHouseClient = createClient({
  /* configuration */
  url:"",
  username:"default",
  password:"",
  database:""
})