import { createClient } from '@clickhouse/client' // or '@clickhouse/client-web'

export const cHClient = createClient({
  /* configuration */
  url:"http://localhost:8123",
  username:"clickHouse",
  password:"clickHouse",
  database:"clickHouse"
})