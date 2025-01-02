# Proof of Concept project

## Technologies

### clickhouse

No ORM, raw queries. GraphQL. Subgraph1

### Postgres

TypeORM, GraphQL, Subgraph2

### RabbitMQ

Senders and Receivers for both topic and fanout based transmission.

### Gateway

GraphQL Supergraph

## Instructions to run project:

### 1.Install and run docker.

### 2.DBs' needed to run this project:

#### rabbitmq:

```bash
docker run -d --name rabbitmq -p 15672:15672 -p 5672:5672 rabbitmq:management

```

#### posgres:

```bash
docker run -d --name postgres -e POSTGRES_PASSWORD="postgres" -p 5432:5432 postgres
```
#### clickhouse:

```bash
docker run -d \
  --name clickhouse-server \
  -p 8123:8123 \
  -e CLICKHOUSE_USER=clickHouse \
  -e CLICKHOUSE_PASSWORD=clickHouse \
  yandex/clickhouse-server:latest
```

### 3. run npm start in services/receivers -> services/senders -> 

## Further work

Kafka integration
GraphQL requests from receivers to apps
resolver references and shared entities completion.