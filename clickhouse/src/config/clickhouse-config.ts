import { createClient } from '@clickhouse/client' // or '@clickhouse/client-web'

export const cHClient = createClient({
  /* configuration */
  url:"http://localhost:8123",
  username:"default",
  password:"",
  database:""
})