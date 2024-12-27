// initialize connection

import { ClickhouseOrm } from "clickhouse-orm";

const chOrm = ClickhouseOrm({
  db: {
    name: "orm_test",
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
    format: "json", // "json" || "csv" || "tsv"
  },
});