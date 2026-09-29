# Diagnostico: vazamento de conexoes do pool

## Escopo

- Endpoint: `GET /students/db-leaky-connections`
- Janela analisada: 2026-09-29 19:42:44 UTC a 19:57:44 UTC
- Servico: `alumnus_app_ae9e`

## Resumo executivo

O endpoint esgotou o pool de conexoes PostgreSQL. As conexoes adquiridas por `pool.connect()` nao sao devolvidas com `client.release()`. Apos o pool ficar sem conexoes disponiveis, novas requisicoes esperam o timeout de aproximadamente 1 segundo e retornam HTTP 500.

## Prometheus

Consulta de erros:

```promql
sum(increase(http_server_duration_milliseconds_count{
  http_route="/students/db-leaky-connections",
  http_status_code="500"
}[15m]))
```

Resultado: aproximadamente 450 respostas HTTP 500 na janela. Nao houve respostas HTTP 200 no mesmo periodo.

Consulta de latencia media das falhas:

```promql
sum(increase(http_server_duration_milliseconds_sum{
  http_route="/students/db-leaky-connections",
  http_status_code=~"5.."
}[15m]))
/
sum(increase(http_server_duration_milliseconds_count{
  http_route="/students/db-leaky-connections",
  http_status_code=~"5.."
}[15m]))
```

Resultado: `1002 ms` de latencia media para os casos de falha.

## Loki

Os logs de nivel `error` mostram a mesma excecao em todos os eventos recuperados:

```text
Error: timeout exceeded when trying to connect
    at pg-pool/index.js:45:11
    at DbLeakyConnectionsScenario.createConnection (.../main.ts:52:20)
    at .../main.ts:84:24
```

O LogQL mostrou aproximadamente 30 erros por minuto, em cadencia de uma falha a cada 2 segundos. O limite de retorno da consulta e 100 eventos; todos os eventos retornados tinham a mesma mensagem e o mesmo stack trace.

## Tempo

Trace de exemplo: `92a4db1326638ba9d5c296c2437e7b61`.

- Duracao total: `1006 ms`
- Status HTTP: `500`
- Spans em erro: `3`
- Excecao: `timeout exceeded when trying to connect`

Hierarquia observada:

```text
GET (cliente undici)
└─ GET /students/db-leaky-connections (HTTP server, 500)
   └─ request (Fastify)
      └─ handler - fastify -> @fastify/otel (erro)
```

O span do handler registra a excecao com o mesmo stack trace do Loki. Nao existe span de liberacao da conexao, reforcando que o cliente do pool permanece retido.

## Causa raiz

O timeout aparece em [main.ts](../_alumnus/src/scenarios/db-leaky-connections/main.ts#L52), na chamada `this.pool.connect()`. Esse e o ponto onde a terceira e as proximas requisicoes falham, pois o pool ja esta esgotado.

A causa do esgotamento esta no handler iniciado em [main.ts](../_alumnus/src/scenarios/db-leaky-connections/main.ts#L78): ele adquire o cliente na linha 84 e executa a query, mas nao executa `client.release()` antes de responder. A omissao esta documentada no proprio codigo em [main.ts](../_alumnus/src/scenarios/db-leaky-connections/main.ts#L90-L92).

## Correlacao

| Sinal | Evidencia | Conclusao |
| --- | --- | --- |
| Prometheus | Aproximadamente 450 HTTP 500 e media de 1002 ms | Falha sistematica por timeout |
| Loki | `timeout exceeded when trying to connect` em `main.ts:52` e `main.ts:84` | Pool sem conexoes livres |
| Tempo | HTTP 500, tres spans em erro e excecao no handler | Timeout propagado ate a resposta HTTP |
| Codigo | Ausencia de `client.release()` | Vazamento de conexao confirmado |

## Correcao recomendada

Libere o cliente em um bloco `finally`, inclusive quando a query falhar:

```ts
const client = await this.pool.connect()
try {
  const result = await client.query("SELECT * FROM students LIMIT 1")
  return reply.send({ students: result.rows })
} finally {
  client.release()
}
```

## Validacao apos a correcao

1. Execute `POST /students/db-leaky-connections/reset` para liberar os clientes retidos pelo cenario atual.
2. Envie mais de tres requisicoes ao endpoint.
3. Confirme respostas HTTP 200, ausencia de novos timeouts no Loki e ausencia de novos traces HTTP 500 no Tempo.
