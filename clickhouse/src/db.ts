import { createClient, ClickHouseClient } from '@clickhouse/client';

const client: ClickHouseClient = createClient({
    host: 'http://localhost:8123',
    username: 'default',
    password: '', // Set this if required
});

export default client;
