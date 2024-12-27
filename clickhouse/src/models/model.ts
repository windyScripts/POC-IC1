// create model for user message logging, including user, sender, engagement, message code

import { DATA_TYPE, ModelSyncTableConfig } from 'clickhouse-orm';
const table1Schema: ModelSyncTableConfig<{
  status?: number;
  time: Date;
  browser?: string;
  browser_v?: string;
}> = {
  tableName: "table1",
  schema: {
    time: { type: DATA_TYPE.DateTime, default: Date },
    status: { type: DATA_TYPE.Int32 },
    browser: { type: DATA_TYPE.String },
    browser_v: { type: DATA_TYPE.String },
  },
  options: `ENGINE = MergeTree
  PARTITION BY toYYYYMM(time)
  ORDER BY time`,
  autoCreate: true,
  autoSync: true,
};