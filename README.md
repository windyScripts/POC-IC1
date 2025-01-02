Install and run docker.

DBs' needed to run this project:

rabbitmq:

```bash
docker run -d --name rabbitmq -p 15672:15672 -p 5672:5672 rabbitmq:management

```

posgres:

```bash
docker run -d --name postgres -e POSTGRES_PASSWORD="postgres" -p 5432:5432 postgres
```
clickhouse:

```bash
docker run -d \
  --name clickhouse-server \
  -p 8123:8123 \
  -e CLICKHOUSE_USER=clickHouse \
  -e CLICKHOUSE_PASSWORD=clickHouse \
  yandex/clickhouse-server:latest
```

